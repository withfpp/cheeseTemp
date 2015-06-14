'use strict';

/**
 * @ngdoc module
 * @name triSeedModule
 * @description
 *
 * Start up demo module to show how modules work
 */
angular.module('familyModule', [])
.config(function ($translatePartialLoaderProvider, $stateProvider) {

    // Tell the translate module that we want translations to be loaded from the il8n folder in this module
    $translatePartialLoaderProvider.addPart('app/family');

    // Create a state for our seed test page
    $stateProvider
    .state('admin-panel.default.family', {
        url: '/family',
        templateUrl: 'app/family/seed-page.tmpl.html',
        controller: 'FamilyController'
    })
    .state('admin-panel.default.family-create', {
        url: '/family/create',
        templateUrl: 'app/family/family-create.tmpl.html',
        controller: 'FamilyController'
    })


})
.run(function(SideMenu) {
    // add a menu for the seed page we created in the $stateProvider above
    SideMenu.addMenu({
        // give the menu a name to show (should be translatable and in the il8n folder json)
        name: 'Create a Family',
        // point this menu to the state we created in the $stateProvider above
        state: 'admin-panel.default.family-create',
        // set the menu type to a link
        type: 'link',
        // set an icon for this menu
        icon: 'icon-person-add',
        // set a proirity for this menu item, menu is sorted by priority
        priority: 1.1
    });
});
