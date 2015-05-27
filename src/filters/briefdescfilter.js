var _ = require('lodash');

module.exports = function(getDocFromAlias,aliasMap) {
  return {
    name: 'briefdesc',
    process: function(url, title, doc) {
    	var docs = aliasMap.getDocs(url);
    	var d = docs[0];
      	return d.briefdesc || (d.description?d.description.split("\n\n")[0]:url);
    }
  };
};