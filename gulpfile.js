// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');

// Compile Less
gulp.task('less', function(cb) {
    gulp
        .src('less/rgs3.less')
        .pipe(less())
        .pipe(gulp.dest("./"));
    cb();
});

// Watch Updates
gulp.task(
    'default',
    gulp.series('less', function(cb) {
        gulp.watch('less/*.less', gulp.series('less'));
        cb();
    })
);