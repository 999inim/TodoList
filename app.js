var express = require('express');
var bodyParser=require('body-parser');
var path = require('path');

var indexRouter = require('./routes/index');
var resourceRouter = require('./routes/resource');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/index', indexRouter);
app.use('/resources', resourceRouter);

app.listen(3030);
console.log("App listening on port 3030");