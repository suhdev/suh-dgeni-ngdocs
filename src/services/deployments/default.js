"use strict";
var _ = require('lodash'),
  path = require('canonical-path');

module.exports = function(conf){
  return function defaultDeployment(getVersion) {
    var def = {
      name: 'default',
      meta:{
        description:'App meta goes here'
      },
      navigation:{
        left:{

        },
        top:{
          navItems:[
            {
              type:'divider',
            },{
              type:'dropdown',
              disabled:true,
              label:'Documentation',
              url:'//google.com',
              menu:[{
                disabled:true,
                label:'Home',
                url:'/home'
              },{
                label:'Google',
                url:'/test'
              }]
            },{
              type:'dropdown',
              disabled:true,
              label:'Guides',
              url:'//google.com',
              menu:[{
                label:'Guides',
                url:'guide'
              },{
                label:'Google',
                url:'/test'
              }]
            }
          ]
        }
      },
      examples: {
        commonFiles: {
          scripts: [ '../../js/angular.min.js' ]
        },
        dependencyPath: '../../js/'
      },
    },
    files = {
      scripts: [
        'js/jquery.min.js',
        'js/lodash.min.js',
        'js/angular.min.js',
        'js/angular-animate.min.js',
        'js/angular-cookies.min.js',
        'js/angular-touch.min.js',
        'js/angular-route.min.js',
        'js/angular-sanitize.min.js',
        'js/angular-resource.min.js',
        'js/marked.min.js',
        'js/prettify.min.min.js',
        'js/bootstrap.min.js',
        'js/lunr.min.js',
        // 'js/versions-data.js',
        'js/pages-data.js',
        'js/nav-data.js',
        'js/docs.min.js',
        'js/crafty.min.js'

      ],
      stylesheets: [
        // 'css/bootstrap.min.css',
        'css/animate.min.css',
        'css/prettify-theme.css',
        'css/ukit-gradient.css',
        'css/doc_widgets.css',
        'css/font-awesome.min.css',
        'css/open-sans.min.css',
        'css/docs.css'
      ]
    };
    var opts = _.extend({},def,conf.defaultDeployment);
    _(conf.defaultDeployment.scripts)
      .forEach(function(e){
        files.scripts.push('js/'+path.basename(e));
      })
      .commit();
    _(conf.defaultDeployment.stylesheets)
      .forEach(function(e){
        files.css.push('css/'+path.basename(e));
      })
      .commit();
    // files.scripts = [].concat(files.scripts,conf.defaultDeployment.scripts?conf.defaultDeployment.scripts:[]);
    // files.stylesheets = [].concat(files.stylesheets,conf.defaultDeployment.stylesheets?conf.defaultDeployment.stylesheets:[]);
    opts.scripts = files.scripts;
    opts.stylesheets = files.stylesheets;
    return opts;
  };
};