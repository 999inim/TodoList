import {drawTodoList} from 'DrawingView';
import {} from 'EventHandler';

console.log("core.js");

function getInitTodoList(){
    $.get("/resources", function (res) {
        drawTodoList();
        //동적으로 생성된 객체들에게 EventHandler 적용
    });
}


//아래 메서드부터 EventHandler에서 binding해서 사용
function postTodo(Action){ // Action : add, del, edit, sort, favorite, completed ...
    //어떤 동작 + 어디가 바뀌었는지 체크 > server에 전달
    $.post("/resources/"+Action.type, {"key":"value"},function(res){
        //Subject이용하여 draw
    });
}



export{getInitTodoList, postTodo};