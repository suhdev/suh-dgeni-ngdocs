module.exports = {
  name: 'briefdesc',
  transforms: function(doc, tag, value) {
    doc.briefdesc = value;
    return value;
  }
};
