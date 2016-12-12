var gulp = require('gulp');
var browserify = require('browserify');
// Providers "require" support, CommonJS
var babelify = require('babelify');
// Vinyl stream support
var source = require('vinyl-source-stream');
// Vinyl stream support
var buffer      = require('vinyl-buffer');
// Minification support
var uglify      = require('gulp-uglify');
// Provide external sourcemap files
var sourcemaps  = require('gulp-sourcemaps');
// Livereload support for the browser
var livereload  = require('gulp-livereload');
// Provides notification to both the console and Growel
var notify = require('gulp-notify');

// See: https://thesocietea.org/2016/01/building-es6-javascript-for-the-browser-with-gulp-babel-and-more/
gulp.task('build', function () {
  return browserify({
    entries: 'main.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
//  .pipe(sourcemaps.init())
//  .pipe(uglify())
//  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist'))
  .pipe(notify({
    message: 'Generated file: <%= file.relative %>',
  })) // Output the file being created
  .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch(['./src/**/*.jsx', 'main.js'], ['build']);
});

gulp.task('default', ['watch']);
