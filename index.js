require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.port;

const configureDb = require('./config/db');

const { register, login, getUser } = require('./app/controllers/user_controller');
const { userValidator, userRegisterSchema, userLoginSchema } = require('./app/helpers/user_validator');
const { authenticateUser } = require('./app/middlewares/authenticate');

configureDb();
app.use(express.json());
app.use(cors());

app.post('/api/signup', userValidator(userRegisterSchema), register);
app.post('/api/login', userValidator(userLoginSchema), login)
app.get('/api/user', authenticateUser, getUser)

app.listen(port, () => {
    console.log('server running');
})