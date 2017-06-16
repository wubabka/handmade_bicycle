// "use strict";

// var gulp = require("gulp");
// var sass = require("gulp-sass");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var mqpacker = require("css-mqpacker");
// var minify = require("gulp-csso");
// var rename = require("gulp-rename");
// var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore");
// var svgmin = require("gulp-svgmin");
// var del = require("del");
// var server = require("browser-sync").create();
// var run = require("run-sequence");

// gulp.task("style", function () {
//   gulp.src("sass/style.scss")
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer({
//         browsers: [
//           "last 2 versions"
//         ]
//       }),
//       mqpacker({
//         sort: true
//       })
//     ]))
//     .pipe(gulp.dest("build/css"))
//     .pipe(minify())
//     .pipe(rename("style.min.css"))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });

// gulp.task("images", function () {
//   return gulp.src("build/img/**/*.{png,jpg,gif}")
//     .pipe(imagemin([
//       imagemin.optipng({
//         optimizationLevel: 3
//       }),
//       imagemin.jpegtran({
//         progressive: true
//       })
//     ]))
//     .pipe(gulp.dest("build/img"));
// });

// gulp.task("symbols", function () {
//   return gulp.src("build/img/*.svg")
//     .pipe(svgmin())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("symbols.svg"))
//     .pipe(gulp.dest("build/img"));
// });

// gulp.task("html:copy", function () {
//   return gulp.src("*.html")
//     .pipe(gulp.dest("build"));
// });

// gulp.task("html:update", ["html:copy"], function (done) {
//   server.reload();
//   done();
// });

// gulp.task("serve", function () {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });

//   gulp.watch("sass/**/*.{scss,sass}", ["style"]);
//   gulp.watch("*.html", ["html:update"]);
// });

// gulp.task("copy", function () {
//   return gulp.src([
//       "fonts/**/*.{woff,woff2}",
//       "img/**",
//       "js/**",
//       "*.html"
//     ], {
//       base: "."
//     })
//     .pipe(gulp.dest("build"));
// });

// gulp.task("clean", function () {
//   return del("build");
// });

// gulp.task("build", function (fn) {
//   run(
//     "clean",
//     "copy",
//     "style",
//     "images",
//     "symbols",
//     fn
//   );
// });

"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});
