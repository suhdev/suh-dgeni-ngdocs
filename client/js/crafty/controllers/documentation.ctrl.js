angular.module('Crafty')
  .controller('DocumentationCtrl',['$scope','$rootScope','$location',
  'NG_NAVIGATION','NG_PAGES',function($S,$RT,$L,NGV,NGP){
  var self = this;
  this.showSearch = false;
  this.navMenu = [];
  this.file = '';
  this.pageTitle = '';
  this.parents = _(NGV).keys().value();

  this.toggleSearch = function(){
    self.showSearch = !self.showSearch;
    if (self.showSearch){
      console.log('Suhail');
      $('#search-field').trigger('click',{});
    }
  };

  $S.$watch(function docsPathWatch() {return $L.path(); }, function docsPathWatchAction(path) {

    path = path.replace(/^\/?(.+?)(\/index)?\/?$/, '$1');

    currentPage = $S.currentPage = NGP[path];

    if ( currentPage ) {
      self.file = 'partials/' + path + '.html';
      $S.currentArea = NGV[currentPage.area];
      var pathParts = currentPage.path.split('/');
      var breadcrumb = $S.breadcrumb = [];
      var breadcrumbPath = '';
      angular.forEach(pathParts, function(part) {
        breadcrumbPath += part;
        breadcrumb.push({ name: (NGP[breadcrumbPath]&&NGP[breadcrumbPath].name) || part, url: breadcrumbPath });
        breadcrumbPath += '/';
      });
    } else {
      $S.currentArea = NGV['api'];
      $S.breadcrumb = [];
      self.file = 'partials/api/home.base.html';
    }
  });

  $S.navClass = function(navItem) {
    return {
      active: navItem.href && this.currentPage && this.currentPage.path,
      current: this.currentPage && this.currentPage.path === navItem.href,
      'nav-index-section': navItem.type === 'section'
    };
  };

  $RT.$on('$LChangeSuccess',function(nv,ov){
    var path = $L.path().substr(1);
    self.file = NGP[path]?('partials/'+NGP[path].path+'.html'):'partials/home.base.html';

  });

  var INDEX_PATH = /^(\/|\/index[^\.]*.html)$/;
  if (!$L.path() || INDEX_PATH.test($L.path())) {
    $L.path('/api').replace();
  }
}]);