module.exports={
    postTodo : function (Action, model, renderer){
        // 타입에 따른 전처리
        var temp={};
        if(Action.type=="del") {
            //
            temp.target=Action.param["target"];
            delete Action.param["target"];
        }

        $.post("/resources/"+Action.type, Action.param ,function(result){
            //성공시 임시저장한 Action을 Drawing 및 클라이언트에 데이터 반영.
            if(/*result.responseText로 체크*/true){
                //데이터 반영 및 전처리
                model.setAction(Action.type, Action.param);
                model.setTodo();

                //Draw
                switch (Action.type) {
                    case 'add':
                        renderer.drawTodo(model.getTodoRecord());
                        break;
                    case 'del':
                        renderer.delTodo(temp.target);
                        break;
                    case 'edit':
                        //할거없음.
                        break;
                    case 'sort':
                        //할거없음
                        break;
                }
            }else{
                //실패한 경우
            }
        });
    }
};

