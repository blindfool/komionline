var gulp     = require('gulp'),
	changed  = require('gulp-changed'),
	debug    = require('gulp-debug'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush');

function task(filesPaths, dest, filename) {
	//console.log(arguments);
	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(changed(dest))        // Ignore unchanged files
		//.pipe(debug())
	    .pipe(imagemin({            // Optimize
	    	optimizationLevel: 3,
			//progressive: true,      // jpg
	    	interlaced: true,       // gif
			svgoPlugins: [{removeViewBox: false}],  // svg
			use: [pngcrush()]       // png
		}))
		//.pipe(debug())
	    .pipe(gulp.dest(dest));
}
module.exports = task;
