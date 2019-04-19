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


var Action={"type":"","param":{}};

function addTodoHandler(coreContext){
    $("#nav-add").on("click", function () {
        var todoTitle=$("#nav-input").val();

        //Action 타입과 인자 전달
        Action.type="add";
        Action.param={"title":todoTitle};
        coreContext.postTodo(Action);
    });
}

function delTodoHandler(coreContext){
    $(".article-toolbox-del").on("click", function () {
        //article record
        var targetTodo=$(this).parent('div').parent('div').parent('div');
        //article-checkbox의 id attr
        var targetID=$(this).parent('div').prev().children().first().attr('id');

        //서버에서 지울 수 있도록 id값, DrawingView 모듈에서 지울 수 있도록 target
        Action.type="del";
        Action.param={"id":targetID,"target":targetTodo};

        console.log(Action.type);
        console.log(Action.param);
        coreContext.postTodo(Action);
    });
}

// 수정 버튼 누를 때 이벤트 처리
function editTodoHandler(coreContext){
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


function completeTodoHandler(coreContext){
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

function addShortcutkeyHandler(coreContext){
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



module.exports={addTodoHandler, delTodoHandler};