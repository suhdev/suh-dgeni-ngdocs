var _ = require('lodash');
module.exports = function (conf){
	return function defaultDeployment()
	var defaults = {
		    name: 'default',
		    logoUrl: '',
		    appUrl:'',
		    meta:{
		      description:'Default'
		    },
		    examples: {
		      commonFiles: {
		        scripts: [ '../../../angular.min.js' ]
		      },
		      dependencyPath: '../../../'
		    }
		},
		files = {
	    scripts: [
	      'js/jquery.min.js',
	      'js/angular.min.js',
	      'js/angular-animate.min.js',
	      'js/angular-cookies.min.js',
	      'js/angular-touch.min.js',
	      'js/angular-route.min.js',
	      'js/angular-sanitize.min.js',
	      'js/angular-resource.min.js',
	      'js/angular-sanitize.min.js',
	      'js/angular-bootstrap.min.js',
	      'js/marked.min.js',
	      'js/prettify.min.min.js',
	      'js/bootstrap.min.js',
	      'js/ui-bootstrap-tpls.min.js',
	      'js/lunr.min.js',
	      'js/versions-data.js',
	      'js/pages-data.js',
	      'js/nav-data.js',
	      'js/docs.min.js'
	    ],
	    stylesheets: [
	      'css/bootstrap.min.css',
	      'css/prettify-theme.css',
	      'css/docs.css',
	      'css/animations.css'
	    ]
	  };
	var opts = _.extend({},defaults,conf);
	files.scripts = [].concat(files.scripts,conf.scripts?conf.scripts:[]);
	files.stylesheets = [].concat(files.stylesheets,conf.stylesheets?conf.stylesheets:[]);
	return opts;

};