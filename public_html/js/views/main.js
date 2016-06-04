define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/main'),
        session = require('models/session');

    //noinspection UnnecessaryLocalVariableJS
    var MainView = BaseView.extend({

        template: tmpl,
        // attributes: {class: "grid__str_10"},

        events: {
            'submit .js-submit': 'login'
        },

        initialize: function () {
            this.listenTo(session, 'loginOk', this.loginOk);
            this.listenTo(session, 'loginError', this.loginError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alert = this.$('.js-alert');
            this.$login = this.$('.js-login');
            this.$password = this.$('.js-password');
        },

        login: function (event) {
            event.preventDefault();
            this.$alert.html('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.$login.val()) || !regExp.test(this.$password.val())) {
                this.$alert.html('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.$password.val().length < 6) {
                this.$alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            session.login(this.$login.val(), this.$password.val());
        },

        loginError: function (errorMsg) {
            this.$alert.html(errorMsg);
        },

        loginOk: function () {
            this.$login.val('');
            this.$password.val('');
        }

    });

    return MainView;

});