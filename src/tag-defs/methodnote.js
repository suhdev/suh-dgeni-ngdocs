module.exports = {
    name: 'methodnote',
    multi: true,
    docProperty: 'notes',
    transforms: function(doc,tag,value){
    	console.log('hey there');
    	console.log(doc);
    	doc.notes = doc.notes || [];
    	doc.notes.push(value);
    }
  };