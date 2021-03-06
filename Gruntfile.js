// Generated on 2013-07-10 using generator-angular 0.3.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

var minimatch = require('minimatch');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep')
		.filterDev('grunt-*')
		.filter(minimatch.filter('!grunt-cli')) //grunt-cli is not a task
		.forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	var app_js = '<%= yeoman.app %>/scripts/{,*/}*.js';
	var test_js = 'test/**/*.js';
	var hinted_js = [app_js, test_js, 'Gruntfile.js'];
	var lib_js = '<%= yeoman.app %>/bower_components/**/*.js';

	grunt.initConfig({
		yeoman: yeomanConfig,
		jshint: {
			options: {jshintrc: '.jshintrc'},
			all: hinted_js
		},
		watch: {
			livereload: {
				options: {livereload: LIVERELOAD_PORT},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					app_js,
					lib_js
				]
			},
			jshint: {
				options: {
					atBegin: true,
					spawn: true
				},
				files: hinted_js.concat('.jshintrc'),
				tasks: ['jshint']
			},
			unitTest: {
				options: {
					atBegin: true,
					spawn: false
				},
				files: [app_js, lib_js, test_js],
				tasks: ['karma:background:run']
			}
		},
		karma: {
			options: {configFile: 'karma.conf.js'},
			background: {background: true},
			single: {singleRun: true}
		},
		connect: {
			options: {
				port: 3000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		coffee: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/scripts',
					src: '{,*/}*.coffee',
					dest: '.tmp/scripts',
					ext: '.js'
				}]
			},
			test: {
				files: [{
					expand: true,
					cwd: 'test/spec',
					src: '{,*/}*.coffee',
					dest: '.tmp/spec',
					ext: '.js'
				}]
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			// By default, your `index.html` <!-- Usemin Block --> will take care of
			// minification. This option is pre-configured if you do not wish to use
			// Usemin blocks.
			// dist: {
			//   files: {
			//     '<%= yeoman.dist %>/styles/main.css': [
			//       '.tmp/styles/{,*/}*.css',
			//       '<%= yeoman.app %>/styles/{,*/}*.css'
			//     ]
			//   }
			// }
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['*.html', 'views/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'CNAME',
						'bower_components/**/*',
						'images/{,*/}*.{gif,webp,svg}',
						'styles/fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: [
						'generated/*'
					]
				}]
			}
		},
		concurrent: {
			options: {logConcurrentOutput: true},
			server: [
				'coffee:dist'
			],
			test: [
				'coffee'
			],
			dist: [
				'coffee',
				'imagemin',
				'htmlmin'
			]
		},
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/scripts',
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.dist %>/scripts/scripts.js'
					]
				}
			}
		},
		htmlrefs: {dist: {src: '<%= yeoman.dist %>/index.html'}}
	});

	grunt.registerTask('default', 'development server. includes LiveReload and test watch', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'connect:livereload',
			'open',
			'karma:background',
			'watch'
		]);
	});

	//this one was generated by yeoman. I'm not using it right now, but I think it would be needed when using coffeescript?
	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'connect:test',
		'karma:single'
	]);

	grunt.registerTask('build', 'build optimized artifacts for production', [
		'clean:dist',
		'useminPrepare',
		//'concurrent:dist', //concurrent is causing failures
		'coffee',
		'imagemin',
		'htmlmin',
		'concat',
		'copy',
		//using htmlrefs to cdnify manually instead grunt-google-cdn, because apparently it has hard-coded the versions of the libraries it supports, and it currently does not include Angular 1.2 >_>
		'htmlrefs',
		//'cdnify',
		'cssmin',
		//I'm not using modules right now, and apparently ngmin doesn't work without them, and I don't want to have to bother with the minsafe syntax, so just disabling js minification for now
		//'ngmin',
		//'uglify',
		'rev',
		'usemin'
	]);

	grunt.registerTask('ci', 'for running on CI server', [
		'jshint',
		'karma:single',
		'build'
	]);
};
