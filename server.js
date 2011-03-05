

var app = require('express').createServer()
    , jade = require('jade');



app.set('view engine', 'jade');
app.set('view options', {layout: false});


app.get(/(models|controllers|views|lib)\/.*.(js|css)/, function(req, res){
        res.sendfile('./'+req.url);
    });


app.get('/', function(req, res) {
        res.render('index');
    });

app.get('.*', function(req, res) { res.send('404: ' + req.url); });


app.listen(3000);

console.log('Server is running on http://127.0.0.1:3000/');