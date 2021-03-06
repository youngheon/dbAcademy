'use strict';

/* Controllers */


TODOApp.controller('todoCtrl', ["$scope","localStorageService", function($scope, localStorageService){
    //todolist initializing

    $scope.appName = 'To do List';
    $scope.newTitle = "";
    //초기 할일 목록 설정

    var storageKey = "todoList";
    var todoList = localStorageService.get(storageKey);
    if (todoList) 
        $scope.todoList = todoList;
    else {
        $scope.todoList = [
            {'done' : true,  'title':"주제 고르기"},
            {'done' : true, 'title':"할일 분담하기"},
            {'done' : true, 'title':"코드 작성하기"},
            {'done' : false, 'title':"PPT 만들기"},
            {'done' : false, 'title':"이메일 보내기(산출물, PPT)"}
        ]
    };



    //입력창 엔터키 검사
    $scope.checkKey = function(event){
        if(event.keyCode==13){
            $scope.addNewTodo(document.getElementById('titleInput').value);
            $scope.newTitle="";
        }

    };

    //새로운 할 일 추가
    $scope.addNewTodo = function(newTitle){
        $scope.todoList.push({done:false, title:newTitle});
        $scope.newTitle="";
    };

    $scope.edit = function(todo){
        todo.editable = !todo.editable;
    }

    //완료한 일 삭제
    $scope.archive = function(){
        for(var i=$scope.todoList.length-1; i>=0; i--){
            if($scope.todoList[i].done){
                $scope.todoList.splice(i,1);
            }
        };
    };

    //남은 할 일 수 계산
    $scope.remain=function(){
        var remainCount=0;
        angular.forEach($scope.todoList, function(value, key){
         if(value.done ==false) remainCount++;
        })
         return remainCount;
    }

    $scope.save = function(index){
        localStorageService.add(storageKey,$scope.todoList);
        alert('저장 완료');
    }
}]);

TODOApp.controller('NoteCtrl', ["$scope","localStorageService",function($scope, localStorageService){

    var storageKey = "NoteList";
//	localStorageService.clearAll();
    var NoteList = localStorageService.get(storageKey);
    if (NoteList)
        $scope.NoteList = NoteList;
    else{
        $scope.NoteList = [
            {'content':"27일 멘토링 종료", 'order': 1, 'edit': true, 'modifyclick':false, 'color':"#ffffaa"},
            {'content':"3월 4일 \n LG그룹 이력서 접수 시작", 'order': 2, 'edit': true, 'modifyclick':false, 'color':"#ffffaa"},
            {'content':"Mean :\n MongDB,\n Express,\n AngularJS, \n NodeJS", 'order': 3, 'edit': true, 'modifyclick':false, 'color':"#ffffaa"}
        ]
    }

    $scope.appName = 'Note List';
    //초기 할일 목록 설정
    $scope.message="";
	$scope.clrInit = {'color':"#ffffaa"};

    //새로운 메모 추가
    $scope.save = function(message, clr){
		if(message.length == 0){
			alert("메모를 입력하세요.");
		}else{
			if ($scope.NoteList.length == 0) {
				$scope.NoteList.push({
					content:message,
					order: 1,
					edit:true,
					modifyclick:false,
					color: clr
				});
			}else{
				$scope.NoteList.push({
					content:message,
					order: $scope.NoteList[$scope.NoteList.length-1].order+1,
					edit:true,
					modifyclick:false,
					color: clr
				});
			}
			$scope.message="";
		}
    };
	var index;
    //메모 삭제
    $scope.remove = function (note) {
        index =$scope.NoteList.indexOf(note);
        $scope.NoteList.splice(index,1);
    };

    //메모 작성 취소
    $scope.cancel = function(){
        $scope.message="";
    }

	var temp;
	var colorValue;
	//메모 수정
	$scope.modify = function (msg, note, clr) {
		index =$scope.NoteList.indexOf(note);
		temp = msg;
		colorValue = clr;
//		alert(temp);
		$scope.NoteList[index].edit = false;
		$scope.NoteList[index].modifyclick = true;
	}

	$scope.cancelMemo = function(note){
		index =$scope.NoteList.indexOf(note);
		$scope.NoteList[index].content = temp;
		$scope.NoteList[index].edit = true;
		$scope.NoteList[index].modifyclick = false;	
		$scope.NoteList[index].color = colorValue;

//		alert($scope.NoteList[index].content);
	}

	$scope.saveMemo = function(note){
		$scope.NoteList[index].edit = true;
		$scope.NoteList[index].modifyclick = false;
//		alert(msg);
	}

	$scope.saveLocalMemo = function(){
        localStorageService.add(storageKey,$scope.NoteList);
        alert("메모 저장 완료");
    }

    //입력 가능 글자
	$scope.left  = function (msg) {return msg.length + " / " + 300;};

}]); //NoteCtrl

