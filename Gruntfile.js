module.exports = function( grunt ) {
	'use strict';

	// Load all tasks
	require( 'load-grunt-tasks' )( grunt, { scope: 'devDependencies' } );

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all:     [
				'Gruntfile.js',
				'js/**/*.js',
				'!js/dist/*.js',
				'!js/*.min.js'
			]
		},

		babel: {
			options: {
				'sourceMap': true,
				presets: ['@babel/preset-env']
			},
			dist: {
				files: [{
					'expand': true,
					'cwd': 'src/js',
					'src': ['**/*.js'],
					'dest': 'dist/js/',
					'ext': '.min.js'
				}]
			}
		},

		uglify: {
			all_src : {
				options : {
				  sourceMap : true
				},
				src : 'dist/js/app.min.js',
				dest : 'dist/js/bundle.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					sourceMap: true,
					outputStyle:  'expanded'
				},
				files:   [ {
					expand: true,
					cwd:    'src/scss',
					src: [
						'*.scss'
					],
					dest:   'dist/css',
					ext: '.css'
				} ]
			},
			minify: {
				options: {
					sourceMap: true,
					outputStyle:  'compressed'
				},
				files:   [ {
					expand: true,
					cwd:    'dist/css',
					src: [
						'*.css'
					],
					dest:   'dist/css',
					ext: '.min.css'
				} ]
			}
		},

		watch: {
			sass: {
				options: {
					livereload: true
				},
				files: [ 'src/js/app.js', 'src/scss/**/*.scss' ],
				tasks: [ 'build:css', 'build:js' ]
			}
		}

	} );

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Register tasks
	grunt.registerTask( 'default', [
		'build:js',
		'build:css'
	] );

	// Build tasks
	grunt.registerTask( 'build', [
		'default'
	] );

	// Build JS
	grunt.registerTask( 'build:js', [
		'jshint',
		'babel',
		'uglify'
	] );

	// Build CSS
	grunt.registerTask( 'build:css', [
		'sass'
	] );

};
