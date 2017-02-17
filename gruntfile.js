var fs = require('fs');
var project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

var getIndexFiles = function(indexType){
  return [{
    expand: true,
    flatten: true,
    src: [project.paths.index[indexType].source],
    dest: project.paths.index[indexType].dest
  }];
}

var config = {
  'jshint': {
    source: project.paths.scripts.source.files
  },
  'concat': {
    config: {
      src: project.paths.scripts.config.files,
      dest: project.paths.scripts.dist.config.bundle
    },
    source: {
      options: {
        sourceMap: true
      },
      src: [
        project.paths.templates.dist.bundle,
        project.paths.scripts.source.files
      ],
      dest: project.paths.scripts.dist.bundle
    },
    vendor: {
      src: project.paths.scripts.vendor.files,
      dest: project.paths.scripts.dist.vendor.bundle
    }
  },
  'stylus': {
    source: {
      files: {
        [project.paths.styles.dist.bundle]: project.paths.styles.source.files
      }
    }
  },
  'uglify': {
    options: {
      mangle: false
    },
    config: {
      files: {
        [project.paths.scripts.dist.config.bundle]: project.paths.scripts.dist.config.bundle
      }
    },
    source: {
      files: {
        [project.paths.scripts.dist.bundle]: project.paths.scripts.dist.bundle
      }
    },
    vendor: {
      files: {
        [project.paths.scripts.dist.vendor.bundle]: project.paths.scripts.dist.vendor.bundle
      }
    }
  },
  'cssmin': {
    bundle: {
      files: {
        [project.paths.styles.dist.bundle]: project.paths.styles.dist.bundle
      }
    },
    vendor: {
      files: {
        [project.paths.styles.dist.vendor.bundle]: project.paths.styles.vendor.files
      }
    }
  },
  'imagemin': {
    source: {
      files: [{
        expand: true,
        cwd: project.paths.images.source.root,
        src: [project.paths.images.source.files],
        dest: project.paths.images.dist.root
      }]
    }
  },
  'copy': {
    manifest: {
      src: project.paths.manifest.source,
      dest: project.paths.manifest.dist
    },
    fonts: {
      expand: true,
      flatten: true,
      src: project.paths.fonts.source.files,
      dest: project.paths.fonts.dist.root
    },
    vendorFonts: {
      expand: true,
      flatten: true,
      src: project.paths.fonts.vendor.files,
      dest: project.paths.fonts.dist.vendor.root
    },
    worker: {
      src: project.paths.worker.source,
      dest: project.paths.worker.dist
    }
  },
  'replace': {
    appIndexDev: {
      options: {
        patterns: [
          {match: 'distFilesPath/', replacement: ''},
          {match: 'cordova', replacement: ''},
          {match: 'livereload', replacement: '<script src="//localhost:35729/livereload.js"></script>'}
        ]
      },
      files: getIndexFiles('app')
    },
    appIndexProd: {
      options: {
        patterns: [
          {match: 'distFilesPath/', replacement: ''},
          {match: 'timestamp', replacement: new Date().getTime()},
          {match: 'cordova', replacement: '<script src="cordova.js"></script>'},
          {match: 'livereload', replacement: ''}
        ]
      },
      files: getIndexFiles('app')
    },
    webIndexDev: {
      options: {
        patterns: [
          {match: 'distFilesPath/', replacement: 'www/'},
          {match: 'cordova', replacement: ''},
          {match: 'livereload', replacement: '<script src="//localhost:35729/livereload.js"></script>'}
        ]
      },
      files: getIndexFiles('web')
    },
    webIndexProd: {
      options: {
        patterns: [
          {match: 'distFilesPath/', replacement: 'www/'},
          {match: 'timestamp', replacement: new Date().getTime()},
          {match: 'cordova', replacement: ''},
          {match: 'livereload', replacement: ''}
        ]
      },
      files: getIndexFiles('web')
    },
    style: {
      options: {
        patterns: [{match: 'timestamp', replacement: new Date().getTime()}]
      },
      files: [{
        expand: true,
        flatten: true,
        src: [project.paths.styles.dist.bundle],
        dest: project.paths.styles.dist.root
      }]
    },
    env: {
      options: {
        patterns: [{match: 'environment', replacement: 'prod'}]
      },
      files: [{
        expand: true,
        flatten: true,
        src: [project.paths.scripts.dist.config.bundle],
        dest: project.paths.scripts.dist.config.root
      }]
    }
  },
  'karma': {
    unit: {
      configFile: project.paths.scripts.spec.config
    }
  },
  'http-server': {
    dev: project.server.dev
  },
  'html2js': {
    options: {
      module: project.paths.templates.dist.moduleName,
      rename: function(pathname){
        return pathname.replace('scripts/','');
      }
    },
    source: {
      src: [project.paths.templates.source.files],
      dest: project.paths.templates.dist.bundle,
    }
  },
  'watch': {
    options: {
      livereload: true,
    },
    config: {
      files: project.paths.scripts.config.files,
      tasks: ['concat:config']
    },
    scripts: {
      files: project.paths.scripts.source.files,
      tasks: ['jshint', 'concat:source']
    },
    styles: {
      files: project.paths.styles.source.files,
      tasks: ['stylus']
    },
    images: {
      files: project.paths.images.source.files,
      tasks: ['imagemin']
    },
    templates: {
      files: project.paths.templates.source.files,
      tasks: ['html2js', 'concat:source']
    },
    copy: {
      files: [
        project.paths.manifest.source,
        project.paths.fonts.source.files,
        project.paths.fonts.vendor.files,
        project.paths.worker.source
      ],
      tasks: ['copy']
    },
    replace: {
      files: project.paths.index.app.source,
      tasks: ['replace:appIndexDev', 'replace:webIndexDev']
    }
  }
};

module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig(config);
  grunt.registerTask('build', [
    'copy',
    'html2js',
    'jshint',
    'concat',
    'uglify:vendor',
    'stylus',
    'cssmin',
    'imagemin'
  ]);
  grunt.registerTask('start', [
    'build',
    'replace:appIndexDev',
    'replace:webIndexDev',
    'http-server',
    'watch'
  ]);
  grunt.registerTask('deploy', [
    'build',
    'replace:appIndexProd',
    'replace:webIndexProd',
    'replace:style',
    'replace:env',
    'uglify:config',
    'uglify:source'
  ]);
};
