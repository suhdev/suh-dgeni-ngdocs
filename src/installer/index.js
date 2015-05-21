var bower = require('bower'),
	gulp = require('gulp'),
	utility = require('util'),
	util = require('../util'),
	cssmin = require('gulp-cssmin'),
	_ = require('lodash'),
	path = require('canonical-path'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');


var Installer = function(conf){
	var c = ['jquery','angular','angular-animate',
			'angular-resource','angular-touch','angular-cookies',
			'angular-sanitize','angular-bootstrap','bootstrap',
			'google-code-prettify','lunr.js','marked'];
	this.config = {
		outputFolder:'./documentation',
		cssFolder:'./documentation/css',
		jsFolder:'./documentation/js',
		fontsFolder:'./documentation/fonts'
	};
	this.config.packages = (conf && conf.packages)? [].concat(conf.packages,c):c;
};

Installer.prototype = {
	install:function(callback){
		bower.commands.install(this.config.packages,{save:true})
			.on('end',util.proxy(this.onPackagesInstalled,this,callback));
	},
	onPackagesInstalled:function(){
		console.log('Bower packages installed successfully.');
		var installed = arguments.length === 2?arguments[1]:arguments[0],
			callback = arguments.length === 2?arguments[0]:undefined;
		if (callback){
			callback(installed);
		}
		this.list((callback && callback.list)?callback.list:undefined);
	},
	list:function(callback){
		console.log('Retreiving details of bower packages.')
		bower.commands.list.line(['node','bower','list','--json'])
			.on('end',util.proxy(this.onPackagesListed,this,callback));
	},
	onPackagesListed:function(){
		var e,f,files,js,css,fonts,p,dps = [], dpsKeys = ['jquery'];
		e = (arguments.length == 2)?arguments[1]:arguments[0];
		f = (arguments.length == 2)?arguments[0]:undefined;
		p = _(e.dependencies)
			.transform(function(obj,n,key){

				var item = {
					path:n.canonicalDir,
					main:!_.isArray(n.pkgMeta.main)?(path.join(n.canonicalDir,n.pkgMeta.main)):_(n.pkgMeta.main).map(function(elem) {
						return path.join(n.canonicalDir,elem)
					}).value(),
					dependencies:_(n.pkgMeta.dependencies).keys().value()
				};

				obj[key] = item;
			})
			.tap(function(eee){
				dps.push(eee.jquery);
				eee.jquery = undefined;
				delete eee.jquery;
			})
			.commit()
			.forEach(function(v,kkk){
				if (!v){
					return;
				}
				if (v.dependencies.length > 0){
					_.forEach(v.dependencies,function(kk){
						if (dpsKeys.indexOf(kk) === -1){
							dps.push(v[kk]);
							dpsKeys.push(kk);
						}
					});
				}
				dps.push(v);
				dpsKeys.push(kkk);
			})
			.value();

	
		
		files = _(dps)
			.pluck('main')
			.flatten()
			.value();
		css = _(files)
			.filter(function(file){
				return /\.css$/.test(file);
			})
			.value();
		js = _(files)
			.filter(function(file){
				return /\.js$/.test(file);
			})
			.value();
		fonts = _(files)
			.filter(function(file){
				return /(\.eot|\.svg|\.ttf|\.woff|\.woff)$/.test(file);
			})
			.value();
		this.files = {
			css:css,
			js:js,
			fonts:fonts
		};

		gulp.src(this.files.css)
			.pipe(concat('lib.min.css'))
			.pipe(cssmin())
			.pipe(gulp.dest(this.config.cssFolder));
		gulp.src(this.files.js)
			.pipe(concat('lib.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(this.config.jsFolder));
		gulp.src(this.files.fonts)
			.pipe(gulp.dest(this.config.fontsFolder));

		if (f){
			f();
		}
	},


};

module.exports = function(conf){
	return new Installer(conf);
};

module.exports.Installer = Installer;