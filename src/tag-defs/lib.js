module.exports = {
  name: 'angular',
  transforms: function(doc, tag, value) {
    if ( doc.docType === 'module' ) {
    	doc.angularVersion = value.split(/[ \t]+/);
    }
    return parseInt(value,10);
  }
};
