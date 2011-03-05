var wd = new models.WordDesk;

function syncWithServer() {
    
    // 1. send datas

    var to_sync = wd.filter(function(v){
        return !v.get('__saved');
    });

    console.log('gonna send');
    
    _(to_sync).each(function(v) {
        v.sync = Backbone.stdSync;
        v.save({}, {
            error: function(v) {
                console.log('error');
            },
            success: function() {
                console.log('success');
                v.set({__saved: true});
                
                v.sync = Backbone.localSync;
                v.save();
                v.sync = undefined;
            }
        });
        v.sync = undefined;
    });

    // 2. receive datas

    console.log('gonna receive');
    
    wd.fetch({
        error: function(v) {
            console.log('error');
        },
        success: function() {
            console.log('success');
        
            wd.each(function(v) {
                v.sync = Backbone.localSync;
                v.save();
                v.sync = undefined;
            });
            
        }});

}

$(function() {
        var mainContentDiv = document.getElementById('main-content');
        var notSavedDiv = document.getElementById('not-saved');
   
        wd.url = 'deck';
        wd.fetch();

        //        setInterval(function() { syncWithServer(); }, 1000);
        syncWithServer();
        

        wd.bind('add', function(model, collection) {
                notSavedView.render();
            });
        var notSavedView = new NotSavedView({
                el: notSavedDiv,
                collection: wd
            });
        setInterval(function() { notSavedView.render() }, 200);
        
        
        var WordCardsController = Backbone.Controller.extend({

                routes: {
                    "": "index",
                    "game": "game",
                    "add": "add",
                    "sync": "sync",
                },

                index: function() {
                    
                    this.view = new IndexView({
                            el: mainContentDiv
                        });
                    this.view.render();
            
                },

                game: function() {

                    this.view = new RandomCardView({
                            el: mainContentDiv,
                            collection: wd
                        });
                    this.view.render();
                    
                },

                add: function() {
                    
                    this.view = new AddCardView({
                            model: models.WordCard,
                            el: mainContentDiv,
                            collection: wd
                        });
                    this.view.render();
                    
                },

                sync: function() {
                    
                    syncWithServer();

                    notSavedView.render();

                    this.saveLocation('');
                }
                
                
            });

        new WordCardsController();
        
        $(document).ready(function () {
                Backbone.history.start();
            });

    });
