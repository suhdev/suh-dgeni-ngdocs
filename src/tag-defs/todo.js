module.exports = {
  name: 'todo',
  multi:true,
  transforms: function(doc, tag, value) {
    var r = /\{(?:(danger|important|urgent)|(basic|primary)|(next|warning))\}/,
    	type = value.replace(r,function(all,danger,basic,next){
    		return danger?'danger':(basic?basic:(next?next:'primary'));
    	});
    doc.todos = doc.todos || [];
    var todo = {
    	value:value.replace(r,'').trim(),
    	type:type
    };
    doc.todos.push(todo);
    return value;
  }
};
