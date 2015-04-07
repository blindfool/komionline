var gulp    = require('gulp'),
  replace = require('gulp-replace-task'),
  debug   = require('gulp-debug'),
  pkg     = require('../../package.json');

function task(filesPaths, dest, filename) {
  return gulp.src(filesPaths)
    //.pipe(debug())
    .pipe(replace({
      patterns: [
        {
          match: 'version',
          replacement: pkg.version
        },
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        },
        {
          match: 'date',
          replacement: function(){
            var time = new Date(),
                year = time.getFullYear(),
                month= ('0' + (time.getMonth() + 1)).slice(-2),
                day  = ('0' + time.getDate()).slice(-2);
            return year + "/" + month + "/" + day;
          }
        }
      ]
    }))
    //.pipe(debug({verbose: true}))
    .pipe(gulp.dest(dest));
}
module.exports = task;
