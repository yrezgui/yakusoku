var gulp        = require('gulp');
var clean       = require('gulp-clean');
var less        = require('gulp-less');
var runSequence = require('run-sequence');

var vendorFiles = [
  './vendor/jquery/dist/jquery.min.js',
  './vendor/underscore/underscore.js',
  './vendor/moment/min/moment.min.js',
  './vendor/clndr/clndr.min.js'
];

gulp.task('clean', function cleanTask() {
  return gulp.src('./www/**/*', {read: false})
             .pipe(clean());
});

gulp.task('scripts', function scriptsTask() {
  return gulp.src(vendorFiles.concat('./src/frontend/scripts/**/*.js'))
             .pipe(gulp.dest('./www/js'));
});

gulp.task('styles', function stylesTask() {
  return gulp.src('./src/frontend/styles/clndr.less')
             .pipe(less())
             .pipe(gulp.dest('./www/css'));
});

gulp.task('views', function scriptsTask() {
  return gulp.src('./src/frontend/**/*.html')
             .pipe(gulp.dest('./www'));
});

gulp.task('build', ['clean'], function buildTask(callback) {
  return runSequence(['scripts', 'styles', 'views'], callback);
});

gulp.task('default', ['build']);