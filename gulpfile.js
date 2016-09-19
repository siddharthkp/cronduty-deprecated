const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const purify = require('gulp-purifycss');
const concatCss = require('gulp-concat-css');

gulp.task('scripts', function() {
    return gulp.src('static/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/bundle'));
});

gulp.task('styles', function () {
    return gulp.src('static/style/*.css')
    .pipe(purify(['views/*.pug']))
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('static/bundle'));
});

gulp.task('build', gulp.parallel('scripts', 'styles'));

