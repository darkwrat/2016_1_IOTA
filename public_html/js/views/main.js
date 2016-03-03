define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
) {

    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,
        initialize: function (session) {
            this.session = session;
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
        },
        show: function () {
            this.render();
        },
        hide: function () {
            // TODO
        }

    });

    return View;
});