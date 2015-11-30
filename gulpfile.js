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


//Start BrowserSync and Watch for file changes
gulp.task('dev', ['browserSync'], function() {
    gulp.watch(config.clientApp+'scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch(config.clientApp+'**/*.html', browserSync.reload);
    gulp.watch(config.clientApp+'**/*.js', browserSync.reload);
});

//Inject all styles after compile sass/scss
gulp.task('appStyles',['sass'], function() {
    var sources = gulp.src([config.clientApp+'**/*.css'], {read: false});
    return gulp.src(config.appIndex)
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

//Inject all JS in the right order after loading vendor deps
gulp.task('appJs', ['wiredep'], function(){
    console.log(config);
    var sources = gulp.src([config.clientApp+'**/*.js'], {read: false})
        .pipe(order(config.jsOrder));
    return gulp.src(config.appIndex)
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});


//Compile stylesheets
gulp.task('sass', function() {
    return gulp.src(config.clientApp+'scss/**/*.+(scss|sass)') // added return
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.clientApp+'css'))
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
        .pipe(gulp.dest('./src'));
});



// Start browserSync server
gulp.task('browserSync',['appJs', 'appStyles'], function() {
    browserSync({
        server: {
            baseDir: './src/',
            routes: {
                '/bower_components': './bower_components'
            }
        },
        port: 5150
    })
});


gulp.task('build',['appJs', 'appStyles'],function(){
    return gulp.src(config.clientApp+'index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});





