module.exports = function ( grunt ) {
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  var gruntConfig = require( './config/gruntConfig.js' );

  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },

    clean: [ 
      '<%= build_dir %>', 
      '<%= compile_dir %>'
    ],

    copy: {
      build: {
        files: [
          {
            src: [ '<%= app_files.js %>','<%= vendor_files.js %>', '<%= app_files.assets %>', '<%= app_files.stylesheet %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile: {
        files: [
          {
            src: [ '**/*' ],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/app/assets',
            expand: true
          }
        ]
      }
    },

    concat: {
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [ 
          '<%= vendor_files.js %>', 
          '<%= app_files.first %>',
          '<%= build_dir %>/app/src/**/*.js'   
        ],
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

    recess: {
      compile: {
        src: [ '<%= app_files.less %>' ],
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.css',
        options: {
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      },
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>/app',
        src: [
          '<%= build_dir %>/<%= vendor_files.js %>',
          '<%= app_files.first %>',
          '<%= build_dir %>/app/src/**/*.js',
          '<%= build_dir %>/app/stylesheet/**/*.less',
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= recess.compile.dest %>'
        ]
      }
    },

    watch: {
      files: [ '<%= app_files.html %>', 
               '<%= app_files.js %>', 
               '<%= vendor_files.js %>', 
               '<%= app_files.assets %>', 
               '<%= app_files.stylesheet %>', 
               '<%= test_files.js %>' 
            ],
      tasks: ['jshint', 'karma:build:run', 'build']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      build: {
        runnerPort: 9101,
        background: true
      },
      compile: {
        singleRun: true,
        background: false
      }
    },

    jshint: {
      files: [ '<%= app_files.js %>',  
               '<%= test_files.js %>' 
            ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        strict: false,
        browser : true,
        undef: false,
        indent: 2,
        quotmark : 'single',
        globals: {
          /*tests functions exclude*/
          define: false,
          module: false,
          describe: false,
          beforeEach: false,
          it: false,
          expect: false,
          requirejs: false,
          dump: false 
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: '<%= build_dir %>/app',
          keepalive: false
        }
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig, gruntConfig ) );

  grunt.registerTask( 'build', [ 'clean', 'copy:build', 'index:build'] );
  
  grunt.registerTask( 'compile', [ 'jshint', 'karma:compile:start', 'build', 'recess:compile', 'concat:compile_js', 'uglify:compile', 'copy:compile', 'index:compile'] );

  grunt.registerTask( 'dev', [ 'connect','jshint', 'karma:build:start', 'watch' ] );

  grunt.registerTask( 'default', [ 'build'] );


  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  function filterForLESS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /main\.less$/ ) || file.match( /\.css$/ );
    });
  }

  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+this.data.dir+')\/', 'g' );
    
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    var lessFiles = filterForLESS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    grunt.file.copy('app/index.tpl.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: lessFiles,
            version: grunt.config( 'pkg.version' )
          }
        });
      }
    });
  });

};
