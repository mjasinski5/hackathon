var gulp        = require('gulp'),
    sass        = require('gulp-sass');

gulp.task('sass', function() {

    return gulp.src('./sass/**/*.scss')
            .pipe(sass({
                'outputStyle' : 'compact'
            }))
            .pipe(gulp.dest('./css'));
});

gulp.task('serve', ['sass'], function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
