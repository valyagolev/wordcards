$(function() {
        IndexView = Backbone.View.extend({
                menuTemplate: _.template($('#menu-template').html()),
        
                render: function() {

                    $(this.el).html(this.menuTemplate());

                    return this;
                    
                }
            });


        RandomCardView = Backbone.View.extend({
                template: _.template($('#ask-template').html()),

                render: function(current_score, count, result) {

                    current_score = current_score || 0;
                    count = count || 0;
                    result = result || '';

                    // every time we render the view
                    // we must show a different card
                    // from the collection

                    var card = this.collection.getRandomCard();

                    var lang = (Math.random() > 0.5 ? 'ru' : 'de');

                    console.log(card);
                    console.log(lang);

                    $(this.el).html(this.template({
                                    card: card,
                                    lang: lang,
                                    score: current_score,
                                    count: count,
                                    result: result
                            }));

                    var _the_view = this;

                    $('input.ask-input', this.el).change(function() {
                            var variant = $(this).val();

                            if (variant == card.get(lang)) {
                                current_score += 1;
                                var result = 'Good!';
                            } else {
                                var result = 'Wrong, the right answer is "'
                                    + card.get('ru') + ' &mdash; '
                                    + card.get('de') + '"!';
                            }
                            
                            _the_view.render(current_score, count + 1, result);
                        })
                   
                    return this;
                    
                }
            });

        
    });