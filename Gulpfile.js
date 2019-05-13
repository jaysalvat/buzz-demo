var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del     = require('del');

gulp.task('html', () => {
    return gulp.src('./src/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
    return gulp.src('./src/js/**/*')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', () => {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('sounds', () => {
    return gulp.src('./src/sounds/**/*')
        .pipe(gulp.dest('./dist/sounds'));
});

gulp.task('sass', () => {
    return gulp.src("./src/sass/styles.sass")
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed',
            indentWidth: 4
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task('dobuild', [ 'sass', 'html', 'js', 'img', 'sounds' ]);

gulp.task('build', [ 'clean' ], () => {
    return gulp.start('dobuild');
});

gulp.task('clean', (next) => {
    del.sync('./dist');
    return next();
});

gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.{sass,scss}',   [ 'sass' ]);
    gulp.watch('./src/**/*.html',               [ 'html' ]);
    gulp.watch('./src/img/**/*',                [ 'img'  ]);
    gulp.watch('./src/js/**/*',                 [ 'js'   ]);
});