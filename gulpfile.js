var gulp = require("gulp");
var sassPlugin = require("gulp-sass");
var sassLintPlugin = require("gulp-sass-lint");
var sourceMapPlugin = require("gulp-sourcemaps");
var cssoPlugin = require("gulp-csso");
var renamePlugin = require("gulp-rename");
var browserSync = require("browser-sync").create();

// Define tasks
gulp.task("default", gulp.series(lintSass, compileSass, copyImages));
gulp.task("minify", gulp.series(minifyStyle));
gulp.task("serve", gulp.series("default", prepareDemo, function() {
        browserSync.init({
            server: "./demo"
        });

        gulp.watch("./src/scss/**/*.scss", gulp.series("default", prepareDemo));
        gulp.watch("./dist/*.html").on("change", browserSync.reload);
    })
);

/**
 * Lint SCSS.
 *
 * @param {Function} afterDone
 */
function lintSass(afterDone) {
    gulp.src(["./src/scss/custom.scss", "./src/scss/demo.scss"])
        .pipe(sassLintPlugin())
        .pipe(sassLintPlugin.format())
        .pipe(sassLintPlugin.failOnError());

    afterDone();
}

/**
 * Compile SCSS into CSS.
 *
 * @param {Function} afterDone
 */
function compileSass(afterDone) {
    gulp.src(["./src/scss/custom.scss", "./src/scss/demo.scss"])
        .pipe(sourceMapPlugin.init())
        .pipe(sassPlugin().on("error", sassPlugin.logError))
        .pipe(sourceMapPlugin.write("./"))
        .pipe(gulp.dest("./dist/css"));

    afterDone();
}

/**
 * Minify CSS.
 *
 * @param {Function} afterDone
 */
function minifyStyle(afterDone) {
    gulp.src(["./dist/css/**/*.css", "!./dist/css/**/*.min.css"])
        .pipe(sourceMapPlugin.init())
        .pipe(cssoPlugin())
        .pipe(renamePlugin({ suffix: ".min" }))
        .pipe(sourceMapPlugin.write("./"))
        .pipe(gulp.dest("./dist/css"));

    afterDone();
}

/**
 * Copy images from source into dist directory.
 *
 * @param {Function} afterDone
 */
function copyImages(afterDone) {
    gulp.src("./src/images/**/*")
        .pipe(gulp.dest("./dist/images"));

    afterDone();
}

/**
 * Prepare demo files.
 *
 * @param {Function} afterDone
 */
function prepareDemo(afterDone) {

    // Copy CSS files
    gulp.src([
        "./dist/css/custom.css",
        "./dist/css/custom.css.map",
        "./dist/css/demo.css",
        "./dist/css/demo.css.map"
    ]).pipe(gulp.dest("./demo/assets/css"));

    // Copy images
    gulp.src("./dist/images/*")
        .pipe(gulp.dest("./demo/assets/images"));

    // Copy vendor libraries
    gulp.src(["./node_modules/jquery/dist/jquery.js", "./node_modules/dropzone/dist/dropzone.js"])
        .pipe(gulp.dest("./demo/assets/vendor"));

    afterDone();
}
