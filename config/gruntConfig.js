module.exports = {
  
  build_dir: 'build',
  compile_dir: 'bin',

  
  app_files: {
    first: [],
    js: [ 'app/src/**/*.js' ],
    html: [ 'app/index.tpl.html' ],
    stylesheet: ['app/stylesheet/**/*.less'],
    assets: ['app/assets/**/*'],
    less: 'app/stylesheet/main.less',
  },

  test_files: {
    js: [
      'test/**/*.js'
    ]
  },

  vendor_files: {
    js: [
      'app/vendor/**/*.js'
    ],
    css: [
    ],
    assets: [
    ]
  },
};
