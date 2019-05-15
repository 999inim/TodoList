module.exports={
    drawTodo : function drawTodo(todo){
        var articleRecord=makeTodo(todo);
        $('.article-list').append(articleRecord);
    },

    drawTodoList:
        function drawTodoList(todoList/*처음 디비에서 가져온 리스트들*/){
            $.each(todoList, function(index){
                var articleRecord= makeTodo(todoList[index]);
                $(".article-list").append(articleRecord);
            });
    },

    delTodo : function delTodo(pos/*target pos*/){
        var targetTodo=$('.article-record:nth-child('+(pos+1)+')');
        $(targetTodo).hide("drop", { direction: "right" }, 1200, function(){
            $(targetTodo).remove();
        });
    },

    sortTodo : function sortTodo(from, to){
        //var targetTodo=$('.article-record:nth-child('+(from+1)+')');
            if (to === 0) {
                console.log(from+' '+to);
                $('.article-record:nth-child(' + (from + 1) + ')')
                    .remove()
                    .insertBefore($('.article-record:nth-child(' + (to + 1) + ')'));
            } else {
                $('.article-record:nth-child(' + (from + 1) + ')')
                    .remove()
                    .insertAfter($('.article-record:nth-child(' + to + ')'));
            }
    },

    editText : function editText(pos, type){
        if(type==1){
            var target=$('.article-record:nth-child(' + (pos + 1) + ')');
            console.dir(target);

            var label=$(target).find('label.article-checkbox-label');
            var before = $(label).text();
            $(label).text(''); //잠시 지움

            var input=$(target).find('input.article-checkbox-edit');
            $(input).attr('size', $(target).width() * 0.08);
            $(input).val(before);
            $(input).show();
            return -1;
        }else if(type==2){
            var target=$('.article-record:nth-child(' + (pos + 1) + ')');

            var label=$(target).find('label.article-checkbox-label');
            var input=$(target).find('input.article-checkbox-edit');
            var after = $(input).val();

            $(label).text(after);
            $(input).hide();
            return after;
        }else{
            var target=$('.article-record:nth-child(' + (pos + 1) + ')');
            var label=$(target).find('label.article-checkbox-label');

            $(label).text(type/*title..after*/);
        }
    },

    replaceProperty : function replaceProperty(pos, type) {
         var target=$('.article-record:nth-child(' + (pos + 1) + ')');
        if(type=="completed"){
            var checkboxInput=$(target).find('input.article-checkbox');
            var label=$(target).find('label.article-checkbox-label');

            var checked=$(checkboxInput).prop( "checked" );
            if(!checked){
                $(checkboxInput).prop("checked");
                $(label).css("text-decoration-line","none");
                return "false";
            }else{
                $(checkboxInput).attr("checked",true);
                $(label).css("text-decoration-line","line-through");
                return "true";
            }
        }else{//ot
            console.log(2+" "+pos);
            var checkboxInput=$(target).find('input.article-checkbox');
            var label=$(target).find('label.article-checkbox-label');
            console.log(type);
            if(type){
                $(checkboxInput).attr("checked", type);
                $(label).css("text-decoration-line", "line-through");
                return "true";
            }else {
                $(checkboxInput).attr("checked", type);
                $(label).css("text-decoration-line","none");
                return "false";
            }
        }
    }

};

var id=0;
function makeTodo(todo/*todoRecord 한 개*/){
    id=id+1;
    var articleRecord=$('<div class="article-record ui-state-default"></div>');
    var articleHandle=$('<div class="article-handle d-flex align-items-center"><i class="fas fa-grip-vertical"></i></div>');
    var articleContent=$('<div class="article-content list-group-item list-group-item-action justify-content-between"></div>');
    var articleCheckbox=$('<div class="article-checkbox custom-control custom-checkbox"></div>');
    var checkBoxInput=$('<input type="checkbox" class="article-checkbox custom-control-input">').attr("id", id);
    var articleCheckboxLabel=$('<label class="article-checkbox-label custom-control-label"></label>').attr("for", id);
    var articleCheckboxEdit=$("<input class='article-checkbox-edit' type='text'>").hide();
    var articleToolbox=$('<div class="article-toolbox"><i class="article-toolbox-edit fa fa-edit">edit</i>&nbsp;&nbsp;<i class="article-toolbox-del far fa-trash-alt">del</i></div>');

    articleCheckboxLabel.text(todo.title);
    if(todo.completed){
        console.log("in");
        checkBoxInput.prop("checked",true);
        articleCheckboxLabel.css("text-decoration-line","line-through");
    }
    articleCheckbox.append(checkBoxInput);
    articleCheckbox.append(articleCheckboxLabel);
    articleCheckbox.append(articleCheckboxEdit);

    articleContent.append(articleCheckbox);
    articleContent.append(articleToolbox);

    articleRecord.append(articleHandle);
    articleRecord.append(articleContent);

    return articleRecord;
}
