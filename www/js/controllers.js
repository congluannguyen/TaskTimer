angular.module('starter.controllers', ['ngCordova'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal

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

