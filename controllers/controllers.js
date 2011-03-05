$(function() {
        var mainContentDiv = document.getElementById('main-content');
    
        var wd = new models.WordDesk;
        wd.url = '/deck';
        wd.fetch();
        
        
        var WordCardsController = Backbone.Controller.extend({

                routes: {
                    "": "index",
                    "game": "game",
                    "add": "add"
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
                    
                }
                
            });

        new WordCardsController();
        
        $(document).ready(function () {
                Backbone.history.start();
            });

    });