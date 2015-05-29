var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

var paths = {
    statics: './statics',
    scss: './statics/scss',
    templates: './templates',
    js: './statics/js',
    cdn: './cdn/vue'
};

var export_name = 'app';

var env = process.env.NODE_ENV || 'development';

gulp.task('css', function () {
    return gulp.src(paths.scss + '/main.scss')
        .pipe(sass({
            includePaths: [
                paths.scss,
                paths.statics
            ]
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename(export_name + '.css'))
        .pipe(gulp.dest(paths.cdn + '/css'))
        .pipe(notify("CSS compiled!"))
        .pipe(livereload())
        ;
});

gulp.task('browserify', function () {
    return browserify(paths.js + '/main.jsx', {extensions: ['.js', '.jsx'], debug: (env !== 'production')})
        .transform(babelify, {stage: 0})
        .bundle()
        .on('error', function (e) {
            console.log(e.message);
            this.emit('end');
        })
        .pipe(source(export_name + '.js'))
        .pipe(buffer())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(paths.cdn + '/js'))
        .pipe(notify("JS compiled"))
        .pipe(livereload())
        ;
});

gulp.task('templates', function () {
    return gulp.src(paths.templates + '/**/*.twig')
        .pipe(notify("Template changed!"))
        .pipe(livereload())
        ;
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.templates + '/**/*.twig', ['templates']);
    gulp.watch(paths.scss + '/**/*.scss', ['css']);
    gulp.watch([paths.js + '/**/*.jsx', paths.js + '/**/*.jsx'], ['browserify']);
});


gulp.task('default', ['browserify', 'css']);