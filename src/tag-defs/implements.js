var REGEX = /(?:\{([\S]+)\})?[\s]*(?:\{([\S\s]+)\})?[\s]*([\S\s]+)/; 
module.exports = {
    name: 'implements',
    multi:true,
    transforms: function(doc, tag, value) {
      doc.interfaces = doc.interfaces || [];
      doc.interfaces.push(value);
      return value;
    }
  };
