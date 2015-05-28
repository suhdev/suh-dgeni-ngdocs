var REGEX = /(?:\{([\S]+)\})?[\s]*(?:\{([\S\s]+)\})?[\s]*([\S\s]+)/; 
module.exports = {
  name: 'todo',
  multi:true,
  transforms: function(doc, tag, value) {
    doc.todos = doc.todos || [];
    var todo = {
      value:value,
      type:'primary'
    },m = value.match(REGEX);
    if (m && m.length > 0){
      todo.value = m[3];
      todo.type = m[1] || 'primary';
      todo.label = m[2] || 'todo';
    }

    switch(todo.type){
      case 'primary':
      case 'basic':
      case 'later':
      todo.type = 'primary';
      break;
      case 'urgent':
      case 'important':
      case 'danger':
      case 'fixnow':
      case 'breaking':
      todo.type = 'danger';
      break;
      case 'needed':
      case 'warn':
      case 'bug':
      case 'issue':
      todo.type = 'warn';
      break;
    }

    doc.todos.push(todo);
    return value;
  }
};
