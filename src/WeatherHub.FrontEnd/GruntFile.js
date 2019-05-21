module.exports = function (grunt) {
    grunt.initConfig({
        clean: ["widgets/*", "temp/*"],
        concat: {
            options: {
                sourceMap: true
            },
            all: {
                src: ['js/**/*.js'],
                dest: 'widgets/weather-hub-widget.js'
            }
        },
        /*uglify: {
            options: {
                sourceMap: true
            },
            all: {
                src: ['tempjs/combined.js'],
                dest: 'widgets/weather-hub-widget.js'
            }
        }*/
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
};

