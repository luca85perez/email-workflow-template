module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    /************************************************/
    /*
    /* DEV CONFIG
    /*
    /************************************************/

    /*----------------------------------------------*/
    /* paths
    /*----------------------------------------------*/
    paths: {
      sass: './scss',
      jade: './jade',

      css: './css',
      html: './',
      img: './img',

      online: 'http://www.hoteldaweb.com.br/newsletter/2015-06-22_construtor/img/'
    },


    /*----------------------------------------------*/
    /* sass
    /*----------------------------------------------*/
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          '<%= paths.css %>/ink.css': '<%= paths.sass %>/ink.scss',
          '<%= paths.css %>/custom.css': '<%= paths.sass %>/custom.scss',
          '<%= paths.css %>/responsive.css': '<%= paths.sass %>/responsive.scss',
          '<%= paths.css %>/web-font.css': '<%= paths.sass %>/web-font.scss',
        }
      }
    },

    /*----------------------------------------------*/
    /* jade
    /*----------------------------------------------*/
    jade: {
      html: {
        files: {
          '<%= paths.html %>/': ['<%= paths.jade %>/*.jade']
        },
        options: {
          client: false,
          pretty: true
        },
      },
    },

    /*----------------------------------------------*/
    /* imagemin
    /*----------------------------------------------*/
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel : 3,
        },
        files: [{
          expand : true,
          cwd    : '<%= paths.img %>',
          src    : ['**/*.{png,jpg,jpeg,gif}'],
          dest   : '<%= paths.img %>'
        }]
      }
    },

    /*----------------------------------------------*/
    /* watch
    /*----------------------------------------------*/
    watch: {
      options: {
        nospawn: true,
        livereload: 1337
      },

      css: {
        files: '<%= paths.sass %>/**/*.scss',
        tasks: [ 'css' ],
      },

      jade: {
        files:  '<%= paths.jade %>/**/*.jade',
        tasks: ['html'],
      },

      images: {
        files: [ '<%= paths.img %>**/*.{png,jpg,jpeg,gif}' ],
        tasks: ['img']
      },

      config: {
        options: { reload: true },
        files: ['Gruntfile.js']
      },

    },






    /************************************************/
    /*
    /* BUILD CONFIG
    /*
    /************************************************/

    /*----------------------------------------------*/
    /* autoprefixer
    /*----------------------------------------------*/
    autoprefixer: {
      dist: {
        src: '<%= paths.css %>/*.css'
      },
    },

    /*----------------------------------------------*/
    /* emailBuilder
    /*----------------------------------------------*/
    emailBuilder: {
      inline :{
        files : {
          './index.html' : './index.html'
        }
      }
    },

    replace: {
      imgSrc: {
        src: ['./index.html'],
        overwrite: true,
        replacements: [{
          from: 'img/',
          to: "<%= paths.online %>"
        }]
      }
    }

  });






  /************************************************/
  /*
  /* TASKS
  /*
  /************************************************/
  grunt.registerTask('default', [
    'img',
    'html',
    'css',
    'watch'
  ]);

  grunt.registerTask('html', [
    'jade',
  ]);

  grunt.registerTask('css', [
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('img', [
    'imagemin',
  ]);

  grunt.registerTask('build', [
    'img',
    'html',
    'css',
    'emailBuilder',
    'replace',
  ]);



};