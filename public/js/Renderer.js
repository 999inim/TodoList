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
    }
};


function makeTodo(todo/*todoRecord 한 개*/){
    var articleRecord=$('<div class="article-record ui-state-default"></div>');
    var articleHandle=$('<div class="article-handle d-flex align-items-center"><i class="fas fa-grip-vertical"></i></div>');
    var articleContent=$('<div class="article-content list-group-item list-group-item-action justify-content-between"></div>');
    var articleCheckbox=$('<div class="article-checkbox custom-control custom-checkbox"></div>');
    var checkBoxInput=$('<input type="checkbox" class="article-checkbox custom-control-input">').attr("id", 1);;
    var articleCheckboxLabel=$('<label class="article-checkbox-label custom-control-label"></label>').attr("for", 1);
    var articleCheckboxEdit=$("<input class='article-checkbox-edit' type='text'>").hide();
    var articleToolbox=$('<div class="article-toolbox"><i class="article-toolbox-edit fa fa-edit">edit</i>&nbsp;&nbsp;<i class="article-toolbox-del far fa-trash-alt">del</i></div>');

    articleCheckboxLabel.text(todo.title);
    if(todo.completed){
        checkBoxInput.attr("checked","true");
        articleCheckboxLabel.css("text-decoration","line-through");
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
