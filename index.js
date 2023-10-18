const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

require('dotenv').config({ path: 'variables.env' });

const app = express();

// Habilitar Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Habilitar Handlebars como View Engine
app.engine('handlebars',
    exphbs.engine({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);

app.set('view engine', 'handlebars');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// Sesión en Mongoose
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DATABASE})
}));

app.use('/', router());

app.listen(process.env.PUERTO);