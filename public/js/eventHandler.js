//$("body").append("<p>eventHandler load !</p>")
var todoList=(function(){
// init > eventHandler
    //console.log("get resources !");

    return $.get("/resources", function (res) {
        return new TodoList(res);
    });
})();

function TodoSubject(res/*Array*/){
    this.todoList=res;
    this.notifyObservers();
}

TodoSubject.prototype.ObserverList=new Array();
TodoSubject.prototype.registerObserver=function(observer){
    //register observer
    this.ObserverList.append(observer);
}
TodoSubject.prototype.notifyObservers=function(){
    //call Observers notify method

}
TodoSubject.prototype.setTodoChanged=function(/*param*/){
    // add, delete, modify(property:title,order,favorite, ...)
    this.notifyObservers();
}


function Observer(){}
Observer.prototype.notify=function(){
    //this.property(or Object)=newProperty(or newObject)
}

function MenuObserver(){
    //property or object(about todo)
}

function ContentObserver(){
    //property or object(about todo)
}