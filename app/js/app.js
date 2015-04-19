/*
app.js - angular-card-app
Developed by Sankalp Lakhina [ sankalp.lakhina91@gmail.com ]
*/

/*global window, angular*/

(function (angular) {
    'use strict';
    
    // activating tooltips
    angular.element('[data-toggle="tooltip"]').tooltip();

    // angular app declaration
    var app = angular.module('angularCardApp', ['infinite-scroll', 'ngStorage']);

    app.factory('SharedService', ['$rootScope', function ($rootScope) {

        var factory = {},
            listView = false;

        function broadcastMessage(msgStr) {
            $rootScope.$broadcast(msgStr);
        }

        factory.getView = function () {
            return listView;
        };

        factory.updateView = function (toggledValue) {
            listView = toggledValue;
            broadcastMessage('ViewUpdated');
        };

        factory.addCard = function (newCard) {
            broadcastMessage('AddCard');
        };

        return factory;
    }]);

    app.controller('HeaderController', ['$scope', 'SharedService', '$localStorage', function ($scope, SharedService, $localStorage) {
        
        
        // fetching the current view layout from SharedService factory and setting it
        $scope.listView = SharedService.getView();
        
        // toggles the view layout and broadcasts the ViewUpdated event
        $scope.toggleView = function () {
            $scope.listView = !$scope.listView;
            SharedService.updateView($scope.listView);
        };
        
        // broadcasts the AddCard event
        $scope.addNewCard = function () {
            SharedService.addCard();
        };
        
        // clears the local storage data
        $scope.clearLocalstorage = function () {
            $localStorage.$reset();
        };

    }]);
    
    app.controller('BodyController', ['$scope', 'SharedService', '$rootScope', '$localStorage', function ($scope, SharedService, $rootScope, $localStorage) {

        var cardReference,
            cardIndex,
            i,
            defaultList = [
                {
                    imageUrl: 'app/img/bg_4.jpg',
                    title: 'Default Card 1',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 1'
                },
                {
                    imageUrl: 'app/img/bg_5.jpg',
                    title: 'Default Card 2',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 2'
                },
                {
                    imageUrl: 'app/img/bg_6.jpg',
                    title: 'Default Card 3',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 3'
                },
                {
                    imageUrl: 'app/img/bg_4.jpg',
                    title: 'Default Card 4',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 1'
                },
                {
                    imageUrl: 'app/img/bg_5.jpg',
                    title: 'Default Card 5',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 2'
                },
                {
                    imageUrl: 'app/img/bg_6.jpg',
                    title: 'Default Card 6',
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. 4'
                }
            ];

        // checking if the localstorage exists, else creating a localstorage of default list
        $localStorage.cards ? '' : $localStorage.$default({cards: defaultList});
        
        
        // binding $scope.cards with $localStorage.cards so that they are binded always, defaultList is the fallback
        $scope.cards = $localStorage.cards || defaultList;

        // fetching the current view layout from SharedService factory and setting it
        $scope.listView = SharedService.getView();


        // catching the broadcasted ViewUpdated event and toggling the $scope.listView
        $rootScope.$on('ViewUpdated', function () {
            $scope.listView = SharedService.getView();
        });

        
        // catching the broadcasted AddCard event and add a new card to the card list
        $rootScope.$on('AddCard', function () {

            $scope.cards.unshift(
                {
                    imageUrl: 'app/img/bg_' + ((Math.floor(Math.random() * 3) + 1) + 3) + '.jpg',
                    title: 'New Card ' + ($scope.cards.length + 1),
                    description: 'New Card description'
                }
            );
            (function () {
                angular.element('body').animate({scrollTop: angular.element('body').offset().top}, 'slow');
            }());
        });


        // opens the modal window with current clicked card details, keeps reference of it
        $scope.editCard = function (card, index) {

            $scope.modalObj = {
                imageUrl: card.imageUrl,
                title: card.title,
                description: card.description
            };

            cardReference = card;
            cardIndex = index;

            angular.element('#CardModal').modal('show');
        };
        

        // saves the current changes done on Modal window to original card instance of ng-repeat
        $scope.saveCardDetails = function () {

            cardReference.title = $scope.modalObj.title;
            cardReference.description = $scope.modalObj.description;
        };
        
        
        // deletes the currently selected card in modal window from the card list
        $scope.deleteCard = function () {
            $scope.cards.splice(cardIndex, 1);
        };
        
        
        // loads next set of cards (6 at a time, limited to 200 for now)
        $scope.loadMore = function () {
            
            if ($scope.cards.length < 200) {
                for (i = 1; i <= 6; i += 1) {
                    $scope.cards.push({
                        imageUrl: 'app/img/bg_' + ((Math.floor(Math.random() * 3) + 1) + 3) + '.jpg',
                        title: 'Infinite Card ' + ($scope.cards.length + 1),
                        description: 'Infinte Card description'
                    });
                }
            } else {
                return;
            }
        };

    }]);

}(window.angular));