var generator = require('./'),
	path = require('canonical-path'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	src = require('./src/services/gitData');

	gulp.src(['./testsrc/*.js','./testsrc/**/*.js'])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./'));

generator.generate({
	defaultDeployment:{
		name:'default',
		meta:{
			description:'This is just a test suite'
		},
		navigation:{
			top:{
				navItems:[{
            		type:'divider',
          		},
          		{
		            type:'dropdown',
		            disabled:true,
		            label:'TestModule Documentation',
		            url:'#',
		            menu:[{
			              	label:'API Reference',
			              	url:'api'
			            },{
			              	label:'Guides',
			              	url:'guide'
			            },{
			            	label:'Suhail',
			            	url:'suhail'
			            }
			        ]
          		},
          		{
          			type:'divider'
          		}]
			}
		},
		scripts:[path.resolve('./app.min.js')]
	},
	basePath:path.resolve('testsrc'),
	scripts:[],
	stylesheets:[],
	fonts:[],
	sourceFiles:[
		'*.js',
		'**/*.ngdoc'],
	AREA_NAMES:{
		suhail:'Suhail Abood',
	},
	outputFolder:path.resolve('generated'),
	homePage:{
		data:{
			title:'Suhail Abood Library',
			description:'A library to do something.',
			dependencies:[{
				name:'angular',
				version:'1.3.15'
			},{
				name:'jquery',
				version:'2.1.13'
			}]
		}
	},
	logger:{
		level:null
	},
	extraData:{
		angular:'1.3.15',
		jquery:'2.1.13',
		name:'Suhail Abood',
		module:{
			version:'v1.0.0',
			file:'suhail.js',
			minifiedFile:'suhail.min.js'
		}
	}
});