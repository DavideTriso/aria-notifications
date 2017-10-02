//Require packages
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify');


//SCSS -> CSS
//Compile SCSS and save compiled + minified CSS file to 'dist' folder
gulp.task('scss', function () {
  return sass('t-css-framework.scss', {
      style: 'expanded'
    })
    .pipe(autoprefixer('last 5 version'))
    .pipe(gulp.dest('docs'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('docs'))
    .pipe(notify({
      message: 'scss task complete'
    }));
});

//WATCH TASKS
gulp.task('watchScss', function () {
  gulp.watch('**/*.scss', ['scss']);
});
