angular.module('docsApp', [
  'ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngAnimate',
  'DocsController',
  'versionsData',
  'pagesData',
  'navData',
  'directives',
  'errors',
  'examples',
  'search',
  'tutorials',
  'versions',
  'ngMaterial',
  'bootstrap',
  'ui.bootstrap.dropdown'
])

.config(['$locationProvider','$mdThemingProvider',function($locationProvider,$mdThemingProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('light-blue');
}]);
