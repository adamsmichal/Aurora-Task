const { watch, src, dest, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require("del");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const config = {
  app: {
    js: ["./src/scripts/**/*.js"],
    scss: "./src/sass/*.scss",
    fonts: "./src/assets/fonts/*",
    images: "./src/assets/images/*.*",
    icons: "./src/assets/icons/*.*",
    html: "./*.html",
  },
  dist: {
    base: "./dist/",
    fonts: "./dist/fonts",
    images: "./dist/images",
    icons: "./dist/icons",
  },
};

function jsTask(done) {
  src(config.app.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("main.bundle.js"))
    .pipe(uglify())
    .pipe(dest(config.dist.base));
  done();
}

function cssTask(done) {
  src(config.app.scss)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".bundle" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(config.dist.base));
  done();
}

function fontTask(done) {
  src(config.app.fonts).pipe(dest(config.dist.fonts));
  done();
}

function imagesTask(done) {
  src(config.app.icons).pipe(dest(config.dist.icons));
  done();
}

function iconsTask(done) {
  src(config.app.images).pipe(dest(config.dist.images));
  done();
}

function templateTask(done) {
  src(config.app.html).pipe(dest(config.dist.base));
  done();
}

function watchFiles() {
  watch(config.app.js, series(jsTask, reload));
  watch(config.app.scss, series(cssTask, reload));
  watch(["./src/sass/**/*.scss"], series(cssTask, reload));
  watch(config.app.fonts, series(fontTask, reload));
  watch(config.app.icons, series(iconsTask, reload));
  watch(config.app.images, series(imagesTask, reload));
  watch(config.app.html, series(templateTask, reload));
}

function liveReload(done) {
  browserSync.init({
    server: {
      baseDir: config.dist.base,
    },
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function cleanUp() {
  return del([config.dist.base]);
}

exports.dev = parallel(
  jsTask,
  cssTask,
  fontTask,
  imagesTask,
  iconsTask,
  templateTask,
  watchFiles,
  liveReload
);
exports.build = series(
  cleanUp,
  parallel(jsTask, cssTask, fontTask, imagesTask, iconsTask, templateTask)
);
