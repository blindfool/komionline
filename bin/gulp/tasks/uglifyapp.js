var gulp     = require('gulp'),
	concat   = require('gulp-concat')
	debug    = require('gulp-debug')
	uglify   = require('gulp-uglifyjs');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(concat(filename))
		//.pipe(debug({verbose: true}))
		.pipe(uglify(filename, {
			outSourceMap:false
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
