define([
    'backbone',
    'jquery',
    'messaging_center'
], function (
    Backbone,
    $,
    messagingCenter
) {

    var SessionModel = Backbone.Model.extend({
        sessionUrl: '/api/session/',
        userUrl: '/api/user/',
        login: function(login, password) {
            $.ajax({
                method: 'PUT',
                url: this.sessionUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status === 0) {
                        messagingCenter.trigger('loginOk');
                    } else {
                        messagingCenter.trigger('loginError', data.message);
                    }
                },
                error: function (data) {
                    messagingCenter.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },
        logout: function () {
            $.ajax({
                method: 'DELETE',
                url: this.sessionUrl,
                success: function () {
                    alert("Successfull logout");
                },
                error: function() {
                    alert("Logout failed");
                }
            });
        },
        register: function(login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status === 0) {
                        messagingCenter.trigger('registerOk');
                    } else {
                        messagingCenter.trigger('registerError', data.message);
                    }
                },
                error: function () {
                    messagingCenter.trigger('registerError', 'Неизвестная ошибка');
                }
            });
        }
    });

    return SessionModel;

});