const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//this grabs the data to pass to the post callback which will be inside the request
const urlendcodeParser = bodyParser.urlencoded({extended: false});

const jsonParser = bodyParser.json();
// const querystring = require('querystring');

//use middleware to detect static files on the server
app.use('/css', express.static(__dirname + '/public/css'));
//must call next() or the application will get frozen
app.use('/', (req, res, next) => {
    console.log('request was made for ' + req.url);
    res.cookie('cookiename', 'cookievalue');
    next()
})

//render html at the hhome route
app.get('/', (req, res) => {
  res.send(`
    <html>
        <head>
            <link type="text/css" rel="stylesheet" href="/css/styles.css"
        </head>
        <body>
            Hello
        </body>
    </html>`);
});

// this returns the user the querystring.html file
app.get('/user', (req, res) => {
    let HTML = fs.readFileSync(`${__dirname}/querystring.html`);
    res.send(`${HTML}`);
});
app.get('/user_post', (req, res) => {
    let HTML = fs.readFileSync(`${__dirname}/jsonpost.html`);
    res.send(`${HTML}`);
});

app.post('/enteruser', urlendcodeParser, (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    console.log(firstname, lastname);
    res.sendStatus(200);
});

app.post('/enteruser_post', jsonParser,(req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

//return json from this route
app.get('/api/user', (req, res) => {
  res.send({
    name: 'Ryan',
    cars: ['Lambo', 'Porche'],
  });
});

//dynamic params 
app.get('/api/:user/:id', (req, res) => {
    const userName = req.params.user;
    const id = req.params.id;
    res.send(`
    <html>
        <body>
            ${userName} ID=${id}
        </body>
    </html>
    `)
});

// getting/using query strings
app.get('/api/car', (req, res) => {
    const brand = req.query.brand;
    const year = req.query.year;
    
    res.send({
        brand, year
    })
})

//set port for production or local env
const port = process.env.PORT || 3000;

app.listen(port);

console.log('listening on ' + port );
