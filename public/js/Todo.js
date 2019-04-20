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
            break;
        case 'del':
            //param(id,targetDOM)
            var idx=this.findTodo(this.param["id"]);
            storage.todoList.slice(idx,1);
            break;
        case 'edit':
            //바꾸려고 하는 record(id)를 가져오고 해당 record에 title값만 바꾼다.
            var editRecord=this.findTodo(this.param.id);
            editRecord["title"]=this.param["title"];
            this.todoModel =editRecord;
            break;
        case 'sort':
            break;
    }
}




module.exports={storage, RecordAction}