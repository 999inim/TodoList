function Model(){}
Model.prototype.getTodoRecord=function(){
    return new Object({"title":null, "favorite":false, "completed":false, "update-date":0, "update":""});
};
Model.prototype.getTodoList=function(){
}
Model.prototype.setTodoList=function(todoList){
}

module.exports={Model};