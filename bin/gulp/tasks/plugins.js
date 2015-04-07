var gulp   = require('gulp'),
	uglify = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	debug  = require('gulp-debug');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(concat(filename))
		//.pipe(debug())
/*		.pipe(uglify({
			outSourceMap:false
		}))
*/		.pipe(gulp.dest(dest));
}
module.exports = task;
