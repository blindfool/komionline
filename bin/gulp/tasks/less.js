var gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	rename     = require('gulp-rename'),
	less       = require('gulp-less');

function task(filesPaths, dest, filename) {
	var l = less({}).on('error', gutil.log);

	return gulp.src(filesPaths)
		.pipe(sourcemaps.init())
		.pipe(l)
		.pipe(sourcemaps.write())
		//.pipe(rename(filename))
		.pipe(gulp.dest(dest))
}
module.exports = task;
