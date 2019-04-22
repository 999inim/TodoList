var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    //res.send('respond with a resource');
    var resList=storage.todoList;
    res.json(resList);
});

router.post('/:type', function(req, res) {
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


// ## 저장 객체 및 메서드

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
RecordAction.prototype.findTodo=function(id) {
    var idx;
    for (var i = 0; i < storage.todoList.length; i++)
        if (storage.todoList[i].id == id) {
            idx=id;
            break;
        }
    return idx;
}

//
RecordAction.prototype.setTodo=function() {
    //저장(반영) 및 타입별 전처리(그리기)
    switch (this.type) {
        case 'add':
            this.todoModel.title = this.param["title"];
            storage.todoList.push(this.todoModel);
            storage.setProperty();
            //console.dir(storage.todoList);
            break;
        case 'del':
            //param(id,targetDOM)
            var idx=this.findTodo(this.param["id"]);
            storage.todoList.splice(idx,1);
            //console.dir(storage.todoList);
            break;
        case 'edit':
            var idx=this.findTodo(this.param["id"]);
            storage.todoList[idx].title=this.param["title"];
            //console.dir(storage.todoList);
            break;
        case 'sort':
            // 현재 위치 > 해당 record > 삭제 후 삽입(이동)
            var idx=this.findTodo(this.param["id"]);
            //console.log(idx);

            var todoRecord=storage.todoList[idx];
            //console.log(todoRecord);
            storage.todoList.splice(idx,1);
            //console.dir(storage.todoList);

            var newIdx=this.param["newIdx"];
            //console.log("new "+newIdx);
            storage.todoList.splice(newIdx,0,todoRecord);
            //console.dir(storage.todoList);
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

