var gulp       = require('gulp'),
	cleancss   = require('gulp-clean-css'),
	concat     = require('gulp-concat'),
	debug      = require('gulp-debug');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(concat(filename))
		.pipe(cleancss({
			//keepBreaks:false,
			keepSpecialComments:0
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
