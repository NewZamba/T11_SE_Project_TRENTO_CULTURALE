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
// Suite di test per /events
describe('/events', () => {
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
describe('POST /auth/login',()=>{
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
})
