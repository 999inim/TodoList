var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    var resList=storage.todoList;
    res.json(resList);
});

router.post('/:type', function(req, res, next) {
    //타입별로 다른 처리후 객체 저장
    var Action={};
    Action.type=req.params.type;
    Action.params=req.body;
    var todoDAO = new RecordAction(Action.type, Action.params);
    todoDAO.setTodo();
    //문제가 있으면 fail하는 케이스 이후에 추가
    
    res.send("success");
});


// 저장 객체 및 메서드

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

//Action about record
var RecordAction =function(type, param/*타입에 해당하는 전달 객체*/){
    this.type=type;
    this.param=param;
}

RecordAction.prototype.todoModel={"id":-1, "title":"", "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]};
RecordAction.prototype.setTodo=function() {
    switch (this.type) {
        case 'add':
            //이 부분 나중에 제일 큰 id를 찾는 방식(메서드)로 변경
            this.todoModel.title = this.param["title"];
            storage.push(this.todoModel);
            storage.setProperty();
            break;
        case 'delete':
            var idx=this.findTodo(this.param["id"]);
            storage.todoList.slice(idx,1);
            storage.setProperty();
            break;
        case 'edit':
            //바꾸려고 하는 record(id)를 가져오고 해당 record에 title값만 바꾼다.
            var editRecord=storage.todoList.forEach(function(index){
                if(stoarage.todoList[index].id=this.param.id){
                    return storage.todoList[index];
                }
            });
            editRecord["title"]=this.param["title"];
            this.todoModel =editRecord;
            break;
    }
}

module.exports = router;

// ## Todo table.
// table={"default":[{ }, { }, { } .. ], "xxx":[ ... ]};
//var sampleRecord={"title":"sample record 1", "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]};

for(var i=0; i<5; i++){
  storage.todoList.push({"id":i, "title":"sample record "+i, "favorite":false, "completed":false, "date":{}, "indent":0, "childRecord":[]});
}

//table["default"]=storage.todoList;

