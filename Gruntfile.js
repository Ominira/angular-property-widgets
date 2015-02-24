module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: [
        'src/*.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      }
    },
    karma: {
      unit: {
        options: {
          files: [
            'bower_components/jquery/dist/jquery.min.js', // jQuery is included for the purposes of easier DOM selection when testing directives.
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'tmp/templates.js',
            'src/dirProperty.js',
            'tests/dirProperty.spec.js'
          ],
          frameworks: ['jasmine'],
          plugins: ['karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher']
        },
        singleRun: true,
        port: 9877,
        browsers: [
          'PhantomJS',
          'Chrome',
          'Firefox'
        ]
      }
    },
    watch: {
      jssrc: {
        files: [
          'src/*.js'
        ],
        tasks: ['default']
      }
    },
    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['templates/*.tpl.html'],
        dest: 'tmp/templates.js'
      }
    },
    copy: {
      // used to copy certain of the utils to external repo directories
      dirProperty: {
        expand: true,
        flatten: true,
        src: [
          'src/dirProperty.js',
          'templates/dirMortgage.tpl.html',
          'templates/dirRentals.tpl.html'
        ],
        dest: 'dist'
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'html2js', 'karma']);
  grunt.registerTask('publish', ['copy']);

};
