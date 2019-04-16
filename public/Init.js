
$(function(){
    // ## Load Library Depende'ncies
    var popper='<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>';
    var bootstrap='<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
    $(".footer").append(popper).append(bootstrap);

    // ## Test
    //$("body").append("<p>Hello Jquery !</p>");
    //$("body").append('<p class="text-primary">Hello Bootstrap !</p>');

    // ## Load Dependency Module Func
    var core='<script src="/js/Core.js"></script>';
    var eventHandler='<script src=/js/DrawingView.js></script>';
    var drawingView='<script src=/js/EventHandler.js></script>';
    $("head").append(drawingView).append(eventHandler).append(core);


});

