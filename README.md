# suh-dgeni-ngdocs

A package to generate ngdocs using Dgeni similar to whats currently used on AngularJS website. 

## Installation 

### Using NPM 

```sh

	npm install suh-dgeni-docs --save-dev

```

### Clone GitHub Reposotiry 


```sh

	git clone https://github.com/suhdev/suh-dgeni-ngdocs 

```


## Usage

First, install the ```canonical-path``` module using NPM, the module is used to generate absolute paths for your source files: 

```sh

	npm install canonical-path --save-dev

```

Next, create a new javascript file as follows: 

```javascript

	var path = require('path'),
		fs = require('fs'),
		ngdocs = require('suh-dgeni-ngdocs');


	ngdocs.generate({
	defaultDeployment:{
		name:'default',
		meta:{
			description:'just a test',
		},
		navigation:{
			top:{
				//Navigation items for the top navigation 
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
		//add any javascript files to be included in the documentation, 
		//usually this includes youre compiled (minimized angular code). 
		//also note that you need to pass the source to the ```path.resolve``` 
		//function to generate the absolute URL. 
		scripts:[path.resolve('./app.min.js')] 
	},
			//base path to your source 
			basePath:path.resolve('testsrc'),
			//add your source paths patterns 
			sourceFiles:[
				'*.js',
				'**/*.ngdoc'],
			//still under development, ideally here this will be extracted from code
			//to extract new sections in the documentation other than the predefined ones
			AREA_NAMES:{
				suhail:'Suhail Abood',
			},
			//define the output path for your documentation
			//again note that we're passing the folder to the 
			//```path.resolve``` function 
			outputFolder:path.resolve('generated'),
			//home page information 
			homePage:{
				data:{
					//title of the home page
					title:'Suhail Abood Library',
					//desctiption (content of the home page, this can include markdown content as well)
					//you can pass in the content of the ```README.md``` 
					description:fs.readFileSync('./README.md').toString(),
					//still under development, ideally this will be used to add
					//dependencies section with full details about each dependency. 
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
				//set the ```Dgeni``` logger level (info|warn|debug|error)
				level:null
			},
			extraData:{
				//still under development, this object literal is passed on to 
				//all documents, all partials, and still looking into the potential
				//usage of such access
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

```

The same code can be used within a gulp task as follows: 

```javascript

var gulp = require('gulp'); 

//assuming there is a task (```concat-js```) to concatenate the source 
gulp.task('ngdocs',['concat-js'], function(){
	//wrap in try catch to make sure it doesn't break the flow of task execution 
	//even if it fails. 
	try{

	ngdocs.generate({
	defaultDeployment:{
		name:'default',
		meta:{
			description:'just a test',
		},
		navigation:{
			top:{
				//Navigation items for the top navigation 
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
		//add any javascript files to be included in the documentation, 
		//usually this includes youre compiled (minimized angular code). 
		//also note that you need to pass the source to the ```path.resolve``` 
		//function to generate the absolute URL. 
		scripts:[path.resolve('./app.min.js')] 
	},
			//base path to your source 
			basePath:path.resolve('testsrc'),
			//add your source paths patterns 
			sourceFiles:[
				'*.js',
				'**/*.ngdoc'],
			//still under development, ideally here this will be extracted from code
			//to extract new sections in the documentation other than the predefined ones
			AREA_NAMES:{
				suhail:'Suhail Abood',
			},
			//define the output path for your documentation
			//again note that we're passing the folder to the 
			//```path.resolve``` function 
			outputFolder:path.resolve('generated'),
			//home page information 
			homePage:{
				data:{
					//title of the home page
					title:'Suhail Abood Library',
					//desctiption (content of the home page, this can include markdown content as well)
					//you can pass in the content of the ```README.md``` 
					description:fs.readFileSync('./README.md').toString(),
					//still under development, ideally this will be used to add
					//dependencies section with full details about each dependency. 
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
				//set the ```Dgeni``` logger level (info|warn|debug|error)
				level:null
			},
			extraData:{
				//still under development, this object literal is passed on to 
				//all documents, all partials, and still looking into the potential
				//usage of such access
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
		}catc(err){
			console.log(err);
		}
});

```

## Attribution 

This package is basically an extension to the ```dgeni-packages``` module (built on top of it),in which I replaced the templates with customized ones,
I've also included some extra tags and extended some of the previously defined ones. 

A full list of the tags will be added here as well as in the documentation (as soon as I finish writing them). 

So, this is to thank everyone who contributed to the ```dgeni-packages```, which can be accessed on [dgeni-packages](https://github.com/angular/dgeni-packages), reading through that code was quiet amusing, and I loved the architecture of the module. It does lack documentation, but the code is almost self explanatory. 

I would also like to thank the guys behind UIKit, which can be accessed on [UIKit](http://getuikit.com), as I've used their framework to in the templates (because I suck at design), and I just fall in love with their framework. 


## NEXT

I'm currently working on lots of additions and fixing, however, the base code will not change, and thus the module is ready for usage now, anything else
will either be a bug fix or an extension that should be backward compatible. Some of these are: 

1. Using own templates. 
2. Smarter linkage with github and git repository.
3. Lots of minor bug fixes that I've already noted down. 

I'm compiling a list of the upcoming additions and I'll add them all here as soon as I have a my roadmap ready. Some of these are:


Suhail Abood
