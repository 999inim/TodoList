//$("body").append("<p>eventHandler load !</p>")
import {} from 'DrawingView';
export{todoSubject, postTodo};


var InitTodoList=(function getInitTodoList(){
    return $.get("/resources", function (res) {
        return new TodoSubject(res);
    });
})();
var todoSubject= new TodoSubject(InitTodoList);
todoSubject.registerObserver=function(overserver)



//아래 메서드부터 EventHandler에서 binding해서 사용
function postTodo(Action){ // Action : add, del, edit, sort, favorite, completed ...
    //어떤 동작 + 어디가 바뀌었는지 체크 > server에 전달
    $.post("/resources/"+Action.type, {"key":"value"},function(res){
        //Subject이용하여 draw
    });
}



// Subjefct & Oberver
