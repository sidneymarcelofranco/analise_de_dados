const browsersync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const npmdist = require('gulp-npm-dist');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");    
const cleanCSS = require('gulp-clean-css');
const rtlcss = require('gulp-rtlcss');
const isSourceMap = true;
const sourceMapWrite = (isSourceMap) ? "./" : false;

const paths = {
  base:   {
    base:         {
      dir:    './'
    },
    node:         {
      dir:    './node_modules'
    },
    packageLock:  {
      files:  './package-lock.json'
    }
  },
  static:   {
    base:   {
      dir:    './static/',
      files:  './static/**/*'
    },
    libs:   {
      dir:    './static/libs',
    },
    css:    {
      dir:    './static/css',
    },
    js:    {
      dir:    './static/js',
      files:  './static/js/pages',
    },
    images:{
      dir:    './static/images',
      files:  './static/images/**/*',
    }
  },
  src:    {
    base:   {
      dir:    './src',
      files:  './src/**/*'
    },
    css:    {
      dir:    './src/css',
      files:  './src/css/**/*'
    },
    
    img:    {
      dir:    './src/images',
      files:  './src/images/**/*',
    },
    js:     {
      dir:    './src/js',
      pages:  './src/js/pages',
      files:  './src/js/pages/*.js',
      main:   './src/js/*.js',
    },
    scss:   {
      dir: './src/scss',
      files: './src/scss/**/*',
      main: './src/scss/*.scss',
      icons: './src/scss/icons.scss',
      iconsPlugin: './src/scss/plugins/icons/*',
      bootstrap: './src/scss/bootstrap.scss',
      vars: './src/scss/_variable*.scss',
      utility: './src/scss/components/_utilities.scss',
    },
    lang:{
      dir: './src/lang',
      files: './src/lang/**/*',
    }
  }
};

gulp.task('browsersyncReload', function(callback) {
  browsersync.init({
    server: {
      baseDir: [paths.static.base.dir, paths.src.base.dir]
    },
  });
  callback();
});

gulp.task('watch', function() {
  gulp.watch([paths.src.scss.dir,  "!" + paths.src.scss.bootstrap, "!" + paths.src.scss.icons, "!" + paths.src.scss.iconsPlugin], gulp.series('scss'));
  gulp.watch([paths.src.scss.bootstrap, paths.src.scss.vars, paths.src.scss.utility], gulp.series('bootstrap'));
  gulp.watch([paths.src.scss.icons, paths.src.scss.iconsPlugin], gulp.series('icons'));
  gulp.watch([paths.src.js.dir], gulp.series('js'));
  gulp.watch([paths.src.js.pages], gulp.series('jsPages'));
  gulp.watch([paths.src.lang.files], gulp.series('copy-lang'));
});

gulp.task('js', function() {
  return gulp
    .src(paths.src.js.main)
    .pipe(uglify())
    .pipe(gulp.dest(paths.static.js.dir));
});

gulp.task('jsPages', function() {
  return gulp
    .src(paths.src.js.files)
    .pipe(uglify())
    .pipe(gulp.dest(paths.static.js.files));
});

gulp.task('icons', function () {
  return gulp
    .src([paths.src.scss.icons])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.static.css.dir))
    .pipe(cleanCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write(sourceMapWrite))
    .pipe(gulp.dest(paths.static.css.dir));
});

gulp.task('bootstrap', function () {
  // generate ltr  
  gulp
    .src([paths.src.scss.bootstrap])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.static.css.dir))
    .pipe(cleanCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write(sourceMapWrite))
    .pipe(gulp.dest(paths.static.css.dir));

  // generate rtl
  return gulp
    .src([paths.src.scss.bootstrap])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer()
    )
    .pipe(rtlcss())
    .pipe(gulp.dest(paths.static.css.dir))
    .pipe(cleanCSS())
    .pipe(rename({suffix: "-rtl.min"}))
    .pipe(sourcemaps.write(sourceMapWrite))
    .pipe(gulp.dest(paths.static.css.dir));
});

gulp.task('scss', function () {
  // generate ltr  
  gulp
    .src([paths.src.scss.main, "!" + paths.src.scss.bootstrap, "!" + paths.src.scss.icons, "!" + paths.src.scss.iconsPlugin])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.static.css.dir))
    .pipe(cleanCSS())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write(sourceMapWrite))
    .pipe(gulp.dest(paths.static.css.dir));

  // generate rtl
  return gulp
    .src([paths.src.scss.main, "!" + paths.src.scss.bootstrap, "!" + paths.src.scss.icons, "!" + paths.src.scss.iconsPlugin])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rtlcss())
    .pipe(gulp.dest(paths.static.css.dir))
    .pipe(cleanCSS())
    .pipe(rename({suffix: "-rtl.min"}))
    .pipe(sourcemaps.write(sourceMapWrite))
    .pipe(gulp.dest(paths.static.css.dir));
});

gulp.task('clean:packageLock', function(callback) {
  del.sync(paths.base.packageLock.files);
  callback();
});

gulp.task('clean:static', function(callback) {
  del.sync(paths.static.base.dir);
  callback();
});

gulp.task('copy:all', function() {
  return gulp
    .src([
      paths.src.base.files,
      '!' + paths.src.scss.dir, '!' + paths.src.scss.files,
      '!' + paths.src.js.dir, '!' + paths.src.js.files, 
      '!' + paths.src.js.main,
    ])
    .pipe(gulp.dest(paths.static.base.dir));
});

gulp.task('copy:libs', function() {
  return gulp
    .src(npmdist(), { base: paths.base.node.dir })
    .pipe(rename(function(path) {
        path.dirname = path.dirname.replace(/\/static/, '').replace(/\\static/, '').replace(/\\dist/, '');
    }))
    .pipe(gulp.dest(paths.static.libs.dir));
});

//for copy of lang
gulp.task('copy-lang', function() {
  return gulp.src('./src/lang/*.json')
    .pipe(gulp.dest('./static/lang'));
});


// gulp.task('build', gulp.series(gulp.parallel('clean:tmp', 'clean:packageLock', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html'));
gulp.task('build', gulp.series(gulp.parallel('clean:packageLock', 'clean:static', 'copy:all', 'copy:libs'), 'bootstrap', 'scss', 'icons','copy-lang'));

// gulp.task('default', gulp.series(gulp.parallel('fileinclude', 'scss'), gulp.parallel('browsersync', 'watch')));
gulp.task('default', gulp.series(gulp.parallel('clean:packageLock', 'clean:static', 'copy:all', 'copy:libs',  'bootstrap', 'scss', 'icons', 'js', 'jsPages','copy-lang'), gulp.parallel('watch')));