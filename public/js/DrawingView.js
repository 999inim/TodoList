import {} from "EventHandler";

function drawTodo(todo /*처음 디비에서 가져온 리스트들*/){
    var articleRecord=$('<div class="article-record ui-state-default"></div>');
        var articleHandle=$('<div class="article-handle d-flex align-items-center"><i class="fas fa-grip-vertical"></i></div>');
        var articleContent=$('<div class="article-content list-group-item list-group-item-action justify-content-between"></div>');
            var articleCheckbox=$('<div class="article-checkbox custom-control custom-checkbox"></div>');
                var checkBoxInput=$('<input type="checkbox" class="article-checkbox custom-control-input">').attr("id", todo.id);;
                var articleCheckboxLabel=$('<label class="article-checkbox-label custom-control-label"></label>').attr("for", data.id);
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

function drawTodoList(todoList){
    $.each(todoList, function(index){
        var articleRecord= drawTodo(todoList[index]);
        $("article-list").append(articleRecord);
    });
}

export{drawTodoList};