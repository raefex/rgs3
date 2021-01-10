// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');

// Compile LESS
gulp.task('less', function(cb) {
  gulp
    .src('styles/rgs3.less')
    .pipe(less())
    .pipe(gulp.dest("./styles/"));
  cb();
});

gulp.task(
  'default',
  gulp.series('less', function(cb) {
    gulp.watch('styles/*.less', gulp.series('less'));
    cb();
  })
);