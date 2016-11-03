var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var googleWebFonts = require('gulp-google-webfonts');
var size = require('gulp-size');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var replace = require('gulp-replace-path');

var filesJS = [
   "./js/jquery.min.js",
   "./js/bootstrap.js",
   "./js/jquery.flexslider.js",
   "./js/jquery.easing.js",
   "./js/jquery.mixitup.min.js",
   "./js/nivo-lightbox.min.js",
   "./js/jquery.appear.js",
   "./js/jquery.inview.js",
   "./js/contact.js",
   "./js/animations.js",
   "./js/main.js"
];

//var filesCSS = "./css/*.css";
var filesCSS = [
   "./css/bootstrap.css", 
   "./font-awesome/*.css",
   "./css/style.css",
   "./css/flexslider.css",
   "./css/nivo-lightbox.css",
   "./images/themes/default/default.css",
   "./css/animate.css",
   "./css/colors/green-black.css"
];

var options = { };

gulp.task('styles', function() {

   // return gulp.src(filesCSS)
   //       .pipe(concat('./dist'))
   //       .pipe(rename('dist.min.css'))
   //       .pipe(cleanCSS())
   //       .pipe(gulp.dest('./dist'));

});

gulp.task('scripts', function() {

   // return gulp.src(filesJS)
   //       .pipe(concat('./dist'))
   //       .pipe(rename('dist.min.js'))
   //       .pipe(uglify())
   //       .pipe(gulp.dest('./dist'));

});

gulp.task('fonts', function() {

   gulp.src('./src/fonts.list')
        .pipe(googleWebFonts(options))
        .pipe(gulp.dest('./dist/fonts'));

   // gulp.src('./fonts/fonts.css')
   //      .pipe(concat('./dist/fonts'))
   //      .pipe(rename('fonts.min.css'))
   //      .pipe(cleanCSS())
   //      .pipe(gulp.dest('./dist/fonts'));

   return gulp.src(['./src/font-awesome/fonts/fontawesome-webfont*'])
         .pipe(gulp.dest('./dist/fonts/'));
});


// HTML
gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    return gulp.src('./src/index.html')
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(cleanCSS())
        .pipe(cssFilter.restore)
        .pipe(useref())
        .pipe(replace('href="fonts/', 'href="dist/fonts/'))
        .pipe(replace('href="images/', 'href="dist/images/'))
        .pipe(replace('src="images/', 'src="dist/images/'))
        .pipe(gulp.dest(''))
        .pipe(size());
});

// Images
gulp.task('images', function () {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'))
        .pipe(size());
});

// Clean
gulp.task('clean', function () {
    // return gulp.src("./dist/*", { read: false })
    //      .pipe(vinylPaths(del));
});

// Build
gulp.task('build', ['html', 'images',  'fonts']);

// Default task
gulp.task('default', ['clean'],function() {
   gulp.start('build');
   
   // gulp.watch(filesJS, function(evt) {
   //    gulp.run('dist');
   // });

   // Watch index.html
    gulp.watch("./src/index.html", ['html']);

    gulp.watch(filesCSS, ['styles']);

    // Watch .js files
    gulp.watch(filesJS, ['scripts']);

    // Watch image files
    //gulp.watch('app/images/**/*', ['images']);
});