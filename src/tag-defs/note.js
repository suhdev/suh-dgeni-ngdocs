var REGEX = /(?:\{([\S]+)\})?[\s]*(?:\{([\S\s]+)\})?[\s]*([\S\s]+)/; 
module.exports = {
  name: 'note',
  multi:true,
  transforms: function(doc, tag, value) {
    doc.notes = doc.notes || [];
    var m = value.match(REGEX),
    note = {
    	value:value,
      label:'note',
    	type:'primary'
    };
    if (m && m.length > 0){
      note.type = m[1] || 'primary';
      note.label = m[2] || 'note';
      note.value = m[3];
    }
    switch(note.type){
      case 'primary':
      case 'basic':
      case 'later':
      note.type = 'primary';
      break;
      case 'urgent':
      case 'important':
      case 'danger':
      case 'fixnow':
      case 'breaking':
      note.type = 'danger';
      break;
      case 'needed':
      case 'warn':
      case 'bug':
      case 'issue':
      note.type = 'warn';
      break;
    }
    doc.notes.push(note);
    return value;
  }
};
