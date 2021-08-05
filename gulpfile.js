const { series, parallel, watch } = require("gulp");
const { src, dest } = require("gulp");

const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const htmlreplace = require("gulp-html-replace");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();

// Compile sass files

function sassify() {
    return src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}

// Minify css file

function cssMinify() {
    return src("src/css/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/css"));
}

// Combine JS

function combineJS() {
    return src(["src/js/vendor/jquery.min.js", "src/js/vendor/owl.carousel.min.js", "src/js/vendor/wow.min.js", "src/js/function.js"]).pipe(concat("main.js")).pipe(dest("src/js")).pipe(browserSync.stream());
}

// Minify JS

function minifyJS() {
    return src("src/js/main.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
}

//File include

async function fileInclude() {
    return src("src/html/*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
                indent: true,
            })
        )
        .pipe(dest("src"));
}

// Replace html block

function replaceLink() {
    return src("src/*.html")
        .pipe(
            htmlreplace({
                js: "js/main.min.js",
                css: "css/main.min.css",
            })
        )
        .pipe(replace(".html", ""))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("dist"));
}

// Image optimization

function image() {
    return src("src/assets/img/**/*").pipe(imagemin()).pipe(dest("dist/assets/img"));
}

// copy htaccessfile

// Image optimization

function CopyHTAccess() {
    return src("src/.htaccess").pipe(dest("dist/"));
}

//Browser Sync

function serve() {
    browserSync.init({
        server: {
            baseDir: "src",
        },
    });
    watch("src/scss/**/*.scss", sassify);
    watch("src/js/function.js", combineJS);
    watch("src/html/**/*.html", fileInclude).on("change", browserSync.reload);
}

exports.default = series(fileInclude, sassify, combineJS, serve);
exports.build = series(parallel(cssMinify, minifyJS, replaceLink), image, CopyHTAccess);
