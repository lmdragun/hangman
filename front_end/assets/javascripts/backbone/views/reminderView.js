var gameView = Backbone.View.extend({
  className: 'game',
  tagName: 'div',

  events: {
    'click.finish': 'enterWord'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(HandlebarsTemplates['reminders/show'](this.model.toJSON()));
  },

  markComplete: function() {
    var view = this;
    this.model.save({
        completed: true
    }).done(function(response){
        view.$el.fadeOut();
    }).fail(function(response) {
        console.log(response);
    });
  }
});
