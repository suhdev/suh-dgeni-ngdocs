angular.module('Crafty')
  .controller('BreadcrumbCtrl',['$scope','$rootScope','$location','NG_PAGES','NG_NAVIGATION',
  function($S,$RT,$L,NGP,NGV){
  var self = this;
  this.parents = _(NGV).keys();

  this.parent = '';
  this.items = [];

  this.regenerate = function(parent,path){

  };

  this.isActive = function(item){

  };

  $RT.$on('$locationChangeSuccess',function(nv,ov){
    var pa = $L.path().substr(1).split('/');
    if (pa.length > 0){
      var tt = [],temp ='';
      _(pa).forEach(function(e,i){
        if (i>0){
          pa[i] = pa[i-1]+'/'+e;
        }
        tt.push({
          label:NGP[pa[i]]?NGP[pa[i]].name: 'Home',
          url:NGP[pa[i]]?NGP[pa[i]].path:'api'
        });
      }).value();
      self.items = tt;
    }

  });


}]);