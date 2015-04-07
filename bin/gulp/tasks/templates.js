var gulp   = require('gulp'),
	debug  = require('gulp-debug'),
	gutil  = require('gulp-util'),
	prettify  = require('gulp-html-prettify'),
	rename  = require('gulp-rename'),
	jade   = require('gulp-jade');

function task(filesPaths, dest, filename) {
	var locals = {},
		j = jade({
			locals:locals
		}).on('error', gutil.log);

	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(j)
		.pipe(gulp.dest(dest))
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(rename({suffix:".demin"}))
		//.pipe(debug())
		.pipe(gulp.dest(dest));
};

module.exports = task;
