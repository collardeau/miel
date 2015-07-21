var gulp = require('gulp');
var babel = require('gulp-babel');

// for building tests only

gulp.task('watch', function () {
  gulp.watch('test/src/*.js', ['build']);
});

gulp.task('build', function(){
  return gulp.src('test/src/*.js')
  .pipe(babel())
  .pipe(gulp.dest('test/lib'));
});


