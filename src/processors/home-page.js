"use strict";

var _ = require('lodash');
var path = require('canonical-path');

module.exports = function(conf){
  return function generateHomePageDataProcessor(log) {
    return {
      $runAfter: ['paths-computed', 'generateKeywordsProcessor'],
      $runBefore: ['rendering-docs'],
      $process: function(docs) {
        if (conf.homePage){
          docs.push({
            docType: 'home-page',
            id: 'home-page',
            template: conf.homePage.template || 'home-page.template.html',
            outputPath: 'partials/api/home.base.html',
            homePage: conf.homePage.data || {}
          });
        }


      }
    };
  };
};
