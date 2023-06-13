const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const googleFonts = require('google-fonts');
const googleWebFonts = require('gulp-google-webfonts');
const size = require('gulp-size');
const del = require('del');
const useref = require('gulp-useref');
const replace = require('gulp-replace-path');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const merge = require('merge-stream');
const fs = require('fs');
const { parseFontString } = require('google-fonts');

// Rest of your Gulp tasks...


gulp.task('clean', function () {
    return del(['dist', 'index.html']);
});

// gulp.task('fonts', function () {
//     const fontAwesomeFonts = gulp.src('src/font-awesome/fonts/fontawesome-webfont*')
//         .pipe(gulp.dest('dist/fonts/'));

//     const fontsList = [
//         { family: 'Open+Sans', variants: ['400', '300', '400italic', '600', '700', '800', '700italic', '600italic'] },
//         { family: 'Neuton', variants: ['200', '300', '400'] },
//         // Add more font configurations here
//     ];

//     const googleFontsStream = googleWebFonts({ fonts: fontsList });

//     return merge(googleFontsStream, fontAwesomeFonts)
//         .pipe(gulpif('*.css', cleanCSS()))
//         .pipe(gulp.dest('dist/fonts'));
// });

gulp.task('fonts', function () {
    return gulp.src('src/font-awesome/fonts/fontawesome-webfont*')
        .pipe(gulp.dest('dist/fonts/'));
});


gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});

gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest('dist'))
        .pipe(size());
});

gulp.task('github', function () {
    return gulp.src('dist/index.html')
        .pipe(replace('href="', 'href="dist/'))
        .pipe(replace('src="', 'src="dist/'))
        .pipe(gulp.dest('./'))
        .pipe(size());
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'images', 'fonts'),'github'));

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('watch', gulp.series('clean', 'build', function () {
    gulp.watch(["src/js/*.js", "src/css/*.css", "src/*.html"], gulp.series('html'));
    gulp.watch(["src/images/*"], gulp.series('images'));
    gulp.watch(["src/fonts.list", "src/font-awesome/*"], gulp.series('fonts'));
}));
