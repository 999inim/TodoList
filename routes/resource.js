var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var todoList=[{"title":"sample 1"},{"title":"sample 2"},{"title":"sample 3"}];
  res.json(todoList);
});

router.post('/:type', function(req, res, next) {

});

module.exports = router;






// ## Todo records.
var todoList=[];
var TodoRecord=function(title, favorite, completed, date/*Object*/, indent, childRecords/*Array*/){
  this.title=title;
  this.favorite=favorite;
  this.completed=completed;
  this.date=date;
  this.indent=indent;
  this.childRecords=childRecords;
};


var todoRecord={"title":"sample record 1",
  "favorite":false,
  "completed":false,
  "date":{},
  "indent":0,
  "childRecord":[]}

