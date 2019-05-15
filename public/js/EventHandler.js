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

    $("#nav-input").keypress(function (e) {
        if (e.which == 13) {addTodo();}
    });

    $("#nav-add").on("click", function () {
        addTodo();
    });

    function addTodo(){
        var todoTitle=$("#nav-input").val();
        console.log(todoTitle);
        if(todoTitle==""){
            alert("내용을 입력하세요.");
            return;
        }
        $("#nav-input").val('').focus(); //내용 지우기 및 포커스 이동
        //console.log(todoTitle);

        var newRecord=model.getTodoRecord();
        newRecord["title"]=todoTitle;
        doc.push(newRecord);

        console.log("local add: ");
        console.log(newRecord);
        console.log(doc.get());
        console.log("--------------");

        renderer.drawTodo(newRecord,/*append*/);
    }

    doc.on('insert',function(pos,data){
        console.log("remote add: "+pos);
        console.log(data);
        console.log("--------------");

        renderer.drawTodo(data,pos);//pos에 그려야함
    });


}

function delTodoHandler(doc, renderer){
    $(document).on('click', '.article-toolbox-del', function() {
        var targetTodo=$(this).parent('div').parent('div').parent('div.article-record');
        var pos=targetTodo.index();

        doc.del(1,pos);
        console.log("local delete: ");
        console.log(pos);
        console.log(doc.get());
        console.log("--------------");
        renderer.delTodo(pos);
    });

    doc.on('delete',function(pos,data){
        console.log("remote delete");
        console.log(pos);
        console.log(data);
        console.log(doc.get());
        console.log("--------------");
        renderer.delTodo(pos);
    });
}

function sortTodoHandler(doc, renderer){
    var dragFrom=null;
    var newPos=null;
    var change="";
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
            console.log(change);
            console.log(newPos);
            if (change=="down"){
                console.log("change redraw"); //hide한거 지우고 새로운 위치에 그려야함.
                $('.article-record:nth-child('+newPos+')').after(ui.item);
                change="";
            }else if(change=="up"){
                console.log("change redraw"); //hide한거 지우고 새로운 위치에 그려야함.
                $('.article-record:nth-child('+newPos+')').before(ui.item);
                change="";
            }else{
              ui.placeholder.before(ui.item); //placeholder 앞에 item을 놓는다.
            }
        },
        update:function(event, ui) { // when the user stopped sorting and the DOM position has changed
            console.log(4);

            console.log("local sort");
            console.log("from: " + dragFrom + " to: " + newPos);
            console.log("--------------");

            console.log("not change move");
            doc.move(dragFrom, newPos);

            dragFrom = null; //change이후 위치가 바뀌었으면서 멈춘상태.
        }

    });
    $( "#sortable" ).disableSelection();

    doc.on('move',function(from,to){
        console.log("remote sort");
        console.log("dragFrom: "+dragFrom);
        console.log("newPos: "+newPos);
        console.log("from: "+from+" to: "+to);
        console.log("--------------");
        if(newPos!=null){
            if(newPos-1<=to&&newPos-1<from){
                console.log(1111);
                //move전에 pos보다 큰 위치에서 작은 위치로 move가 일어난 경우
                change="down";
                console.log(newPos);
                newPos=newPos+1;
            }else if(newPos-1>=to&&newPos-1>from){
                console.log(2222);
                //move전에 pos보다 작은 위치에서 큰 위치로 move가 일어난 경우
                change="up";
                newPos=newPos-1;
            }
        }else{
            console.log(33333);
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


