var todo = require('./Todo');
var eventHandler=require('./EventHandler');
var drawingView=require('./DrawingView');

var CoreRouter=function(){
    this.init();
}

CoreRouter.prototype.registerEventHandler=function(){
    eventHandler.sortTodoHandler(this);
    eventHandler.addTodoHandler(this);
    eventHandler.delTodoHandler(this);
    eventHandler.editTodoHandler(this);
}
CoreRouter.prototype.init=function(){
    var o=this;
    $.get("/resources", function (res) {
        //초기 데이터 등록 및 그리기
        todo.storage.setTodoList(res);
        drawingView.drawTodoList(res);
        //Event Handler 등록
        o.registerEventHandler();
    });
}
CoreRouter.prototype.postTodo=function (Action){
    var temp={};
    if(Action.type=="del") {
        temp.target=Action.param["target"];
        delete Action.param["target"];
    }
    $.post("/resources/"+Action.type, Action.param ,function(result){
        //성공시 임시저장한 Action을 Drawing 및 클라이언트에 데이터 반영.
        if(/*result.responseText로 체크*/true){
            //데이터 반영 및 전처리
            var todoDAO=new todo.RecordAction(Action.type, Action.param);
            todoDAO.setTodo();

            //Draw
            switch (Action.type) {
                case 'add':
                    drawingView.drawTodo(todoDAO.todoModel);
                    break;
                case 'del':
                    drawingView.delTodo(temp.target);
                    break;
                case 'edit':
                    break;
                case 'sort':
                    break;
            }
        }else{
            //실패한 경우
        }
    });
}

var test="test";
module.exports={CoreRouter};