

var express = require('express')
    , jade = require('jade')
    , models = require('./models/models')
    , Backbone = require('backbone')
    , redis_sync = require('./util/redis').sync
    , fs = require('fs');

Backbone.sync = redis_sync;

var main_col = new models.WordDesk;
main_col.list_key = 'wordcard';
main_col.fetch();

console.log(main_col);

app = require('express').createServer();

app.use(express.logger());
app.use(express.bodyParser());

app.set('view engine', 'jade');
app.set('view options', {layout: false});

app.configure('production', function() {
  app.set('home', '/w');
});

app.get(/(models|controllers|views|lib)\/.*.(js|css)/, function(req, res){
        res.sendfile('./'+req.url);
    });

app.get('/cache.manifest', function(req, res){
        res.header('Content-Type', 'text/cache-manifest');

        fs.readFile('./cache.manifest', function (err, data) {
                if (err) throw err;
                res.send(data);
            });
    });


app.get('/', function(req, res) {
        res.render('index');
    });


app.get('/deck', function(req, res) {
        // return the whole deck in json format
        
        res.send(JSON.stringify(main_col));
    });

app.put('/card', function(req, res) {
        var new_card = new models.WordCard(req.body);

        new_card.set({__saved: true});

        new_card.save();
        
        main_col.add(new_card);

        res.send(JSON.stringify(new_card));
    });



app.listen(3000);

console.log('Server is running on http://127.0.0.1:3000/');
