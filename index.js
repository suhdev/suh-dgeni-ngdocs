var Pack = require('./config'),
	Dgeni = require('dgeni'),
	Installer = require('./src/installer');


module.exports = {
	DocPackage:Pack,
	generate:function(conf){
		try{
			var dgeni = new Dgeni([Pack(conf)]); 
			return dgeni.generate();
		}catch(err){
			console.log(err);
		}
	}
};
