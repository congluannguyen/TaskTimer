// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
    .run(function ($ionicPlatform, $cordovaSQLite)
    {
        //$scope.dataId=[];
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            db = $cordovaSQLite.openDB({name: "my.db"});
            var query = 'CREATE TABLE IF NOT EXISTS List (id integer primary key, listname text)';
            $cordovaSQLite.execute(db, query, []);
            var query_insert='INSERT OR REPLACE INTO List (id,listname) VALUES ("1","To do")';
            $cordovaSQLite.execute(db, query_insert, []);
            var query1 = 'CREATE TABLE IF NOT EXISTS Task (id integer primary key,id_list integer,description text,hours integer, minutes integer,seconds integer,taskname text,status text,notification text)';
            $cordovaSQLite.execute(db, query1, []);
            //$scope.dataId.push(1);
            //alert($scope.dataId);

        });
    })


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'

            })


            .state('app.tasks', {
                url: "/tasks/:tasksId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/tasks.html",
                        controller: 'TasksCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/task/:taskId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/task.html",
                        controller: 'TaskCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/tasks/1');
    });
