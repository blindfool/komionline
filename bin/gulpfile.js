// jslint node: true
// "use strict";

var config = require("./config").gulp,
	tasksToLoad = [
		{name:'csscompile'},
		{name:'less', watch: true},
		{name:'images', watch: true},
		{name:'templates', watch: true},
		{name:'plugins', watch: true},
		{name:'jsmin'},
		//{name:'uncss'},//, depends:["csscompile"]},
		{name:'uglify'},
		{name:'uglifyapp'},
		{name:'jshint'},
		{name:'updatedevdata'},
		{name:'pluglist'}  // exp
		//, {name:'tasklist'}  // called inside
	],
	gulp = require('./gulp')(tasksToLoad),
	taskListing   = require('gulp-task-listing');

gulp.task('help',         taskListing.withFilters(/:/));
gulp.task('helpsimp',     taskListing);
gulp.task('test',         ['jshint']);
gulp.task('watch',        ['watch:templates', 'watch:less', 'watch:images', 'watch:plugins']);
gulp.task('compile',      ['templates', 'csscompile', 'uglifyapp']);
gulp.task('compile-full', ['compile', 'images']);
gulp.task('default',      ['watch', 'templates', 'less', 'images', 'plugins', 'updatedevdata']);
