var gulp   = require('gulp'),
	jshint = require('gulp-jshint'),
	debug  = require('gulp-debug');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

}
module.exports = task;
