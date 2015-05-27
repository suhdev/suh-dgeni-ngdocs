module.exports = {
  name: 'installation',
  transforms: function(doc, tag, value) {
    if ( doc.docType === 'module' ) {
    	doc.installation = value;
    }
    return value;
  }
};
