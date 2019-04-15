var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    var resList=table["default"]
    res.json(resList);
});

router.post('/:type', function(req, res, next) {
  //타입별로 다른 처리후 객체 저장
});

module.exports = router;






// ## Todo table.
// table={"default":[{ }, { }, { } .. ], "xxx":[ ... ]};
//var sampleRecord={"title":"sample record 1", "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]};

var table={};
var todoList=[];
for(var i=0; i<5; i++){
  todoList.push({"id":i, "title":"sample record "+i, "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]});
}
table["default"]=todoList;

