// ## Load Dependency Module Func
var model = require('./js/Model');
var eventHandler=require('./js/EventHandler');
var renderer=require('./js/Renderer');

$(function(){
    // ## Load Library Dependencies
    var popper='<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>';
    var bootstrap='<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
    $(".footer").append(popper).append(bootstrap);

    // Init
    sharejs.open('todo', 'json', function (error, doc) {
        if (error) {if (console) {console.error(error);}return;}
        if (doc.created && (doc.at().get() == null)) {
            doc.set([]);//doc이없는 경우 초기세팅.
        }else if(!doc.created && (doc.at().get()!=null)){
            renderer.drawTodoList(doc.at().get());
        }

        console.dir(doc);
        console.dir(doc.at());
        eventHandler.setEventHandler(doc,new model.Model(),renderer);
    });
});




