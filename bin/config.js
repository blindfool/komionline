var path = require("path"),
    basePathRel = "..",
    relPaths = {
      base: basePathRel,
      bin: basePathRel + '/bin',
      tmp: basePathRel + '/tmp',
      src: basePathRel + '/src',
      libs: basePathRel + '/libs',
      dest: basePathRel
    },
    paths = {};

for (var key in relPaths) {
  if (relPaths.hasOwnProperty(key)) {
    paths[key] = path.resolve(__dirname, relPaths[key]);
  }
}

module.exports = {
  server: {
    host: "localhost",
    port: 8000,
    basePath: paths.base
  },
  gulp: {
    less: {
      watch: relPaths.src + "/less/**/*.less",
      files: ["/main.less", "/main.gte768.less", "/main.gte1000.less"],
      src: paths.src + "/less",
      dest: paths.dest + "/css"//,
      //filename: "main.css"
    },
    images: {
      watch: relPaths.src + "/img/**/*",
      files: "/**/*",
      src: paths.src + "/img",
      dest: paths.dest + "/img"
    },
    templates: {
      watch: relPaths.src + "/templates/**/*",
      files: "/*.jade",
      src: paths.src + "/templates",
      dest: paths.dest + ""
    },
    plugins: {
      watch: relPaths.base + "/js/vendor/**/*",
      files: [
        "/plugins.js",
        "/*.min.js",
        "/!jquery-*.js",
        "/!modernizr-*.js",
        "/fastclick.js"
      ],
      src: paths.dest + "/js/vendor",
      dest: paths.dest + "/js",
      filename: "plugins.js"
    },
    jsmin: {
      files: [
        "/*.js",
        "/!*.min.js"
      ],
      paths:"js"
    },
  	csscompile: {
      depends: ["less"],
      files: [
  	    "/normalize.css",
    		"/bp-begin.css",
    		"/main.css",
    		"/bp-tail.css"
  	  ],
  	  paths:"css",
      filename: "app.min.css"
  	},
    /*uncss: {
      depends: ["csscompile"],
      files: [
        "/app.css",
      ],
      paths: "css",
      filename: "app.min.css",
      pages: ["../index_precompiled.html"] // rel to bin path
    },*/
    js: {
      src: paths.dest + "/js",
      dest: paths.dest + "/js"
    },
    css: {
      src: paths.dest + "/css",
      dest: paths.dest + "/css"
    },
    jshint: {
      files:[
        '/../bin/gulpfile.js',
        '/../bin/config.js',
        '/main.js'/*,
        '/*.js',
        '/!*.min.js'*/
      ],
      paths:"js"
    },
    uglify: {
      depends:['plugins'],
      files: [
        "/*.js",
        "!/*.min.js"
      ],
      paths:"js"
    },
    uglifyapp: {
      //depends: ["uglify"],
      files: [
        "/plugins.js",
        "/main.js"/*,
        "/!*.min.js"*/
      ],
      paths:"js",
      filename: "app.min.js"
    },
    updatedevdata: {
      files: [
        '/manifest.appcache',
        '/humans.txt'
      ],
      src: paths.src + "",
      dest: paths.dest + ""
    }
  },
  libs: {
    html5boilerplate: {
      dest: paths.libs + "/html5-boilerplate",
      repo: "git@github.com:h5bp/html5-boilerplate.git"
    },
    bootstrap: {
      dest: paths.libs + "/bootstrap",
      repo: "git@github.com:twbs/bootstrap.git"
    }
  },
  tmp: {
    path: paths.tmp,
    lastUpdate: paths.tmp + '/lastupdate'
  }
};
