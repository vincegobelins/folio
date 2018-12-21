var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');
    svgSprite = require('gulp-svg-sprite');

/* pathConfig*/
var entryPoint = './src/js/app.js',
    entryBoPoint = './src/js/appBo.js',
    browserDir = './',
    entrySassPath = './src/scss/styles.scss',
    sassWatchPath = './src/scss/**/*.scss',
    svgWatchPath = './images/svg/raw/**/*.svg',
    jsWatchPath = './src/js/**/*.js',
    htmlWatchPath = './*.html';
/**/

gulp.task('js', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-bo', function () {
    return browserify(entryBoPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('scriptsBo.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
    return gulp.src(entrySassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js', 'js-bo']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(svgWatchPath, ['compress-svg']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('compress-svg', function() {
    return gulp.src(svgWatchPath)
        .pipe(svgSprite({
            mode: {
                symbol: true
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('run', ['compress-svg', 'js', 'sass', 'watch', 'browser-sync']);