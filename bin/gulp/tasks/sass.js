var gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	debug      = require('gulp-debug'),
	sourcemaps = require('gulp-sourcemaps'),
	rename     = require('gulp-rename'),
	sass       = require('gulp-sass');

function task(filesPaths, dest, filename) {
	var s = sass({onError:gutil.log});
	return gulp.src(filesPaths)
		.pipe(sourcemaps.init())
		.pipe(s)
		.pipe(sourcemaps.write())
		.pipe(debug())
		.pipe(rename(filename))
		.pipe(debug())
		.pipe(gulp.dest(dest))
		.pipe(debug());
}
module.exports = task;
