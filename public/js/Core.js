var todo = require('./Todo');
var eventHandler=require('./EventHandler');
var drawingView=require('./DrawingView');

var CoreRouter=function(){
    this.init();
}

CoreRouter.prototype.registerEventHandler=function(){
    eventHandler.addTodoHandler(this);
    eventHandler.delTodoHandler(this);
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
    var temp=Action;

    if(Action.type=="del")
        delete Action.param["target"];
    console.log("core "+Action.param.id);
    $.post("/resources/"+Action.type, Action.param ,function(result){
        //성공시 임시저장한 Action을 Drawing 및 클라이언트에 데이터 반영.
        if(/*result.responseText로 체크*/true){
            //데이터 반영 및 전처리
            var todoDAO=new todo.RecordAction(temp.type, temp.param);
            todoDAO.setTodo();

            //Draw
            switch (temp.type) {
                case 'add':
                    drawingView.drawTodo(todoDAO.todoModel);
                    break;
                case 'del':
                    drawingView.delTodo(todoDAO.param["target"]);
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