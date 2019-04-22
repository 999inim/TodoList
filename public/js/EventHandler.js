var drawingView=require('./DrawingView');

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

        coreContext.postTodo(Action);
    });
}

// 수정 버튼 누를 때 이벤트 처리
function editTodoHandler(coreContext){
     $('.article-toolbox-edit').one("click",handler1);

        function handler1() {
            $(this).one("click", handler2);
            var targetLabel = $(this).parent('div').siblings('div').children('label');
            var targetText = $(targetLabel).text();
            $(targetLabel).text('');

            //text필드 크기 조정
            var parentSize = $(this).parent('div').parent('div').width();
            //console.log(parentSize);
            //console.log(parentSize*0.04);
            $(this).parent('div').siblings('div').children('.article-checkbox-edit').attr('size', parentSize * 0.08);
            //$(targetLabel).children('label').hide();
            $(targetLabel).siblings('.article-checkbox-edit').val(targetText);
            $(targetLabel).siblings('.article-checkbox-edit').show();
        }
        function handler2() {
            $(this).one("click", handler1);
            var targetLabel = $(this).parent('div').siblings('div').children('label');
            console.log("edit");
            var targetID = $(this).parent('div').prev().children().first().attr('id');
            var newText = $(targetLabel).siblings('.article-checkbox-edit').val();
            $(targetLabel).siblings('.article-checkbox-edit').hide();
            $(targetLabel).text(newText);
            //console.log(newText);

            Action.type="edit";
            Action.param={"id":targetID,"title":newText};
            coreContext.postTodo(Action);

    };
}
var sortIdx;
/*function getSortIdx(){
    return sortIdx;
}*/
function sortTodoHandler(coreContext){
    $( "#sortable" ).sortable({
        placeholder: "ui-state-highlight",
        start: function( ui, event ) {
            //var targetRecord = event.item;
            //sortIdx=$(targetRecord).index();
        },
        update:function(ui, event){
            //console.log("sort");
            var targetRecord = event.item;
            var targetID=targetRecord.children().children().children('.article-checkbox').attr('id');
            //console.log("get "+ getSortIdx());
            var newIdx=$(targetRecord).index();
            //console.log("event "+newIdx);
            Action.type="sort";
            Action.param={"id":targetID, "newIdx":newIdx};
            coreContext.postTodo(Action);
        }
    });
    $( "#sortable" ).disableSelection();
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

// ## menu

function UpdateMenuObserver(){
    this.num=5;
}
UpdateMenuObserver.prototype.update=function(type){
        console.log(type);
        var num=$('#menu-item-4').children('span').val();
        console.log(num);
    if(type=="add")
        $('menu-item-4').children('span').val(num+1);
    else if(type=="del")
        $('menu-item-4').children('span').val(num-1)
}
var menuObserver= new UpdateMenuObserver();






module.exports={addTodoHandler, delTodoHandler, editTodoHandler, sortTodoHandler, menuObserver};