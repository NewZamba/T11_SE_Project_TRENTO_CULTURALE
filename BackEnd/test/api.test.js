// tests/api.test.js
const request = require('supertest');
require('dotenv').config(); // Carica il file .env
const app = require('../app'); // Assumendo che 'app' sia l'esportazione del file che contiene il setup di Express
const mongoose = require('mongoose');

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

//Test Login
describe('LOGIN /auth/login',()=>{
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
            id_user: "67aa2189ecb22d50c862c258",
            id_event: "67a174e6cef0f8c792a6cc65",
            name_event: "Halo 4",
            date_Prenotation: "2025-02-12T16:00:01.177+00:00",
            date_event: "2024-02-27T00:00:00.000+00:00",
            form: false,
            guests_event: "5"
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
            guests_event: "5"
        });
        expect(res.statusCode).toBe(409);
    })
    it("Dovrebbe non registrare la nuova prenotazione se il numero di guest è maggiore o uguale", async () => {
        const res = await request(app).post('/bookings/').send({
            id_user: "67aa2189ecb58d50c472c258",
            id_event: "67a174e6cef0f8c792a6cc65",
            name_event: "Halo 4",
            date_Prenotation: "2025-02-12T16:00:01.177+00:00",
            date_event: "2024-02-27T00:00:00.000+00:00",
            form: false,
            guests_event: "1"
        });
        expect(res.statusCode).toBe(405);
    })
    it("Dovrebbe ritornare il numero di prenotazioni", async () => { // 17  #############################################################################################à
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
        expect(res.statusCode).toBe(200); //###################################################### dovrebbe tornare l'oggetto utente?
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