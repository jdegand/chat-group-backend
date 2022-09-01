require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

//const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');
const channelRouter = require('./routes/channel');
const messagesRouter = require('./routes/messages');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger('dev'));

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter);
app.use('/auth', authRouter); // login
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/channels', channelRouter);
app.use('/channels/:channelId/messages', messagesRouter);
app.use('/users', usersRouter); // profile
app.use('/uploads', express.static('uploads')); // for the profile pics

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

module.exports = app;