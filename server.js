const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('./config');

const knex = db.knex;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const users = await knex.select('*').from('users');
    res.send(users);
})

app.post('/signin', (req, res) => { signin.hangleSignin(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
})