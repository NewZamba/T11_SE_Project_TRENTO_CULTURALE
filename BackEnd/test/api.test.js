// tests/api.test.js
const request = require('supertest');
require('dotenv').config(); // Carica il file .env
const app = require('../app'); // Assumendo che 'app' sia l'esportazione del file che contiene il setup di Express
const mongoose = require('mongoose');
const User = require('../models/User');
const Prenotation = require('../models/Prenotations');
const evaluation = require('../models/Evaluations');
const tags = require('../models/Tags');
const suggEvents = require('../models/SuggEvents');
const Event = require('../models/Events');
const bcrypt = require('bcrypt');

// Prima di tutto: connettiti al DB
beforeAll(async () => {
    const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Imposta l'URI del database
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Chiudi il DB dopo tutti i test
afterAll(async () => {
    await User.deleteOne({email_user:"x@x.x"});
    await evaluation.deleteOne({
        id_event:'67a174e6cef0f8c792a6cc65',
        id_user:'6792653715ee2db12a34f690'
    });
    await tags.deleteOne({
        name_tag: "olanda",
        color_tag: "#ff6444"
    });
    await mongoose.connection.close();
});
// Suite di test per GET /events
describe('GET /events', () => {
    it('Dovrebbe restituire tutti gli eventi', async () => {
        const res = await request(app).get('/events/get'); // Simula una richiesta GET
        expect(res.statusCode).toBe(200); // Assumiamo che lo status code previsto sia 200
        expect(Array.isArray(res.body)).toBe(true); // Controlla che il corpo della risposta sia un array
    });
    it('Dovrebbe restituire gli eventi ancora validi', async () => {
        const res = await request(app).get('/events/not_expired');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('Dovrebbe restituire tutti gli eventi', async () => {
        const res = await request(app).post('/events/add').send(
            {"name_event":"TestEvent",
                "img_event":"https://i0.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1",
                "description_event":"Test",
                "location_event":"Trento",
                "date_event":"2025-02-12",
                "tags_event":["67a13db292dcb8e54056422c","67a13dd292dcb8e540564230","67aa82f5ca88a7eb6b4207fc"],
                "guests_event":"0"}
        );
        expect(res.statusCode).toBe(200);
    });
});

describe('SUGGEVENTS /suggEvents', () => {
    let testEventId;
    async function createTestEvent() {
        const eventData = {
            id_user: "6792653715ee2db12a34f690",
            name_event: "Test Event For Testing",
            date_event: "2025-03-27T00:00:00.000+00:00",
            tags_event: ["67a13db292dcb8e54056422c"],
            description_event: "Test Description",
            img_event: "https://example.com/image.jpg",
            guests_event: "25"
        };

        const response = await request(app).post('/suggEvents/add/').send(eventData);
        if (response.statusCode === 200) {
            const savedEvent = await suggEvents.findOne({ name_event: "Test Event For Testing" });
            return savedEvent?._id;
        }
        return null;
    }
    afterAll(async () => {
        if (testEventId) {
            await suggEvents.findByIdAndDelete(testEventId);
        }
        await suggEvents.deleteMany({ name_event: "Test Event For Testing" });
        await suggEvents.deleteMany({ name_event: "Test Event For Deletion" });
        await suggEvents.deleteMany({ name_event: "convegno terrapiattisti2" });
    });

    it("Dovrebbe non ritornare nulla qualora non ci fossero eventi suggeriti", async () => {
        const res = await request(app).get('/suggEvents/get');
        expect(res.statusCode).toBe(404);
        expect(Array.isArray(res.body)).toBe(false);
    })
    it("Dovrebbe ritornare gli eventi suggeriti quando presenti", async () => {
        testEventId = await createTestEvent();
        expect(testEventId).toBeTruthy();

        const res = await request(app).get('/suggEvents/get');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("Dovrebbe eliminare un evento suggerito da un utente", async () => {
        const newEvent = await request(app).post('/suggEvents/add/').send({
            id_user: "6792653715ee2db12a34f690",
            name_event: "Test Event For Deletion",
            date_event: "2025-03-27T00:00:00.000+00:00",
            tags_event: ["67a13db292dcb8e54056422c"],
            description_event: "Test Description",
            img_event: "https://example.com/image.jpg",
            guests_event: "25"
        });
        expect(newEvent.statusCode).toBe(200);

        const eventData = await suggEvents.findOne({ name_event: "Test Event For Deletion" });
        const eventId = eventData._id;
        const res = await request(app).delete(`/suggEvents/get/${eventId}`);
        expect(res.statusCode).toBe(200);
    });
    it("Dovrebbe ritornare not found qualora l'utente non avesse suggerito nessun evento", async () => {
        const res = await request(app).delete('/suggEvents/get/000000000000000000000000');
        expect(res.statusCode).toBe(404);
    })

    it("Dovrebbe aggiungere l'evento suggerito", async () => {
        const res = await request(app).post('/suggEvents/add/').send({
            id_user: "6792653715ee2db12a34f690",
            name_event: "convegno terrapiattisti2",
            date_event: "2025-03-27T00:00:00.000+00:00",
            tags_event: Array (2),
            description_event: "non celo dico",
            img_event: "https://media.gqitalia.it/photos/5cc01cfb3cfc2eb9e1c2b25c/16:9/w_2560%…",
            guests_event: "25"
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe ritornare errore se ci sono campi (obbligatori) mancanti nella richiesta", async () => {
        const res = await request(app).post('/suggEvents/add/').send({
            id_user: "6792653715ee2db12a34f690",
            name_event: "convegno terrapiattisti",
            date_event: "2025-02-27T00:00:00.000+00:00",
            tags_event: Array (2),
            description_event: "non celo dico",
            img_event: "https://media.gqitalia.it/photos/5cc01cfb3cfc2eb9e1c2b25c/16:9/w_2560%…",
        });
        expect(res.statusCode).toBe(400);
    })
    it("Dovrebbe dare errore se l'immagine non è un URL valido", async () => {
        const res = await request(app).post('/suggEvents/add/').send({
            id_user: "6792653715ee2db12a34f690",
            name_event: "convegno terrapiattisti",
            date_event: "2025-02-27T00:00:00.000+00:00",
            tags_event: Array (2),
            description_event: "non celo dico",
            img_event: "media.gqitalia.it/photos/4cc01cfb3cfc2eb9e1c2b25c/16:9/w_2560%…",
            guests_event: "25"
        });
        expect(res.statusCode).toBe(400);
    })
})

//Test Commenti
describe('Suite /comments',()=>{
    let comment_id;
    it("Dovrebbe aggiungere un commento", async ()=>{
        const res = await request(app).post('/comments/add').send(
        {id_event: "67e2822f6a9ea97b6cac13c8",
            id_user: "6792653715ee2db12a34f690",
            text: "Test",
            date: "2024-01-20",
            z_index: "0",
            id_parent : null}
        )
        expect(res.statusCode).toBe(201);
        this.comment_id = res.body.comment.id;

    });
    it("Dovrebbe ottenere tutti i commenti di un evento", async ()=>{
        const res = await request(app).post('/comments/get').send({
                "id":"67e2822f6a9ea97b6cac13c8"
        })
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.comments)).toBe(true);
    })
    it("Dovrebbe cancellare un commento di un evento", async ()=>{
        const res = await request(app).delete(`/comments/del/${this.comment_id}`)
        expect(res.statusCode).toBe(200);
    })
});

describe('SIGNUP /auth/signup',()=>{
    it("Dovrebbe registrare il nuovo utente", async () => {
        const res = await request(app).post('/auth/signup').send({
            name_user: "x",
            surname_user: "x",
            email_user: "x@x.x",
            pass_user: "xxx",
            type_user: 2,
            ban_until_date: null
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe non registrare il nuovo utente se è già presente l'email", async () => {
        const res = await request(app).post('/auth/signup').send({
            name_user: "Francesco",
            surname_user: "Buscardo",
            email_user: "francescobuscardo@gmail.com",
            pass_user: "google_oauth",
            type_user: 2,
            ban_until_date: null
        });
        expect(res.statusCode).toBe(400);
    })
})

describe('BOOKINGS /bookings/',()=>{
    it("Dovrebbe registrare la nuova prenotazione", async () => {
        const res = await request(app).post('/bookings/').send({
            id_user: "6787e7805a911ef20c457435",
            id_event: "67a7c82c952ec4f8d22ff7f4",
            name_event: " Safer Internet Day 2025",
            date_Prenotation: "2025-02-10T22:07:41.401+00:00",
            date_event: "2025-02-11T00:00:00.000+00:00",
            form: false,
            guests_event: "10"
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe non registrare la nuova prenotazione se è già presente", async () => {
        const res = await request(app).post('/bookings/').send({
            id_user: "67aa2189ecb58d50c862c258",
            id_event: "67a174e6cef0f8c792a6cc65",
            name_event: "Halo 4",
            date_Prenotation: "2025-02-12T16:00:01.177+00:00",
            date_event: "2024-02-27T00:00:00.000+00:00",
            form: false,
            guests_event: "10"
        });
        expect(res.statusCode).toBe(409);
    })
    it("Dovrebbe non registrare la nuova prenotazione se il numero di guest è maggiore o uguale", async () => {
        const res = await request(app).post('/bookings/').send({
            id_user: "6792655515ee2db12a34f693",
            id_event: "67a7c82c952ec4f8d22ff7f4",
            name_event: "Halo 4",
            date_Prenotation: "2025-02-12T16:00:01.177+00:00",
            date_event: "2024-02-27T00:00:00.000+00:00",
            form: false,
            guests_event: "1"
        });
        expect(res.statusCode).toBe(405);
    })
    it("Dovrebbe ritornare il numero di prenotazioni dell'utente", async () => { // 17  #############################################################################################à
        const res = await request(app).get('/bookings/').query({
            id: "67a7c797952ec4f8d22ff7ee"
        });
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("number");
    })
    it("Dovrebbe non funzionare se passato un ID non valido o mancante", async () => {
        const res = await request(app).get('/bookings/').send({
            id: "67ae0d1f08a003ba7b4d7307"
        });
        console.log(res.body.error)

        expect(res.statusCode).toBe(400);
    })
    it("Dovrebbe non funzionare se passato un ID mancante", async () => {
        const res = await request(app).get('/bookings/').query({
            id: 0
        });
        expect(res.statusCode).toBe(400);

    })
    it("Dovrebbe cancellare la prenotazione",async () => {
        book = await Prenotation.findOne({id_user:"6787e7805a911ef20c457435",id_event:"67a7c82c952ec4f8d22ff7f4"})
        const res = await request(app).delete(`/bookings/`).query({_id : book["_id"].toString()});
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBeDefined();
    })
    it("Dovrebbe dare errore sulla cancellazione della prenotazione, prenotazione inesistente",async () => {
        const res = await request(app).delete(`/bookings/`).query(
            {
                _id:"000000000000000000000000"
            })
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBeDefined();
    })
    it("Dobrebbe dare errore sulla cancellazione della prenotazione, id mancante", async () => {
        const res = await request(app).delete(`/bookings/`).query()
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    })
})

//Test Commenti
describe('Suite /comments/',()=>{
    let comment_id;
    it("Dovrebbe aggiungere un commento", async ()=>{
        const res = await request(app).post('/comments/add').send(
        {id_event: "67e2822f6a9ea97b6cac13c8",
            id_user: "6792653715ee2db12a34f690",
            text: "Test",
            date: "2024-01-20",
            z_index: "0",
            id_parent : null}
        )
        expect(res.statusCode).toBe(201);
        this.comment_id = res.body.comment.id;
    });
    it("Dovrebbe aggiungere un commento e ricevere errore di user", async ()=>{
        const res = await request(app).post('/comments/add').send(
            {id_event: "67e2822f6a9ea97b6cac13c8",
                id_user: "000000000000000000000000",
                text: "Test",
                date: "2024-01-20",
                z_index: "0",
                id_parent : null}
        )
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    });
    it("Dovrebbe ottenere tutti i commenti di un evento", async ()=>{
        const res = await request(app).post('/comments/get').send({
                id:"67a7c8e8952ec4f8d22ff7fc"
        })
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.comments)).toBe(true);
    })
    it("Non dovrebbe restituire commenti perchè l'evento non esiste", async ()=>{
        const res = await request(app).post('/comments/get').send({
            id:"000000000000000000000000"
        })
        expect(res.statusCode).toBe(404);
        expect(Array.isArray(res.body.comments)).toBe(false);
    })

    it("Dovrebbe cancellare un commento di un evento", async ()=>{
        const res = await request(app).delete(`/comments/del/${this.comment_id}`)
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe dare errore nella cancellazione di un commento (commento inesistente)", async ()=>{
        const res = await request(app).delete(`/comments/del/000000000000000000000000`)
        expect(res.statusCode).toBe(404);
    })
});

describe('Suite /evalutation/', () =>{
    it("Dovrebbe ottenere tutte le valutazioni di un evento", async ()=>{
        const res = await request(app).post('/evaluation/get').send(
            {
                id_event : '67a17688b7dce6445e4a212c'
            }
        )
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
    it("Dovrebbe ottenere la valutazione di un utente per quell'evento", async ()=>{
        const res = await request(app).post('/evaluation/get').send(
            {
                id_event : '67a174e6cef0f8c792a6cc65',
                id_user : '6792653715ee2db12a34f690'
            }
        )
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe ottenere la valutazione di un utente per quell'evento", async ()=>{
        const res = await request(app).post('/evaluation/get').send(
            {
                id_user : '67a174e6cef0f8c792a6cc65',
            }
        )
        expect(res.statusCode).toBe(400);
    })
    it("Dovrebbe aggiungere una valutazione ad un evento", async ()=>{
        const res = await request(app).post('/evaluation/add').send({
            id_event : '67a174e6cef0f8c792a6cc65',
            id_user : '6792653715ee2db12a34f690',
            rating : 1
        })
        expect(res.statusCode).toBe(201);
    })
    it("Dovrebbe aggiornare una valutazione ad un evento", async ()=>{
        const res = await request(app).post('/evaluation/add').send({
            id_event : '67a174e6cef0f8c792a6cc65',
            id_user : '6792653715ee2db12a34f690',
            rating : 2
        })
        expect(res.statusCode).toBe(202);
    })
})

describe('USERS /users/',()=>{
    it("Dovrebbe sospendere un tente", async () => {
        const res = await request(app).patch('/users/suspend').send({
            ban_until_date: "2026-02-27T00:00:00.000+00:00",
            user_id: "6787e7805a911ef20c457435"
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe dare errore qualora l'utente non viene trovato", async () => {
        const res = await request(app).patch('/users/suspend').send({
            ban_until_date: "2026-02-27T00:00:00.000+00:00",
            user_id: "67aa218944b22d50c862c258"
        });
        expect(res.statusCode).toBe(404);
    })

    it("Dovrebbe riattivare l'utente", async () => {
        const res = await request(app).patch('/users/unsuspend').send({
            user_id: "6787e7805a911ef20c457435"
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe dare errore qualora l'utente non viene trovato", async () => {
        const res = await request(app).patch('/users/unsuspend').send({
            user_id: "67aa218944b24450c862c258"
        });
        expect(res.statusCode).toBe(404);
    })

    it("Dovrebbe dare la lista utenti con sol i dati pubblici", async () => {
        const res = await request(app).get('/users/public_for_mod');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
})

describe('FORM /form', () =>{
    it("Dovrebbe inviare il form", async() =>{
        const res = await request(app).post('/form/').send({
            id_user: "67b7ac58d3dc8b2eae841a97",
            id_event: "67a174e6cef0f8c792a6cc65",
            name_event: "Halo 4",
            feedback: "gg",
            rating: "3"
        })
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe non inviare il form se non ci sono tutti i parametri", async() =>{
        const res = await request(app).post('/form/').send({
            id_user: "6792653715ee2db12a34f690",
            name_event: "Halo 4",
            feedback: "non mi e' piaciuto",
            rating: "3",
        })
        expect(res.statusCode).toBe(400);
    })
    it("Dovrebbe aggiornare il fatto che l'utente ha compilato il form", async() =>{
        const res = await request(app).put('/form/').send({
            id_event: "67a173e2cef0f8c792a6cc5f",
            id_user: "67aa2189ecb58d50c862c258"
        })
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe verificare se ci sono tutti i campi", async() =>{
        const res = await request(app).put('/form/').send({
            id_event: "67a173e2cef0f8c792a6cc5f"
        })
        expect(res.statusCode).toBe(400);
    })
    it("Dovrebbe prendere i form legati ad un evento", async () => {
        const res = await request(app).get('/form/').query({
            id_event: "67a174e6cef0f8c792a6cc65"
        });
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
    it("Non dovrebbe ritornare nulla se non ci sono form", async () => {
        const res = await request(app).get('/form/').query({
            id_event: "67e280a9686504036e970489"
        });
        expect(res.statusCode).toBe(404);
    })
    it("Non dovrebbe funzionare se non c'è l'id dell'evento", async() =>{
        const res = await request(app).get('/form/').send({
        })
        expect(res.statusCode).toBe(400);
    })
})

describe('TAGS /tags',() => {
    it("Dovrebbe restituire la lista dei tag", async () => {
        const res = await request(app).get('/tags/get');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
    it("Dovrebbe aggiungere il tag", async () => {
        const res = await request(app).post('/tags/add').send({
            name_tag: "olanda",
            color_tag: "#ff6444"
        });
        expect(res.statusCode).toBe(200);
    })
    it("Dovrebbe dare errore se non ci sono i campi necessari per la post", async () => {
        const res = await request(app).post('/tags/add').send({
            name_tag: "italia"
        });
        expect(res.statusCode).toBe(400);
    })
})

describe('Suite /auth/',()=>{
    it("Dovrebbe loggarsi con le credenziali utente", async () => {
        const res = await request(app).post('/auth/login').send({
            email_user: 'a@a.a',
            pass_user: 'a'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.type_user).toBeDefined();
    });
    it("Dovrebbe dare errore con credenziali sbagliate", async ()=>{
        const res = await request(app).post('/auth/login').send({
            email_user: 'wrong@test.com',
            pass_user: 'wrong'
        });
        expect(res.statusCode).toBe(401);
    });
    it("Dovrebbe effettuare il logout di un utente autenticato", async () => {
        const authenticatedAgent = request.agent(app);
        await authenticatedAgent.post('/auth/login').send({
            email_user: 'a@a.a',
            pass_user: 'a'
        });

        const res = await authenticatedAgent.post('/auth/logout');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Logout avvenuto con sucesso");
    });
    it("Dovrebbe rifiutare il logout per un utente non autenticato", async () => {
        const res = await request(app).post('/auth/logout');
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe("Nessun utente da sloggare");
    });
})
describe('Login con utente bannato /auth/login', () => {
    let bannedUserId;

    beforeAll(async () => {
        // Crea un utente di test bannato
        const bannedUser = new User({
            name_user: "banned",
            surname_user: "user",
            email_user: "banned@test.com",
            pass_user: await bcrypt.hash("password", 10),
            type_user: 1,
            ban_until_date: new Date(Date.now() + 86400000) // Bannato per 1 giorno
        });
        await bannedUser.save();
        bannedUserId = bannedUser._id;
    });

    afterAll(async () => {
        await User.findByIdAndDelete(bannedUserId);
    });

    it("Dovrebbe rifiutare il login per un utente bannato", async () => {
        const res = await request(app).post('/auth/login').send({
            email_user: 'banned@test.com',
            pass_user: 'password'
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toContain("Utente sospeso fino al");
    });
});

describe('Registrazione utente /auth/signup', () => {
    afterAll(async () => {
        // Pulizia utenti di test
        await User.deleteOne({ email_user: "y@y.y" });
    });

    it("Dovrebbe registrare il nuovo utente", async () => {
        const res = await request(app).post('/auth/signup').send({
            name_user: "test",
            surname_user: "user",
            email_user: "y@y.y",
            pass_user: "password",
            type_user: 1
        });
        expect(res.statusCode).toBe(200);
    });

    it("Dovrebbe non registrare il nuovo utente se è già presente l'email", async () => {
        const res = await request(app).post('/auth/signup').send({
            name_user: "test",
            surname_user: "user",
            email_user: "y@y.y",
            pass_user: "password",
            type_user: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it("Dovrebbe rifiutare la registrazione con campi obbligatori mancanti", async () => {
        const res = await request(app).post('/auth/signup').send({
            name_user: "test",
            // Mancante surname_user
            email_user: "incomplete@test.com",
            // Mancante pass_user
            type_user: 1
        });
        expect(res.statusCode).toBe(402);
    });

    it("Dovrebbe criptare la password durante la creazione di un nuovo utente", async () => {
        const testPassword = "testpassword123";
        const res = await request(app).post('/auth/signup').send({
            name_user: "password",
            surname_user: "test",
            email_user: "password@test.com",
            pass_user: testPassword,
            type_user: 1
        });

        expect(res.statusCode).toBe(200);

        const user = await User.findOne({email_user: "password@test.com"});
        expect(user).toBeTruthy();
        expect(user.pass_user).not.toBe(testPassword);
        expect(await bcrypt.compare(testPassword, user.pass_user)).toBe(true);

        // Pulizia
        await User.findByIdAndDelete(user._id);
    });
});

describe('Autenticazione con Google /auth/google', () => {
    it("Dovrebbe avere un endpoint di autenticazione Google", async () => {
        const res = await request(app).get('/auth/google');
        // Dovrebbe reindirizzare a Google OAuth
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toContain('accounts.google.com');
    });

    // Testare il callback è più complesso poiché richiede un flusso OAuth valido
    // Possiamo almeno testare che la rotta esista
    it("Dovrebbe avere un endpoint di callback Google", async () => {
        const res = await request(app).get('/auth/google/callback');
        expect(res.statusCode).toBe(302); // Dovrebbe reindirizzare da qualche parte
    });
});

describe('Suite /verificaUserType', () => {
    // Crea agenti per diversi tipi di utente
    let normalUserAgent;
    let dataAnalystAgent;
    let modUserAgent;
    let unauthenticatedAgent;

    beforeEach(async () => {
        // Configura agenti autenticati
        normalUserAgent = request.agent(app);
        dataAnalystAgent = request.agent(app);
        modUserAgent = request.agent(app);
        unauthenticatedAgent = request.agent(app);

        // Login come utente normale (type_user: 1)
        await normalUserAgent
            .post('/auth/login')
            .send({
                email_user: 'a@a.a',
                pass_user: 'a'
            });

        // Crea e accedi come analista dati (type_user: 2)
        // Prima controlla se l'utente di test esiste
        let dataAnalyst = await User.findOne({ email_user: 'analyst@test.com' });
        if (!dataAnalyst) {
            dataAnalyst = new User({
                name_user: "Test",
                surname_user: "Analyst",
                email_user: "analyst@test.com",
                pass_user: await bcrypt.hash("analyst123", 10),
                type_user: 2
            });
            await dataAnalyst.save();
        }

        await dataAnalystAgent
            .post('/auth/login')
            .send({
                email_user: 'analyst@test.com',
                pass_user: 'analyst123'
            });

        // Crea e accedi come moderatore (type_user: 3)
        let modUser = await User.findOne({ email_user: 'mod@test.com' });
        if (!modUser) {
            modUser = new User({
                name_user: "Test",
                surname_user: "Moderator",
                email_user: "mod@test.com",
                pass_user: await bcrypt.hash("mod123", 10),
                type_user: 3
            });
            await modUser.save();
        }

        await modUserAgent
            .post('/auth/login')
            .send({
                email_user: 'mod@test.com',
                pass_user: 'mod123'
            });
    });

    afterAll(async () => {
        // Pulizia utenti di test
        await User.deleteOne({ email_user: "analyst@test.com" });
        await User.deleteOne({ email_user: "mod@test.com" });
    });

    describe('/is_logged endpoint', () => {
        it("Dovrebbe restituire i dati dell'utente per utenti autenticati", async () => {
            const res = await normalUserAgent.get('/verificaUserType/is_logged');
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeDefined();
        });

        it("Dovrebbe restituire 401 per utenti non autenticati", async () => {
            const res = await unauthenticatedAgent.get('/verificaUserType/is_logged');
            expect(res.statusCode).toBe(401);
        });
    });

    describe('/is_data_analyst endpoint', () => {
        it("Dovrebbe restituire i dati dell'utente per utenti analisti dati", async () => {
            const res = await dataAnalystAgent.get('/verificaUserType/is_data_analyst');
            expect(res.statusCode).toBe(200);
            expect(res.body.type_user).toBe(2);
        });

        it("Dovrebbe restituire 403 per utenti non analisti dati", async () => {
            const res = await normalUserAgent.get('/verificaUserType/is_data_analyst');
            expect(res.statusCode).toBe(403);
        });

        it("Dovrebbe restituire 401 per utenti non autenticati", async () => {
            const res = await unauthenticatedAgent.get('/verificaUserType/is_data_analyst');
            expect(res.statusCode).toBe(401);
        });
    });

    describe('/is_mod endpoint', () => {
        it("Dovrebbe restituire i dati dell'utente per utenti moderatori", async () => {
            const res = await modUserAgent.get('/verificaUserType/is_mod');
            expect(res.statusCode).toBe(200);
            expect(res.body.type_user).toBe(3);
        });

        it("Dovrebbe restituire 403 per utenti non moderatori", async () => {
            const res = await normalUserAgent.get('/verificaUserType/is_mod');
            expect(res.statusCode).toBe(403);
        });

        it("Dovrebbe restituire 401 per utenti non autenticati", async () => {
            const res = await unauthenticatedAgent.get('/verificaUserType/is_mod');
            expect(res.statusCode).toBe(401);
        });
    });
});

describe('Suite /convertEvent', () => {
    it("Dovrebbe convertire con successo un evento suggerito in un evento ufficiale", async () => {
        // Prima crea un evento suggerito di test
        const testSuggEvent = new suggEvents({
            id_user: "6792653715ee2db12a34f690",
            name_event: "Evento Suggerito di Test",
            date_event: "2025-03-27T00:00:00.000+00:00",
            tags_event: ["67a13db292dcb8e54056422c"],
            description_event: "Descrizione di test",
            img_event: "https://example.com/test.jpg",
            guests_event: "25"
        });

        const savedEvent = await testSuggEvent.save();
        const suggEventId = savedEvent._id.toString();

        // Ora convertilo
        const res = await request(app).post('/convertEvent/sug_to_off').send({
            suggEventId: suggEventId,
            location_event: "Luogo di Test"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Evento convertito con successo");

        // Verifica che l'evento suggerito sia stato eliminato
        const suggEventExists = await suggEvents.findById(suggEventId);
        expect(suggEventExists).toBeNull();

        // Verifica che l'evento ufficiale sia stato creato
        const officialEvent = await Event.findOne({ name_event: "Evento Suggerito di Test" });
        expect(officialEvent).toBeTruthy();
        expect(officialEvent.location_event).toBe("Luogo di Test");

        // Pulizia
        await Event.findOneAndDelete({ name_event: "Evento Suggerito di Test" });
    });

    it("Dovrebbe restituire 400 se mancano parametri", async () => {
        // Manca location_event
        const res1 = await request(app).post('/convertEvent/sug_to_off').send({
            suggEventId: "67a21b2421aa505e1ef2f6e4"
        });
        expect(res1.statusCode).toBe(400);

        // Manca suggEventId
        const res2 = await request(app).post('/convertEvent/sug_to_off').send({
            location_event: "Luogo di Test"
        });
        expect(res2.statusCode).toBe(400);
    });

    it("Dovrebbe restituire 404 se l'evento suggerito non esiste", async () => {
        const nonExistentId = "67a21b2421aa505e1ef2f6e5"; // Formato valido ma ID inesistente

        const res = await request(app).post('/convertEvent/sug_to_off').send({
            suggEventId: nonExistentId,
            location_event: "Luogo di Test"
        });

        expect(res.statusCode).toBe(404);
    });

    it("Dovrebbe restituire un errore per un formato ID non valido", async () => {
        const res = await request(app).post('/convertEvent/sug_to_off').send({
            suggEventId: "formato-id-non-valido",
            location_event: "Luogo di Test"
        });

        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
});
