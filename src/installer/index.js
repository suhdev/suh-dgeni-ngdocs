var bower = require('bower'),
	gulp = require('gulp'),
	utility = require('util'),
	util = require('../util'),
	cssmin = require('gulp-cssmin'),
	shelljs = require('shelljs'),
	_ = require('lodash'),
	rename = require('gulp-rename'),
	insert = require('gulp-insert'),
	path = require('canonical-path'),
	concat = require('gulp-concat-util'),
	uglify = require('gulp-uglify');


var Installer = function(conf){
	var c = ['jquery','angular','angular-animate',
			'angular-resource','angular-touch','angular-cookies',
			'angular-route','angular-sanitize','angular-aria',
			'bootstrap',
			'open-sans-fontface','google-code-prettify',
			'font-awesome',
			'lunr.js','marked'];

	this.config = {
		outputFolder:conf.outputFolder,
		cssFolder:path.join(conf.outputFolder,'css'),
		jsFolder:path.join(conf.outputFolder,'js'),
		fontsFolder:path.join(conf.outputFolder,'fonts'),
		fontFolder:path.join(conf.outputFolder,'font'),
		imagesFolder:path.join(conf.outputFolder,'images'),
		localFolder:path.resolve(__dirname,'../../client'),
		userJs:conf.defaultDeployment?(conf.defaultDeployment.scripts ||[]):[],
		userFonts:conf.defaultDeployment?(conf.defaultDeployment.fonts ||[]):[],
		userCss:conf.defaultDeployment?(conf.defaultDeployment.stylesheets ||[]):[],
		userMisc:conf.defaultDeployment?(conf.defaultDeployment.misc ||[]):[],
		userIncludeJs:conf.includeJs?(conf.includeJs||[]):[],
		userIncludeCss:conf.includeCss?(conf.includeCss||[]):[]
	};
	this.config.packages = (conf && conf.packages)? [].concat(conf.packages,c):c;
};

