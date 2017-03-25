
var restful = require('node-restful');

module.exports = function(app, route) {
    // set up controller for REST
    var rest = restful.model(
        'movie',
        app.models.movie
    ).methods(['get', 'post', 'put', 'delete']);


// register this rest enpoint
    rest.register(app, route);

// return middleware

    return function (req, res, next) {
        next();
    }

};