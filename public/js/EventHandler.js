module.exports={
    setEventHandler : function(doc,model,renderer) {
            //var docListner=doc.on('change', function (op) {/*console.dir(op);*/console.log(op);});


            addTodoHandler(doc.at(), model,renderer);
            delTodoHandler(doc.at(), renderer);
        /*editTodoHandler(doc, renderer);
        sortTodoHandler(doc, renderer);*/
    }
}

var Action={"type":"","param":{}};

function addTodoHandler(doc, model,renderer){
    console.log("addHandler");

    $("#nav-add").on("click", function () {
        var todoTitle=$("#nav-input").val();
        //Action 타입과 인자 전달
        console.log(todoTitle);

        var newRecord=model.getTodoRecord();
        newRecord["title"]=todoTitle;
        console.dir(newRecord);
        doc.push(newRecord);
        console.log(doc.get());
        renderer.drawTodo(newRecord);
    });

    doc.at().on('insert',function(pos,data){
        renderer.drawTodo(data);
    });
}

function delTodoHandler(doc, renderer){
    $(document).on('click', '.article-toolbox-del', function() {
        var targetTodo=$(this).parent('div').parent('div').parent('div.article-record');
        var targetIdx=targetTodo.index();
        console.log("del");
        //article records
        doc.del(1,targetIdx);
        console.log(targetIdx);
        console.log(doc.get());

        renderer.delTodo(targetIdx);
    });

    doc.at().on('delete',function(pos,data){
        console.log(pos);
        renderer.delTodo(pos);
    });
}

function editTodoHandler(doc, renderer){
    $(document).one("click",'.article-toolbox-edit',handler1);

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
        //router.postTodo(Action, model, renderer);

    };
}

function sortTodoHandler(doc, renderer){
    doc.at().on('move',function(from,to){
        console.log('move', from, to);
    });
    /*
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
            router.postTodo(Action, model, renderer);
        }
    });
    $( "#sortable" ).disableSelection();
    */


    // redefine

    var dragFrom = null;

    doc.at().on('move', function(from, to) {
        //console.log('move', from, to);
        if (dragFrom === from) {
            dragFrom = to;
        } else {
            if (to === 0) {
                $('#trains :nth-child(' + (from + 1) + ')')
                    .remove()
                    .insertBefore($('#trains :nth-child(' + (to + 1) + ')'));
            } else {
                $('#trains :nth-child(' + (from + 1) + ')')
                    .remove()
                    .insertAfter($('#trains :nth-child(' + to + ')'));
            }
        }
    });

    $("#sortable").sortable({
        helper: 'clone',
        start: function(event, ui) {
            dragFrom = ui.item.index();
            ui.item.remove();
        },
        update: function(event, ui) {
            //console.log('update', ui.item.index());
            dragFrom = null;
        },
        change: function(event, ui) {
            var newPos = ui.placeholder.index();
            //console.log('sending move', dragFrom, newPos);
            doc.at().move(dragFrom, newPos);
            dragFrom = newPos;
        },
        beforeStop: function(event, ui) {
            //console.log(ui.item);
            ui.placeholder.before(ui.item);
        },
        axis: 'y'
    });



}

function completeTodoHandler(router){
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

function addShortcutkeyHandler(router){
    $(".article-checkbox-edit").keypress(function(e) {
        if (e.keyCode == 13){
            var articleCheckbox=$(this).parent('div');
            var newText=$(articleCheckbox).children('.article-checkbox-edit').val();
            //console.log(newText);
            $(articleCheckbox).children('label').text(newText);
            $(articleCheckbox).children('label').show();
            $(articleCheckbox).children('.article-checkbox-edit').hide();
        }
        editTodoHandler();
    });
}



