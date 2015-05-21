"use strict";

module.exports = function debugDeployment(getVersion) {
  return {
    name: 'debug',
    examples: {
      commonFiles: {
        scripts: [ '../../../angular.js' ]
      },
      dependencyPath: '../../../'
    },
    scripts: [
      '../angular.js',
      '../angular-resource.js',
      '../angular-route.js',
      '../angular-cookies.js',
      '../angular-sanitize.js',
      '../angular-touch.js',
      '../angular-animate.js',
      'components/marked/lib/marked.js',
      'js/angular-bootstrap/bootstrap.js',
      'js/angular-bootstrap/dropdown-toggle.js',
      'components/lunr.js/lunr.js',
      'components/google-code-prettify/src/prettify.js',
      'components/google-code-prettify/src/lang-css.js',
      'js/versions-data.js',
      'js/pages-data.js',
      'js/nav-data.js',
      'js/docs.js'
    ],
    stylesheets: [
      'components/bootstrap/css/bootstrap.css',
      'components/open-sans-fontface/open-sans.css',
      'css/prettify-theme.css',
      'css/docs.css',
      'css/animations.css'
    ]
  };
};