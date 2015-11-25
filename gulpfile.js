var gulp = require('gulp');
var config = require('./gulp.config')();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var inject = require('gulp-inject');
var order = require("gulp-order");
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');


//Watch for file changes
gulp.task('dev', ['browserSync'], function() {
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('app/**/*.js', browserSync.reload);
});

//Inject all styles after compile sass/scss
gulp.task('appStyles',['sass'], function() {
    var sources = gulp.src(['app/**/*.css'], {read: false});
    return gulp.src(config.appIndex)
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});

//Inject all JS in the right order after loading vendor deps
gulp.task('appJs', ['wiredep'], function(){
    var sources = gulp.src(['app/**/*.js'], {read: false})
        .pipe(order(config.jsOrder));
    return gulp.src(config.appIndex)
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});


//Compile stylesheets
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.+(scss|sass)') // added return
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Inject vendor dependencies
gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp.src(config.appIndex)
        .pipe(wiredep(options))
        .pipe(gulp.dest('./app'));
});



// Start browserSync server
gulp.task('browserSync',['appJs', 'appStyles'], function() {
    browserSync({
        server: {
            baseDir: './app/',
            routes: {
                '/bower_components': './bower_components'
            }
        },
        port: 5150
    })
});


gulp.task('build',function(){
    return gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});





