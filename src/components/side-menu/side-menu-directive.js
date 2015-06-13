'use strict';

/**
* @ngdoc directive
* @name sideMenu
* @restrict E
* @scope
*
* @description
*
* Handles the main admin sidemenu
*
* @usage
* ```html
* <side-menu></side-menu>
* ```
*/
angular.module('triAngular')
.directive('sideMenu', function($location, $mdTheming, triTheming, SideMenu) {
    return {
        restrict: 'E',
        template: '<md-content><side-menu-item ng-repeat="item in menu | orderBy:\'priority\'" item="item"></side-menu-item></md-content>',
        scope: {},
        controller: function($scope) {
            // get the menu structure from the menu service
            $scope.menu = SideMenu.getMenu();
        },
        link: function($scope, $element, attrs) {
            $mdTheming($element);
            var $mdTheme = $element.controller('mdTheme');

            attrs.$observe('mdTheme', function() {
                var menuColor = triTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
                var menuColorRGBA = triTheming.rgba(menuColor.value);
                $element.css({ 'background-color': menuColorRGBA });
                $element.children('md-content').css({ 'background-color': menuColorRGBA });
            });
        }
    };
});