module.exports={
    setEventHandler : function(doc,model,renderer) {
        //Action Handler
        addTodoHandler(doc.at(), model,renderer);
        delTodoHandler(doc.at(), renderer);
        editTodoTextHandler(doc.at(), renderer);
        sortTodoHandler(doc.at(), renderer);

        replacePropertyHandler(doc.at(), renderer);
        //Common
    }
}

var Action={"type":"","param":{}};

function addTodoHandler(doc, model,renderer){
    console.log("addHandler");


    $("#nav-add").on("click", function () {
        var todoTitle=$("#nav-input").val();
        $("#nav-input").val('').focus(); //내용 지우기 및 포커스 이동
        //console.log(todoTitle);

        var newRecord=model.getTodoRecord();
        newRecord["title"]=todoTitle;
        doc.push(newRecord);
        console.log(doc.get());
        renderer.drawTodo(newRecord);
    });

    doc.on('insert',function(pos,data){
        renderer.drawTodo(data);
    });
}

function delTodoHandler(doc, renderer){
    $(document).on('click', '.article-toolbox-del', function() {
        var targetTodo=$(this).parent('div').parent('div').parent('div.article-record');
        var targetIdx=targetTodo.index();
        console.log("del");
        //article records
        doc.del(targetIdx,1);
        console.log(targetIdx);
        console.log(doc.get());

        renderer.delTodo(targetIdx);
    });

    doc.on('delete',function(pos,data){
        console.log(pos);
        renderer.delTodo(pos);
    });
}

function sortTodoHandler(doc, renderer){
    var dragFrom=null;
    var newPos=null;
    $( "#sortable" ).sortable({
        placeholder: "sortable-placeholder", //A class name that gets applied to the otherwise white space.
        helper: 'clone', //Allows for a helper element to be used for dragging display
        start: function( event, ui) { // when sorting starts.
            console.log(1);
            newPos = ui.placeholder.index();
            dragFrom = ui.item.index();
            ui.item.remove();
        },
        change:function(event, ui){ //triggered during sorting, but only when the DOM position has changed.
            console.log(2);
            newPos = ui.placeholder.index();
            //dragFrom = newPos;
        },
        beforeStop: function(event, ui) { //when sorting stops, but when the placeholder/helper is still available.
            console.log(3);
            ui.placeholder.before(ui.item); //placeholder 앞에 item을 놓는다.
        },
        update:function(event, ui) { // when the user stopped sorting and the DOM position has changed
            console.log(4);
            console.log("sort");
            doc.move(dragFrom, newPos);
            dragFrom = null; //change이후 위치가 바뀌었으면서 멈춘상태.
        }

    });
    $( "#sortable" ).disableSelection();

    doc.on('move',function(from,to){
        //console.log(dragFrom+" "+from+" "+to);
        if(dragFrom===from) {
            console.log("same !");
            dragFrom = to;
        }else{
            console.log("draw ot sort");
            console.log(from+" "+to);
            renderer.sortTodo(from,to);
        }
    });

}

function editTodoTextHandler(doc, renderer){
    // 클릭시 토글(toolbox-edit)
    $(document).on("click",'.article-toolbox-edit',function(){
        var clicks = $(this).data('clicks');
        var pos=$(this).parent('div').parent('div').parent('div.article-record').index();
        if (!clicks) {
            // odd clicks
            console.log(1);
            renderer.editText(pos,1);
        } else {
            // even clicks
            console.log(2);
            var newText = renderer.editText(pos, 2);
            console.log(doc.get()+" "+pos);
            var after = doc.get()[pos];
            after.title=newText;
            after.update="title";
            doc.replace(pos,after);
        }
        $(this).data("clicks", !clicks);
    });

    doc.on('replace', function (pos, was, now) {
        //was가 바뀐게 날아옴...(상관은없음)
        if(now.update=="title"){
            console.log("edit");
            var after=now.title;
            renderer.editText(pos,now.title);
        }
    });
}

function replacePropertyHandler(doc, renderer){

    $(document).on("change","input.article-checkbox",function(){
        console.log("change");
        var pos=$(this).parent('div').parent('div').parent('div.article-record').index();

        var completed=renderer.replaceProperty(pos, "completed");//그리기
        console.log(doc.get()+" "+pos);
        var after=doc.get()[pos];
        after["update"]="completed";
        after.completed=(completed=="true")?true:false;

        doc.replace(pos,after);
    });

    doc.on('replace', function (pos, was, now) {
        //was,now 체크
        if(now.update=="completed") {
            console.log('completed');
            console.log(now);
            renderer.replaceProperty(pos, now.completed);
        }
    });
}

function shortcutkeyHandler(router){
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

function navHandler(){

}


