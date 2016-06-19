var cleanCssOptions = "--s1 --advanced --compatibility=ie8";
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'js/build/main.js': 'js/src/main.js'
                }
            }
        },
        less: {
            dev: {
                files: {
                    'css/build/style.css': 'css/src/all.less'
                }
            },
            prod: {
                files: {
                    'css/build/style.css': 'css/src/all.less'
                }
            }
        },
        watch: {
            js: {
                files: 'js/src/*.js',
                tasks: ['js']
            },
            css: {
                files: 'css/src/**.less',
                tasks: ['css']
            }
        }
    });

    grunt.registerTask('default', ['js', 'css']);
    grunt.registerTask('js', ['babel']);
    grunt.registerTask('css', ['less:dev']);
};