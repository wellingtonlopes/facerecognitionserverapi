const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('./config/config');

const knex = db.knex;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    /* try {
        const users = await knex.select('*').from('users');
        res.send(users);
    } catch (error) {
        res.status(400).json('Could not get users data')
    } */
    res.send('It is alive!!')
})

app.post('/signin', (req, res) => { signin.hangleSignin(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

let server_port = process.env.PORT || 3000;

app.listen(server_port, () => {
    console.log(`app is running on port ${server_port}`);
});