var db = null;
var id_TaskTasks = null;
var hours=[];
var minutes=[];
var seconds=[];

angular.module('starter.controllers', ['ngCordova', 'ionic', 'timer'])




    .controller('AppCtrl', function ($scope,$stateParams, $cordovaSQLite,$timeout,$ionicLoading,$rootScope,$ionicActionSheet,$ionicPopup) {

        //Loading the first  when go to App
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $timeout(function () {
            $ionicLoading.hide();
            //var query = "SELECT * FROM List ORDER BY id DESC ";
            //$cordovaSQLite.execute(db, query, []).then(function (res) {
            //    var list = [];
            //    for (i = 0; i < res.rows.length; i++) {
            //        list.push({id_List: res.rows.item(i).id, name_List: res.rows.item(i).listname});
            //    }
            //    $scope.dataLists = list;
            //})
            $rootScope.$broadcast('selectList_App');
        }, 2000);


        //Select all items of list
        $rootScope.$on('selectList_App',function(event){
            var query = "SELECT * FROM List ORDER BY id DESC";
            $scope.dataLists=[];
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                var list = [];
                for (i = 0; i < res.rows.length; i++) {
                    list.push({id_List: res.rows.item(i).id, name_List: res.rows.item(i).listname});
                }
                    $scope.dataLists = list;
            })
        });
        $rootScope.$on('selectList_App_ByIdList',function(event,idList){
            var query = "SELECT * FROM List WHERE id=? ORDER BY id DESC";
            $cordovaSQLite.execute(db, query, [idList]).then(function (res) {
                for (i = 0; i < res.rows.length; i++) {
                    $scope.TitleTasks=res.rows.item(i).listname;
                }
                $scope.dataLists = list;
            })
        });
        //Select all items of Task where id_List
        $rootScope.$on('selectTask_App',function(event,id_TT){
            var query = 'SELECT * FROM Task WHERE id_list=' + id_TT;
            var Task = [];
            $cordovaSQLite.execute(db, query, []).then(function (result) {
                for (i = 0; i < result.rows.length; i++) {
                   Task.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                    $scope.dataTasks=Task;
                }

            });
        });

        //Select Task by ID
        $rootScope.$on('selectTask_App_ById',function(event,idTask){
            var query = 'SELECT * FROM Task WHERE id=?';

            $cordovaSQLite.execute(db, query, [idTask]).then(function (result) {
                var Task = [];
                for (i = 0; i < result.rows.length; i++) {
                    Task.push({id_Task: result.rows.item(i).id, name_Task : result.rows.item(i).taskname,Des_Task : result.rows.item(i).description, hours_Task: result.rows.item(i).hours,minutes_Task: result.rows.item(i).minutes,seconds_Task: result.rows.item(i).seconds});
                }
                $scope.dataTask=Task;
            });
        });




        $scope.sheetShow = function(idList_Del) {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: 'Delete'}

                ],
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete this list?',
                        template: 'Are you want to delete this List?'
                    });
                    confirmPopup.then(function (result) {
                        if (result) {
                            var query ='DELETE FROM List WHERE id=?';
                            $cordovaSQLite.execute(db,query,[idList_Del]).then(function(){
                                $rootScope.$broadcast('selectList_App');

                            });
                        } else {
//                    console.log('You are not sure. :v');
                        }
                    });
                    return true;
                }
            });

        };


    })









    .controller('TasksCtrl', function ($scope,$rootScope, $stateParams, $cordovaSQLite,$timeout, $ionicLoading,$ionicPopup) {
        $scope.toTask = [];
        id_TaskTasks=$stateParams.tasksId;
        //Pull to refresh
        $scope.doRefresh =function(){
          $timeout(function(){
              var query = 'SELECT * FROM Task WHERE id_list=' + $stateParams.tasksId;
              $scope.dataTasks = [];
              $cordovaSQLite.execute(db, query, []).then(function (result) {
                  for (i = 0; i < result.rows.length; i++) {
                      $scope.dataTasks.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                  }
              }) .finally(function() {
                  // Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');
              });
          },1000 ) ;
        };




        // loading when u choose list (show all items of list)
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $timeout(function () {
            $ionicLoading.hide();
            var query = 'SELECT * FROM Task WHERE id_list=' + $stateParams.tasksId;
            $scope.dataTasks = [];
            $cordovaSQLite.execute(db, query, []).then(function (result) {
                for (i = 0; i < result.rows.length; i++) {
                    $scope.dataTasks.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                }
            });
            var query1 = "SELECT * FROM List WHERE id=? ORDER BY id DESC";
            $cordovaSQLite.execute(db, query1, [$stateParams.tasksId]).then(function (res) {
                for (i = 0; i < res.rows.length; i++) {
                    $scope.TitleTasks=res.rows.item(i).listname;
                }
            });
        }, 2000);


        $scope.slapp=function(){
            $scope.dataTasks=[];
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $timeout(function () {
                $ionicLoading.hide();
                alert(id_TaskTasks);
                //$rootScope.$broadcast('selectTask_App',id_TaskTasks);
                var query = 'SELECT * FROM Task WHERE id_list=' + id_TaskTasks;
                var Task = [];
                $cordovaSQLite.execute(db, query, []).then(function (result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        Task.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                        $scope.dataTasks=Task;
                    }

                });


            }, 2000);

        };


        //add new task
        $scope.insertTask = function () {
            hours=0;
            minutes=0;
            seconds=0;
            var query = 'INSERT INTO Task (id_list,taskname,hours,minutes,seconds,status,notification) VALUES (?,?,"' + hours +'","'+minutes+'","'+seconds+'","working","Unfinished work")';
            $cordovaSQLite.execute(db, query, [$stateParams.tasksId, $scope.toTask.taskContent]).then(function (res) {

                $scope.toTask.taskContent = "";
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $timeout(function () {
                    $ionicLoading.hide();
                    var query = 'SELECT * FROM Task WHERE id_list=' + $stateParams.tasksId;
                    $scope.dataTasks = [];
                    $cordovaSQLite.execute(db, query, []).then(function (result) {
                        for (i = 0; i < result.rows.length; i++) {
                            $scope.dataTasks.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                        }
                    })
                }, 3000);
            });
        };



        $scope.delete_Tasks=function(idDel){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete this task?',
                template: 'Are you want to delete this task?',
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Delete</b>',
                        type: 'button button-assertive',
                        onTap: function(e) {
                            var query='DELETE FROM Task WHERE id=?';
                            $cordovaSQLite.execute(db,query,[idDel]).then(function(){
                                $ionicLoading.show({
                                    content: 'Loading',
                                    animation: 'fade-in',
                                    showBackdrop: true,
                                    maxWidth: 200,
                                    showDelay: 0
                                });
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    var query = 'SELECT * FROM Task WHERE id_list=' + $stateParams.tasksId;
                                    $scope.dataTasks = [];
                                    $cordovaSQLite.execute(db, query, []).then(function (result) {
                                        for (i = 0; i < result.rows.length; i++) {
                                            $scope.dataTasks.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
                                        }
                                    });
                                }, 2000);
                            });
                        }
                    }
                ]
            });
