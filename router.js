var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/index/task', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    //res.send('Hello task !');
    res.sendfile('./public/index.html');
});


router.get('/resources', function(req, res) {
    //res.send('respond with a resource');
    var resList=storage.todoList;
    res.json(resList);
});

router.post('/resources/:type', function(req, res) {
    //타입별로 다른 처리후 객체 저장
    var Action={};
    Action.type=req.params.type;
    Action.param=req.body;

    //데이터 분류 및 저장
    var todoDAO = new RecordAction(Action.type, Action.param);
    todoDAO.setTodo();

    res.send("success");
    //문제가 있으면 fail하는 케이스 이후에 추가
});


// # 초기 모델

var storage={
    "lastId":0,
    "todoList":[],
    "setTodoList":function(todoList){
        this.todoList=todoList;
        this.setProperty();
    },
    "setProperty":function(){
        this.lastId=this.todoList[this.todoList.length-1].id;
    },
    "findLastId":function(){/*sort하면 id위치가 바뀌게된다*/}
}

// ## Todo table.
// table={"default":[{ }, { }, { } .. ], "xxx":[ ... ]};
//var sampleRecord={"title":"sample record 1", "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]};

for(var i=0; i<5; i++){
    storage.todoList.push({"id":i, "title":"sample record "+i, "favorite":false, "completed":false, "date":{}, "childRecord":[]});
}
