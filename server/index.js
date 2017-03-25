var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//create app

var app =  express();

// middlewares to intercept REST APIs

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));



// CORS Support - opens up apis to external clients
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/hello', function(req, res, next){
    res.send('hello');
    next();
});

mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function () {

    // Load models
    app.models = require('./models/index');

    // Load the routes.
    var routes = require('./routes');

    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    app.listen(3000);
    console.log('listening on 3000...');
});

