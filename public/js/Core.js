console.log("core.js");
var drawingView=require('./DrawingView');
var eventHandler=require('./EventHandler');

function getInitTodoList(){
    $.get("/resources", function (res) {
        drawingView.drawTodoList(res);
        eventHandler.refreshHandlers();
    });
}


//아래 메서드부터 EventHandler에서 binding해서 사용
function postTodo(Action){ // Action : add, del, edit, sort, favorite, completed ...
    //어떤 동작 + 어디가 바뀌었는지 체크 > server에 전달
    $.post("/resources/"+Action.type, {"key":"value"},function(res){
        //Subject이용하여 draw
    });
}

//Action Class 정의 후 Init모듈에 export
var Test=function(x,y){
    this.x=x;
    this.y=y;
}

Test.prototype.add=function(){
    return this.x+this.y;
}

var test=new Test(2,3);



module.exports={getInitTodoList, test};
