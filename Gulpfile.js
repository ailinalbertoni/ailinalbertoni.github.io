var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var googleWebFonts = require('gulp-google-webfonts');
var size = require('gulp-size');
var del = require('del');
var useref = require('gulp-useref');
var replace = require('gulp-replace-path');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

// Clean
gulp.task('clean', function () {
   return del.sync(['dist', 'index.html']);
});

// Fonts
gulp.task('fonts', function() {
   gulp.src('src/fonts.list')
        .pipe(googleWebFonts({}))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist/fonts'));

   return gulp.src(['src/font-awesome/fonts/fontawesome-webfont*'])
         .pipe(gulp.dest('dist/fonts/'));
});

// Images
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({}))
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});

// HTML
gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'))
        .pipe(size());
});

// Github Index
gulp.task('github', function () {
    return gulp.src('dist/index.html')
        .pipe(replace('href="', 'href="dist/'))
        .pipe(replace('src="', 'src="dist/'))
        .pipe(gulp.dest(''))
        .pipe(size());
});

// Build
gulp.task('build', ['html', 'images',  'fonts']);

// Default task
gulp.task('default', ['clean'],function() {
    return gulp.start('build');
});

// Watch
gulp.task('watch', ['clean'],function() {
    gulp.start('build');

    gulp.watch(["src/js/*.js","src/css/*.css","src/*.html"], ['html']);
    gulp.watch(["src/images/*"], ['images']);
    gulp.watch(["src/fonts.list","src/font-awesome/*"], ['fonts']);

});
