var gulp   = require('gulp'),
	jsmin  = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	debug  = require('gulp-debug');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
	 	//.pipe(debug())
		.pipe(jsmin())
		.pipe(rename({
			suffix:'.min'
		}))
	 	//.pipe(debug())
		.pipe(gulp.dest(dest));
}
module.exports = task;