//            confirmPopup.then(function (result) {
//                if (result) {
//                    var query='DELETE FROM Task WHERE id=?';
//                    $cordovaSQLite.execute(db,query,[idDel]).then(function(){
//                        $ionicLoading.show({
//                            content: 'Loading',
//                            animation: 'fade-in',
//                            showBackdrop: true,
//                            maxWidth: 200,
//                            showDelay: 0
//                        });
//                        $timeout(function () {
//                            $ionicLoading.hide();
//                            var query = 'SELECT * FROM Task WHERE id_list=' + $stateParams.tasksId;
//                            $scope.dataTasks = [];
//                            $cordovaSQLite.execute(db, query, []).then(function (result) {
//                                for (i = 0; i < result.rows.length; i++) {
//                                    $scope.dataTasks.push({id_Tasks: result.rows.item(i).id, name_Tasks : result.rows.item(i).taskname,Des_Tasks : result.rows.item(i).description, hours_Tasks: result.rows.item(i).hours,minutes_Tasks: result.rows.item(i).minutes,seconds_Tasks: result.rows.item(i).seconds,status_Tasks: result.rows.item(i).status,notification_Tasks: result.rows.item(i).notification});
//                                }
//                            });
//                        }, 2000);
//                    });
//                } else {
////                    console.log('You are not sure. :v');
//                }
//            });
        };
    })








    .controller('TaskCtrl', function ($scope, $stateParams, $cordovaSQLite,$state,$rootScope,$ionicPopup,$ionicLoading,$timeout) {
        $scope.toTask=[];
        $rootScope.$broadcast('selectTask_App_ById',$stateParams.taskId);//Using $rootScope : selectTask_App_ById of AppCtrl

        //Using timer
        $scope.stopT=function(idTaskStop,nameTaskStop){
            $scope.stopTimer(idTaskStop,nameTaskStop);
        };
        //Timer
        $scope.timerRunning = false;

        $scope.startTimer = function () {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };
        //Stop and update time to database
        $scope.stopTimer = function (idTaskStop,name) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Stop this task?',
                template: 'Are you sure? Are you want to stop this task?',
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Stop</b>',
                        type: 'button button-assertive',
                        onTap: function(e) {
                            $scope.$broadcast('timer-stop');
                            var query="UPDATE Task SET description = '"+$scope.toTask.description+"' , hours='"+hours+"' , minutes='"+minutes+"', seconds='"+seconds+"',status='worked',notification='Finished work!' WHERE id='"+idTaskStop+"'";
                            $cordovaSQLite.execute(db, query, []).then(function(res){
                                alert("Congratulations, you have completed the work : " +name+" . In time : "+hours +" : "+minutes+" : "+seconds);
                                $state.go('app.tasks', {tasksId : id_TaskTasks});
                                $scope.slapp();
                            });
                        }
                    }
                ]
            });
//            confirmPopup.then(function (result) {
//                if (result) {
//
//                } else {
////                    console.log('You are not sure. :v');
//                }
//            });
            $scope.timerRunning = true;
        };
        $scope.$on('timer-stopped', function (event, args) {
            hours=args.hours;
            minutes=args.minutes;
            seconds=args.seconds;
        });
    })





//Show popup
    .controller('PopupCtrl', function ($scope, $ionicPopup,$stateParams, $cordovaSQLite,$timeout, $ionicLoading,$rootScope) {
        $scope.todo = [];

        // Triggered on a button click, or some other target
        $scope.showPopup = function () {
            var myPopup = $ionicPopup.show({
                template: ' <input type="text" placeholder="Start typing..." name="content" required ng-model="todo.content">',

                title: 'Enter new list',
                scope: $scope,
                buttons: [
                    {text: 'Cancel',type:'button-small'},
                    {
                        text: '<b>Save</b>',
                        type: 'button-assertive button-small',
                        onTap: function (e) {
                            var query = 'INSERT INTO List (listname) VALUES (?)';
                            $cordovaSQLite.execute(db, query, [$scope.todo.content]).then(function (res) {
                                $ionicLoading.show();
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    $rootScope.$broadcast('selectList_App');
                                }, 2000);
                            });
                            $scope.todo.content = "";
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };
    });
