var server = require("../lib/modules/server"),
	gulp   = require('gulp'),
	watch  = require('gulp-watch'),
	fs     = require('fs-extra'),
	req    = require('request'),
	config = require('../config'),
	serverHost = config.server.host,
	serverPort = config.server.port,
	serverRefreshUrl = [
		"http://",
		serverHost ? serverHost : "localhost",
		serverPort ? ":" + serverPort : "",
		"/refresh"
	].join("");

function getConfigList(name, prop) {
	var target = [];
	if (config.gulp[name] && config.gulp[name].hasOwnProperty(prop)) {
		target = config.gulp[name][prop];

		if (typeof target === "string") {
			target = [target];
		}
	}
	return target;
}

function normalizeFilesPaths(files, srcToAdd) {
	var filesPaths = [];

	files.forEach(function(i, v) {
		if (i.indexOf("!") < 0) {
			filesPaths.push(srcToAdd + i);
		} else {
			filesPaths.push("!" + srcToAdd + i.split("!").join(""));
		}
	});
	return filesPaths;
}

(function(undefined){

module.exports = function(tasks) {
    tasks.forEach(function(task) {
    	var name = task.name,
			files = getConfigList(name, "files"),
			conf = config.gulp[name] || {},
			filename = conf.filename,
			confPaths = (
				conf.paths !== undefined
					? config.gulp[conf.paths]
					: conf
			),
			src = confPaths.src || "",
			dest = confPaths.dest || "",
			filesPaths = normalizeFilesPaths(files, src),
			depends = conf.depends || [],
			watches = (
				conf.watch !== undefined
					? conf.watch
					: undefined
			);

        gulp.task(name, depends, function(callback) {
        	//console.log(arguments);
        	var gulpchain = require('./tasks/' + name)(filesPaths, dest, filename);

        	if (!!gulpchain) {
        		gulpchain.on("end", function(){
        			callback();
			        if (watches) {
			 			server.refreshPolldate();

						req.get(serverRefreshUrl).on("error", function(){
							console.log("no localhost server listening for clients livereloading");
						});
					}
	        	});
        	}
        });

        if (watches) {
			gulp.task('watch:' + name, function() {
				watch([watches], function(files){
					gulp.start(name);
				})
			});
        }
    });
	gulp.task('tasklist', function(){
		console.log(tasks);
	});

    return gulp;
};
})();