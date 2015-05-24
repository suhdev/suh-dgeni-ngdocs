angular.module('Crafty',['ngRoute',
  'ngCookies',
  'ngSanitize',
  'ngAnimate',
  // 'versionsData',
  'pagesData',
  'navData',
  'directives',
  'bootstrap',
  'errors',
  'examples',
  'search',
  'tutorials',
  'versions'])
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);