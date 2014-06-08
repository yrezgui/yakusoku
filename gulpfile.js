var gulp        = require('gulp');
var clean       = require('gulp-clean');
var less        = require('gulp-less');
var runSequence = require('run-sequence');

var vendorFiles = [
  './node_modules/jquery/dist/cdn/jquery-2.1.1.min.js',
  './node_modules/underscore/underscore.js',
  './node_modules/moment/min/moment.min.js'
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