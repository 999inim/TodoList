var express = require('express');
var app= express();
var bodyParser=require('body-parser');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended:true}));

var router = require('./router');
app.use('/', router);

var sharejs = require('share').server;
sharejs.attach(app, {db:{ type: "none" ,browserChannel: {cors: '*'}}});

app.listen(3030);
console.log("App listening on port 3030");