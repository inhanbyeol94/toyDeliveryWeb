const express = require('express');
const app = express();
const fs = require('fs');

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
