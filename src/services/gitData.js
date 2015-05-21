"use strict";

// var versionInfo = require('../../../lib/versions/version-info');

/**
 * @dgService gitData
 * @description
 * Information from the local git repository
 */
module.exports = function gitData() {
  return {
    version: {minor:"1.0",major:"1.0",version:"1.0"},//versionInfo.currentVersion,
    versions: [{minor:"1.0",major:"1.0",version:"1.0"}],//versionInfo.previousVersions,
    info: "1.0"
  };
};
