"use strict";

var versionInfo = {};//require('../../../../lib/versions/version-info');
var cdnUrl = "//ajax.googleapis.com/ajax/libs/angularjs/1.0";

module.exports = function productionDeployment(getVersion) {
  return {
    name: 'production',
     meta:{
      description:'Suhail'
    },
    examples: {
      commonFiles: {
        scripts: [ cdnUrl + '/angular.min.js' ]
      },
      dependencyPath: cdnUrl + '/'
    },
    scripts: [
      cdnUrl + '/angular.min.js',
      cdnUrl + '/angular-resource.min.js',
      cdnUrl + '/angular-route.min.js',
      cdnUrl + '/angular-cookies.min.js',
      cdnUrl + '/angular-sanitize.min.js',
      cdnUrl + '/angular-touch.min.js',
      cdnUrl + '/angular-animate.min.js',
      'components/marked/lib/marked.js',
      'js/angular-bootstrap/bootstrap.min.js',
      'js/angular-bootstrap/dropdown-toggle.min.js',
      'components/lunr.js/lunr.min.js',
      'components/google-code-prettify/src/prettify.js',
      'components/google-code-prettify/src/lang-css.js',
      'js/versions-data.js',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.min.js'
    ],
    stylesheets: [
      'components/bootstrap/css/bootstrap.min.css',
      'components/open-sans-fontface/open-sans.css',
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};