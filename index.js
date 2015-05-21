var Pack = require('./config'),
	bower = require('bower');


module.exports = {
	init:function(dir){
		bower.commands.install(['jquery'])
	}
};