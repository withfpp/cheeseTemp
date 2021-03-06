'use strict';

/**
 * @ngdoc module
 * @name triSeedModule
 * @description
 *
 * Start up demo module to show how modules work
 */
angular.module('kidsModule', [])
.config(function ($translatePartialLoaderProvider, $stateProvider) {

    // Tell the translate module that we want translations to be loaded from the il8n folder in this module
    $translatePartialLoaderProvider.addPart('app/kids');

    // Create a state for our seed test page
    $stateProvider
    .state('admin-panel.default.kids', {
        url: '/kids',
        templateUrl: 'app/kids/kid-list.tmpl.html',
        controller: 'KidsListController'
    })
    .state('admin-panel.default.kid-details', {
        url: '/kids/:kidId',
        templateUrl: 'app/kids/kid-details.tmpl.html',
        controller: 'KidsDetailsController'
    })



})
.run(function(SideMenu) {
    // add a menu for the seed page we created in the $stateProvider above
    SideMenu.addMenu({
        // give the menu a name to show (should be translatable and in the il8n folder json)
        name: 'MENU.KIDS.KIDS-PAGE',
        // point this menu to the state we created in the $stateProvider above
        state: 'admin-panel.default.kids',
        // set the menu type to a link
        type: 'link',
        // set an icon for this menu
        icon: 'icon-cake',
        // set a proirity for this menu item, menu is sorted by priority
        priority: 1.1
    });
});
