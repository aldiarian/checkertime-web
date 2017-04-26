var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');

var addsrc = require("gulp-add-src");


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'fileinclude', 'copytodist'  ],  function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html", ['fileinclude']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("modulos/*.html").on('change', browserSync.reload);
    gulp.watch("js/**/*.js").on('change', browserSync.reload);


});


gulp.task('copytodist', function(){
    gulp.src(['img/**/*', 'fonts/**/*', 'js/**/*'], {base: '.'}).pipe(gulp.dest('dist'));
})


gulp.task('fileinclude', function() {
  gulp.src(['*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'modulos/'
    }))
    .pipe(gulp.dest('dist'));
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
