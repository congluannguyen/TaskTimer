angular.module('starter.controllers', [], ['ngCordova'])

    //.controller('AppCtrl', '$scope', 'Todo','$state', function ($scope, $ionicModal,Todo,$state) {
    //    // Form data for the login modal
    //    Todo.getAll().success(function (data) {
    //        $scope.items = data.results;
    //    });
    //    $scope.todo={};
    //
    //    $scope.create=function(){
    //        Todo.create({content:$scope.todo.content}).success(function(data){
    //            $state.go('app');
    //        });
    //    }
    //})
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6},
            {title: 'Dubstep', id: 7},
            {title: 'Indie', id: 8},
            {title: 'Rap', id: 9}
        ];
        //$scope.remove = function(chat) {
        //  Chats.remove(chat);
        //}
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('PopupCtrl', function ($scope, $ionicPopup) {
    // Triggered on a button click, or some other target
    $scope.showPopup = function () {
        $scope.data = {}
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template:  '  <li class="item item-input item-stacked-label"><input type="text" placeholder="Start typing..." name="content" ng-model="todo.content"></li>',

            title: 'Enter new list',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',

                    onTap: function (e) {

                    }
                },
            ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    };
    // A confirm dialog

})

