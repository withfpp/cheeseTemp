'use strict';

/**
* @ngdoc directive
* @name calendarWidget
* @restrict E
* @scope
*
* @description
*
* Adds some calendar data
*
* @usage
* ```html
* <widget calendar-widget></widget>
* ```
*/
angular.module('triAngularDashboards')
.directive('calendarWidget', function(uiCalendarConfig) {
    return {
        require: 'widget',
        restrict: 'A',
        controller: function($scope) {
            $scope.calendarEvents = [];
        },
        link: function($scope) {
            $scope.calendarOptions = {
                header: false,
                height: 'auto',
                viewRender: function(view) {
                    $scope.currentDay = view.calendar.getDate();
                }
            };

            $scope.changeMonth = function(direction) {
                uiCalendarConfig.calendars.calendarWidget.fullCalendar(direction);
            };
        }
    };
});