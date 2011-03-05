

var express = require('express')
    , jade = require('jade')
    , models = require('./models/models');




var wc1 = new models.WordCard({'de': 'der Kuchen', 'ru': 'пирог'});
var wc2 = new models.WordCard({'de': 'essen', 'ru': 'кушать'});

var main_col = new models.WordDesk([wc1, wc2]);


app = require('express').createServer();

app.use(express.logger());
app.use(express.bodyParser());

app.set('view engine', 'jade');
app.set('view options', {layout: false});


app.get(/(models|controllers|views|lib)\/.*.(js|css)/, function(req, res){
        res.sendfile('./'+req.url);
    });


app.get('/', function(req, res) {
        res.render('index');
    });


app.get('/deck', function(req, res) {
        // return the whole deck in json format
        
        res.send(main_col.toJSON());
    });

app.post('/card', function(req, res) {
        var new_card = new models.WordCard(req.body);

        main_col.add(new_card);
    });



app.listen(3000);

console.log('Server is running on http://127.0.0.1:3000/');