Installer.prototype = {
	install:function(callback){
		console.log('Copying stylesheets ');
		gulp.src(path.join(this.config.localFolder,'css/*.css'))
			.pipe(gulp.dest(this.config.cssFolder));
		gulp.src(this.config.userCss)
			.pipe(gulp.dest(this.config.cssFolder));
		console.log('Copying scripts');

		gulp.src(path.join(this.config.localFolder,'js/*.js'))
			.pipe(concat('docs.min.js'))
			.pipe(gulp.dest(this.config.jsFolder));
		gulp.src(path.join(this.config.localFolder,'lib/*.js'))
			.pipe(gulp.dest(this.config.jsFolder));
		gulp.src(path.join(this.config.localFolder,'libCss/*.css'))
			.pipe(gulp.dest(this.config.cssFolder));

		gulp.src(this.config.userJs)
			.pipe(gulp.dest(this.config.jsFolder));
		gulp.src(this.config.userIncludeJs)
			.pipe(gulp.dest(this.config.jsFolder));
			gulp.src(this.config.userIncludeCss)
			.pipe(gulp.dest(this.config.cssFolder));
		gulp.src(this.config.userFonts)
			.pipe(gulp.dest(this.config.fontsFolder));
		gulp.src([path.join(this.config.localFolder,'js/crafty/*.js'),
			path.join(this.config.localFolder,'js/crafty/**/*.js')])
			.pipe(concat('crafty.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest(this.config.jsFolder));
		gulp.src(path.join(this.config.localFolder,'images/*.*'))
			.pipe(gulp.dest(this.config.imagesFolder));
		gulp.src(path.join(this.config.localFolder,'fonts/**/*.*'))
		  	.pipe(gulp.dest(this.config.fontsFolder))
		  	.pipe(gulp.dest(path.join(this.config.cssFolder,'fonts')));
	  	gulp.src(path.join(this.config.localFolder,'font/**/*.*'))
		  	.pipe(gulp.dest(this.config.fontsFolder))
		  	.pipe(gulp.dest(path.join(this.config.cssFolder,'font')));

		_(this.config.userMisc)
			.forEach(function(e){
				if (_.isObject(e)){
					gulp.src(e.src)
						.pipe(gulp.dest(path.resolve(this.config.outputFolder,e.dest)));
				}else if (_.isString(e)){
					var d = './';
					if (/\.js$/.test(e)){
						d = 'js';
					}else if (/\.css$/.test(e)){
						d = 'css';
					}else if (/(\.eot|\.svg|\.ttf|\.woff|\.woff)$/.test(e)){
						d = 'fonts';
					}
					gulp.src(e)
						.pipe(gulp.dest(path.resolve(this.config.outputFolder,d)));
				}
			})
			.commit();
		// bower.commands.install(this.config.packages,{save:true})
		// 	.on('end',util.proxy(this.onPackagesInstalled,this,callback));
	},
	onPackagesInstalled:function(){
		console.log('Bower packages installed successfully.');
		var installed = arguments.length === 2?arguments[1]:arguments[0],
			callback = arguments.length === 2?arguments[0]:undefined;
		if (callback){
			callback(installed);
		}
		this.list((callback && callback.list)?callback.list:installed);
	},
	list:function(callback,f){

		console.log('Retreiving details of bower packages.');
	

		bower.commands.list(undefined,{
			cwd:path.resolve(__dirname,'../..'),
			paths:true,
			json:true
		},{json:true,paths:true}).on('end',util.proxy(this.onPackagesListed,this,callback));
	},
	onPackagesListed:function(){
		var e,f,files,js,css,fonts,fff,p,dps = [], dpsKeys = ['jquery'];
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
				return /(\.eot|\.svg|\.ttf|\.woff|\.woff)$/.test(file) || 
				/(fonts\/\*)$|(fonts\/.*$)/.test(file) || 
				/(font\/\*)$|(font\/.*$)/.test(file);
			})
			.value();
		// fff = _(fonts)
		// 	.map(function(j){
		// 		var k = {
		// 			full:j,
		// 		};
		// 		var e = path.dirname(j)+'/';
		// 		if (/\/css\/font\//.test(e)){
		// 			k.path = '/css/font/'+e.split(/\/css\/font\//)[1];
		// 		}else if (/\/css\/fonts\//.test(e)){
		// 			k.path = '/css/font/'+e.split(/\/css\/fonts\//)[1];
		// 		}else if (/\/font\//.test(e)){
		// 			k.path = '/font/'+e.split(/\/font\//)[1];
		// 		}else if (/\/fonts\//.test(e)){
		// 			k.path = '/fonts/'+e.split(/\/fonts\//)[1];
		// 		}else{
		// 			k.path = '/';
		// 		}
		// 		return k;
		// 	})
		// 	.value();
		this.files = {
			css:css,
			js:js,
			fonts:fonts
		};

		gulp.src(this.files.css)
			.pipe(insert.append('\n'))
			.pipe(cssmin())
			.pipe(rename({
				extname: '.min.css'
			}))
			.pipe(gulp.dest(this.config.cssFolder));
		gulp.src(this.files.js)
			.pipe(uglify())
			.pipe(rename({
				extname: '.min.js'
		   	}))
			.pipe(gulp.dest(this.config.jsFolder));
var self = this;
		// _.forEach(fff,function(e){
		// 	gulp.src(e.full)
		// 		.pipe(gulp.dest(self.config.outputFolder+e.path));
		// });
		gulp.src(this.files.fonts)
			.pipe(gulp.dest(this.config.fontsFolder))
			.pipe(gulp.dest(this.config.cssFolder+'/fonts'))
			.pipe(gulp.dest(this.config.outputFolder+'/font'));

		if (f){
			f();
		}
	},


};

module.exports = function(conf){
	return new Installer(conf);
};

module.exports.Installer = Installer;