module.exports={
    setEventHandler : function(doc,model,renderer) {
        //Action Handler
        addTodoHandler(doc.at(), model,renderer);
        delTodoHandler(doc.at(), renderer);
        editTodoTextHandler(doc.at(), renderer);
        moveTodoHandler(doc.at(), renderer);
        replacePropertyHandler(doc.at(), renderer);

        menuHandler("",0);
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
        menuHandler("total",1);

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
        menuHandler("total",1);
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
        menuHandler("total",-1);
    });

    doc.on('delete',function(pos,data){
        console.log("remote delete");
        console.log(pos);
        console.log(data);
        console.log(doc.get());
        console.log("--------------");
        renderer.delTodo(pos);
        menuHandler("total",-1);
    });
}

function moveTodoHandler(doc, renderer){
    var newPos=null;
    var dragFrom=null;

    var pick=false; //요소가 들려있는지 여부
    var state=null;
    var cancel=false;

    $( "#sortable" ).sortable({
        placeholder: "sortable-placeholder", //A class name that gets applied to the otherwise white space.
        helper: 'clone', //Allows for a helper element to be used for dragging display
        start: function( event, ui) { // when sorting starts.
            console.log("1.move start state");
            pick=true;
            state="start";

            dragFrom = ui.item.index();
            ui.item.remove();
            newPos = ui.placeholder.index();
            console.log(dragFrom, newPos);
        },
        change:function(event, ui){ //triggered during sorting, but only when the DOM position has changed.
            state="change";
            console.log("2.move change state");
            newPos = ui.placeholder.index();
            console.log(dragFrom, newPos);
        },
        beforeStop: function(event, ui) { //when sorting stops, but when the placeholder/helper is still available.
            pick=false;
            console.log("3.move beforeStop state");
            if(!cancel){
            state="beforeStop";
                ui.placeholder.before(ui.item);
            }
        },
        update:function(event, ui) { // when the user stopped sorting and the DOM position has changed
            pick=false;
            if(!cancel){
                state="update";
                console.log("4.move update state");
                console.log(dragFrom, newPos);
                if(dragFrom!=newPos)
                    doc.move(dragFrom, newPos);
                dragFrom = null; //change이후 위치가 바뀌었으면서 멈춘상태.
            }else{
                cancel=false;
                console.log("same");
            }
        }

    });
    $( "#sortable" ).disableSelection();

    doc.on('move',function(from,to){
        console.log(5);
        console.log(from+" "+to);
        //console.log(JSON.stringify(doc.get()));
        if(pick){
            if(state=="start"||state=="change"||dragFrom==from) {
                //setTimeout(function(){//비동기
                        console.log("cancel");
                        cancel=true;
                        $('#sortable').sortable('cancel');
                        pick = false;
                        renderer.moveTodo(from,to);
                //},50);
            }
        }else{
        renderer.moveTodo(from,to);
        }
    });

}

function editTodoTextHandler(doc, renderer){
    // 클릭시 토글(toolbox-edit)
    var clicks, pos;
    $(document).on('keypress','.article-checkbox-edit',function (e) {
        if (e.which == 13) {
            clicks=$(this).parent('div').next('div').children('.article-toolbox-edit').data('clicks');
            pos=$(this).parent('div').parent('div').parent('div.article-record').index();
            evenClick();
            console.log("1111");
            $(this).parent('div').next('div').children('.article-toolbox-edit').data("clicks", !clicks);
        }
    });

    $(document).on("click",'.article-toolbox-edit',function(){
        clicks=$(this).data('clicks');
        pos=$(this).parent('div').parent('div').parent('div.article-record').index();

        if (!clicks) {
            // odd clicks
            console.log(1);
            renderer.editText(pos,1);
        } else {
            // even clicks
            console.log(2);
            evenClick();
        }
        $(this).data("clicks", !clicks);
    });

    function evenClick(){
        console.log(2);
        var newText = renderer.editText(pos, 2);
        console.log(doc.get()+" "+pos);
        var after = doc.get()[pos];
        after.title=newText;
        after.update="title";
        doc.replace(pos,after);
    }

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
        menuHandler("completed",(completed=="true")?1:-1);
        var after=doc.get()[pos];
        console.dir(doc.get());
        console.log(after);
        after["completed"]=(completed=="true")?true:false;
        //after["update"]="completed";
        //after.completed=(completed=="true")?true:false;
        doc.replace(pos,after);
    });

    doc.on('replace', function (pos, was, now) {
        //was,now 체크
        var check=now.completed;
        menuHandler("completed",(check==true)?1:-1);
        console.log("------------");
        renderer.replaceProperty(pos, now.completed);
    });
}

function menuHandler(type, value){
    var menu1=$('#menu-item-1 span');
    //var menu2=$('#menu-item-2 span');

    var totalNum=parseInt(menu1.text());
    //var completedNum=parseInt(menu2.text());
    if(type=="total"){
        totalNum=totalNum+value;
            menu1.text(totalNum);
    }/*else{
        completedNum=completedNum+value;
        menu2.text(completedNum);
    }*/

}

