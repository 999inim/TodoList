var todo = require('./Todo');
var drawingView=require('./DrawingView');

function getInitTodoList(){
    $.get("/resources", function (res) {
        //초기 데이터 등록 및 그리기
        todo.storage.setTodoList(res);
        drawingView.drawTodoList(res);
    });
}

function eventListener(Action){
    postTodo(Action);
}

//아래 메서드부터 EventHandler에서 binding해서 사용
function postTodo(Action){ // Action 객체의 키값으로 type, param으로 전달
    console.log("postTodo");
    var temp=Action;

    //서버로 먼저 전달 후 성공/실패 반환
    $.post("/resources/"+Action.type, Action.param ,function(result){
        //성공시 임시저장한 Action을 Drawing 및 클라이언트에 데이터 반영.
        console.log("after server");
        if(/*result이용*/"success"=="success"){
            //데이터 반영 및 전처리
            var todoDAO=new todo.RecordAction(temp.type, temp.param);
            todoDAO.setTodo();

            //Draw
            switch (this.type) {
                case 'add':
                    drawingView.drawTodo(todoDAO.todoModel);
                    break;
                case 'delete':
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
module.exports={getInitTodoList, postTodo, eventListener};