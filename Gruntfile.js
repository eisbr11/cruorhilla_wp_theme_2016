module.exports = grunt => {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig(
		{
			pkg: grunt.file.readJSON("package.json"),

			less: {
				default: {
					options: {
						sourceMap: true,
						sourceMapFileInline:true
					},
					files: {
						"css/build/style.css": "css/src/main.less"
					}
				}
			},
			babel: {
				options: {
					sourceMap: true,
					presets: ['babel-preset-es2015']
				},
				dist: {
					files: {
						"js/build/main.js": "js/src/main.js"
					}
				}
			},
			watch: {
				js: {
					files: ["js/src/*.js"],
					tasks: ["js"]
				},
				less: {
					files: ["css/src/**/*.less"],
					tasks: ["css"]
				}
			},
			cssmin: {
				default: {
					files: [{
						expand: true,
						cwd: 'css/build',
						dest: 'css/build',
						src: ['*.css', '!*.min.css'],
						ext: '.min.css'
					}]
				}
			},
			uglify: {
				default: {
					options: {
						sourceMap: true
					},
					files: {
						'js/build/main.min.js': ['js/src/main.js']
					}
				}
			}
		}
	);

	grunt.registerTask("default", ["css", "js"]);
	grunt.registerTask("js", ["babel"/*, "uglify:default"*/]);
	grunt.registerTask("css", ["less", "cssmin:default"]);

};