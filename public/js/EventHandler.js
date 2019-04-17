var core=require('./Core');
var drawingView=require('./DrawingView');

$( function() {
    $( "#sortable" ).sortable({
        placeholder: "ui-state-highlight",
        update:function(){/*server에 반영*/console.log("sort");},
    });
    $( "#sortable" ).draggable({
        cursor: "grabbing",
    });
    $( "#sortable" ).disableSelection();
} );

// Bind Event with EventHandler

function refreshHandlers(){
    addTodoHandler();
    delTodoHandler();
    editTodoHandler();

    completeTodoHandler();
    addShortcutkeyHandler();
}

function addTodoHandler(){
    console.log(1);
    $("#nav-add").on("click", function () {
        var todoTitle=$("#nav-input").val();
        //Action 타입과 인자 전달
        console.log("2 : "+todoTitle);
        core.postTodo({"type":"add","param":{"title":todoTitle}});
    });
}

function delTodoHandler(){
    $(".article-toolbox-del").on("click", function () {
        console.log("del");
        //Drawing
        var targetTodo=$(this).parent('div').parent('div').parent('div');
        //export from DrawingView
        $(targetTodo).hide("drop", { direction: "right" }, 1200, function(){
            $(targetTodo).remove();
        });
        //삭제하는 애의 num
        core.postTodo("del",number);
    });
}

// 수정 버튼 누를 때 이벤트 처리
function editTodoHandler(){
    $(".article-toolbox-edit").on("click", function () {
        //edit 필드 활성화
        console.log(todo.test.add());
        console.log("core");
        var todoLabel=$(this).parent('div').siblings('div');
        $(todoLabel).children('label').hide();
        console.log($(todoLabel).text());
        $(todoLabel).children('.article-checkbox-edit').show();
        $(todoLabel).children('.article-checkbox-edit').val($(todoLabel).text());
    });
}


function completeTodoHandler(){
    $(".article-checkbox").on("change",function(){
        console.log("change");
        var todoDataTarget=$(this).parent('div').parent('div').parent('div'); //target : article-task element
        var todoData=JSON.parse(todoDataTarget.children('.article-task-data').text());
        if($(this).is(":checked")){
            $(this).siblings("label").css("text-decoration-line","line-through");
            todoData.completed=true;
        }else{
            $(this).siblings("label").css("text-decoration-line","none");
            todoData.completed=false;
        }
        $(todoDataTarget).children('.article-task-data').text(JSON.stringify(todoData));


        //completedTodo();
    });
}

function addShortcutkeyHandler(){
    $(".article-checkbox-edit").keypress(function(e) {
        if (e.keyCode == 13){
            var articleCheckbox=$(this).parent('div');
            var newText=$(articleCheckbox).children('.article-checkbox-edit').val();
            console.log(newText);
            $(articleCheckbox).children('label').text(newText);
            $(articleCheckbox).children('label').show();
            $(articleCheckbox).children('.article-checkbox-edit').hide();
        }
        editTodoHandler();
    });
}



module.exports={refreshHandlers};