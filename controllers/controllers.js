$(function() {
        var mainContentDiv = document.getElementById('main-content');

        var wc1 = new models.WordCard({'de': 'der Kuchen', 'ru': 'пирог'});
        var wc2 = new models.WordCard({'de': 'essen', 'ru': 'кушать'});
        var wd = new models.WordDesk([wc1, wc2]);
        
        
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