"use strict";

module.exports = function defaultDeployment(getVersion) {
  return {
    name: 'default',
    examples: {
      commonFiles: {
        scripts: [ '../../../angular.min.js' ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      'js/lib.min.js',
      // 'js/angular-bootstrap/bootstrap.min.js',
      // 'js/angular-bootstrap/dropdown-toggle.min.js',
      // 'components/lunr.js/lunr.min.js',
      // 'components/google-code-prettify/src/prettify.js',
      // 'components/google-code-prettify/src/lang-css.js',
      'js/versions-data.js',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.min.js'
    ],
    stylesheets: [
      'css/lib.min.css',
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};