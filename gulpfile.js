var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
const htmlmin = require('gulp-htmlmin');
var include = require('posthtml-include');
var del = require('del');
var svgstore = require("gulp-svgstore");

gulp.task('css', function () {
    return gulp.src('source/less/style.less')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('html', function(){
    return gulp.src('source/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({removeComments: true}))
        .pipe(gulp.dest('build'));
});

gulp.task("sprite", function () {
    return gulp.src("source/img/*.svg")
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img"));
  });

gulp.task('server', function(){
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/less/**/*.less', gulp.series('css', 'refresh'));
    gulp.watch('source/js/**', gulp.series('copy', 'refresh'));
    gulp.watch('source/index.html', gulp.series('html', 'refresh'));
    gulp.watch('source/html/**/*.html', gulp.series('html', 'refresh'));
    gulp.watch('source/img/sprite-*.svg', gulp.series('sprite', 'refresh'));
    gulp.watch('source/timepad.css', gulp.series('copy-timepad-css', 'refresh'));
});

gulp.task('refresh', function(done){
    server.reload();
    done();
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copy', function(){
    return gulp.src([
        'source/img/**',
        'source/favicon.*',
        'source/js/**',
        'source/program.pdf',
        ], {
            base: 'source',
        })
        .pipe(gulp.dest('build'));
});

gulp.task('copy-timepad-css', function(){
    return gulp.src([
        'source/timepad.css'
        ], {
            base: 'source',
        })
        .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('clean', 'copy', 'copy-timepad-css', 'css', 'html', 'sprite'));

gulp.task('start', gulp.series('build', 'server'));