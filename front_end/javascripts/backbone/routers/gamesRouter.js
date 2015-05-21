var RemindersRouter = Backbone.Router.extend({
    
    //maps routes to actions (when the url says this, do this)
    routes: { //these are the actions which are defined below (these are methods on the router)
        "": "reminders",
        "complete": "complete",
        "incomplete": "incomplete",
        //"reminders/:id": "show",
        //"*": "reminders" //this has to go at the end otherwise it will take over everything.  We want it to look for the other things first if it doesn't match complete or incomplete, go to reminders.  This is a dynamic route because it's something that isn't just a string (the * is a variable)
    },

    //these are object properties
    initialize: function initialize () {
        collection = new RemindersCollection();
        listView = new RemindersListView({collection: collection});
        collection.fetch({reset: true});
    },

    //these are actions
    reminders: function reminders () {
        collection.fetch({reset: true});
    },

    complete: function complete () {
        //switch out the view collection to only contain the complete items
        collection.fetch({reset: true, data: {completed: true}});
    },

    incomplete: function incomplete () {
        collection.fetch({reset: true, data: {completed: false}});
    }
});
