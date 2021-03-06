"use strict";

module.exports = function jqueryDeployment(getVersion) {
  return {
    name: 'jquery',
     meta:{
      description:'Suhail'
    },
    examples: {
      commonFiles: {
        scripts: [
          '../../components/jquery/jquery.js',
          '../../../angular.js'
        ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      'components/jquery/jquery.js',
      '../angular.min.js',
      '../angular-resource.min.js',
      '../angular-route.min.js',
      '../angular-cookies.min.js',
      '../angular-sanitize.min.js',
      '../angular-touch.min.js',
      '../angular-animate.min.js',
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