module.exports = {
  name: 'note',
  multi:true,
  transforms: function(doc, tag, value) {
    var r = /\{(danger|primary|sucess|warning)\}/,
    	type = value.match(r);
    doc.notes = doc.notes || [];
    var note = {
    	value:value.replace(r,'').trim(),
    	type:'primary'
    };
    if (type && type.length > 0){
    	note.type = type[1].trim()
    }
    doc.notes.push(note);
    return value;
  }
};
