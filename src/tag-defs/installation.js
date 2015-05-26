module.exports = {
  name: 'installation',
  transforms: function(doc, tag, value) {
    if ( doc.docType === 'module' ) {
    	// console.log('SUHAIL: ',value);
    	doc.installation = value;
    }
    return value;
  }
};
