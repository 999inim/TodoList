
$(function(){
    // ## Load Library Dependencies
    var popper='<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>';
    var bootstrap='<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
    var jqueryUI='<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30=" crossorigin="anonymous"></script>';
    $("head").append(popper).append(bootstrap).append(bootstrap_css).append(jqueryUI);

    var bootstrap_css='<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';
    var index_css='<link rel="stylesheet" type="text/css" href="/index.css">';
    $("head").append(bootstrap_css).append(index_css);

    // ## Test
    //$("body").append("<p>Hello Jquery !</p>");
    //$("body").append('<p class="text-primary">Hello Bootstrap !</p>');

    // ## Load Dependency Module
    var eventHandler='<script src="/js/eventHandler.js"></script >';
    $("head").append(eventHandler);
});
