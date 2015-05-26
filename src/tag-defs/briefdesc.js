module.exports = {
  name: 'briefdesc',
  transforms: function(doc, tag, value) {
  	console.log(value);
    doc.briefdesc = value;
    return value;
  }
};
