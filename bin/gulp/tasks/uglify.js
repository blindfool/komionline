var gulp     = require('gulp'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	debug    = require('gulp-debug');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		.pipe(uglify({
			outSourceMap:false
		}))
		//.pipe(debug())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest(dest))
}
module.exports = task;
