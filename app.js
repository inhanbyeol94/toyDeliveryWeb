require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const fs = require('fs');
const { SESSION_SECRET_KEY } = process.env;

app.use(
    session({
        secret: SESSION_SECRET_KEY,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 }),
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);

//front-end
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views/static'));

//back-end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.readdirSync('./routes').forEach((routes) => {
    app.use('/', require(`./routes/${routes}`));
});

app.listen(3000, (err) => {
    if (err) return console.error(err);
    console.log('Server listening on Port', 3000);
});
