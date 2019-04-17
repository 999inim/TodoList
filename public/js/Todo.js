var storage={
    "lastId":0,
    "todoList":[],
    "setProperty":function(todoList){
        this.todoList=todoList;
        this.lastId=this.todoList[this.todoList.length-1].id;
    }
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
            this.todoModel.id = storage.lastId + 1;
            storage.lastId += 1;
            this.todoModel.title = this.param["title"];
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
        case 'delete':
            //Model에 id값만 받아서 전달
            this.todoModel["id"]=this.param["id"];
            break;
    }
}




//Test class
var Test=function(x,y){
    this.x=x;
    this.y=y;
}

Test.prototype.add=function(){
    return this.x+this.y;
}

var test=new Test(2,3);

module.exports={storage, RecordAction, Test}