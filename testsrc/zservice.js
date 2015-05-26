/**
 * @ngdoc service
 * @name Gulp
 * @module Test
 * @description 
 * this is a good service
 * @example
 <example module="Suhail" deps="app.min.js" fixBase="true" name="gulp-example">
<file name="index.html">
  <div class="container" >
    <div ng-bind="i18n.kick_boxing" suh-lang-group="kick.throw" sh-translation="kick.boxing" ng-attr-title="{{i18n.kick_boxing}}" ng-attr-cx="{{i18n.kick_throw}}">
    </div>
    <div ng-controller="TestCtrl as ctrl" >
      <button ng-click="ctrl.switchLanguage()">Switch</button>
    </div> 
  </div>
</file>
<file name="script.js">
  angular.module('Suhail',['TestModule']);
    angular.module('Suhail')
      .controller('TestCtrl', ['$scope', function ($S) {
        var langs = ['en-GB','ar-SA'];
        this.switchLanguage = function(){
          langs.push(langs.shift());
          console.log('hey');
        };
      }])
</file>
</example>
 */
 function Gulp(){
 	/**
   * @ngdoc method
   * @name Gulp#getMe
   * @methodOf Gulp
   * @module Test
   * @param {string} id the identifier of the method
   * @description This is a good method
   */
 }

 /**
  * @ngdoc directive
  * @name Dog
  * @module Test
  * @description 
  * This is just a test directive
  * @example
<example module="Suhail" deps="app.min.js" fixBase="true" name="gulp-example">
<file name="index.html">
  <div class="container" >
    <div ng-bind="i18n.kick_boxing" suh-lang-group="kick.throw" sh-translation="kick.boxing" ng-attr-title="{{i18n.kick_boxing}}" ng-attr-cx="{{i18n.kick_throw}}">
    </div>
    <div ng-controller="TestCtrl as ctrl" >
      <button ng-click="ctrl.switchLanguage()">Switch</button>
    </div> 
  </div>
</file>
<file name="script.js">
  angular.module('Suhail',['TestModule']);
    angular.module('Suhail')
      .controller('TestCtrl', ['$scope', function ($S) {
        var langs = ['en-GB','ar-SA'];
        this.switchLanguage = function(){
          langs.push(langs.shift());
          console.log('hey');
        };
      }])
</file>
</example>
  * @briefdesc 
  * A good description
  * @todo {important} good to go
  */