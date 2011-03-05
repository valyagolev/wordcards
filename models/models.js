(function() {
    var server = false, models;
    
    if (typeof exports !== 'undefined') {
        _ = require('underscore')._;
        Backbone = require('backbone');

        models = exports;
        server = true;
    } else {
        models = this.models = {};
    }
    

    String.prototype.format = function() {
        var formatted = this;
        for(arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };


    models.WordCard = Backbone.Model.extend({
            url: '/card',
            initialize: function() {
                console.log('added a word card "{0}"'.format(this.get('ru')));
            } 
        });



    models.WordDesk = Backbone.Collection.extend({
            model: models.WordCard,
            getRandomCard: function() {
                var rid = Math.floor(Math.random() * this.length);
                return this.at(rid);
            }
        });


})();