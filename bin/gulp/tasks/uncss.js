var config     = require('../../config').gulp,
	confuncss  = config.uncss
	pages      = confuncss.pages,
	gulp       = require('gulp'),
	uncss      = require('gulp-uncss'),
	rename     = require('gulp-rename'),
	//concat     = require('gulp-concat'),
	cleancss   = require('gulp-clean-css'),
	debug      = require('gulp-debug');

function task(filesPaths, dest, filename) {
	//console.log(process.env.PWD);
	return gulp.src(filesPaths)
//		.pipe(debug())
		.pipe(rename({suffix: ".min"}))
		//.pipe(concat(filename))
//		.pipe(debug())
		.pipe(uncss({
            html: pages/*,
            timeout: 5000*/
        }))
		//.pipe(debug())
		.pipe(cleancss({
			//keepBreaks:false,
			keepSpecialComments:0
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
