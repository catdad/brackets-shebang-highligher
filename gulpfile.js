/* jshint node: true, esversion: 6 */

var path = require('path');

var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');
var sequence = require('gulp-sequence');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var graceful = require('gulp-graceful-error');

var pkg = require('./package.json');

var source = (function () {
    return {
      lib: ['main.js', 'shebang-map.js', 'package.json', 'README.md']
    };
}());

var DEST = 'output';

gulp.task('clean', function () {
    return del(DEST);
});

gulp.task('zip', function () {
    var filename = `${pkg.name}-${pkg.version}.zip`;

    gulp.src(source.lib, { base: path.resolve(__dirname) })
        .pipe(zip(filename))
        .pipe(gulp.dest(DEST));
});

gulp.task('lint', function () {
    return gulp.src(source.all)
        .pipe(graceful())
        .pipe(filter(['**/*.js']))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-more-stylish'))
        .pipe(jshint.reporter('fail'))
        .graceful();
});

gulp.task('test', sequence('lint'));

gulp.task('build', sequence('clean', 'zip'));

gulp.task('default', ['build']);
