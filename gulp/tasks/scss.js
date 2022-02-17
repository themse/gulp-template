import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import { path } from '../common/path.js';
import { errorNotify, IS_BUILD, IS_DEV } from '../common/helpers.js';

const sass = gulpSass(dartSass);

export const scss = () => {
  return gulp
    .src(path.src.scss, { sourcemaps: IS_DEV })
    .pipe(errorNotify('Scss'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(gulpIf(IS_BUILD, groupCssMediaQueries()))
    .pipe(
      gulpIf(
        IS_BUILD,
        webpcss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        })
      )
    )
    .pipe(
      gulpIf(
        IS_BUILD,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    .pipe(gulp.dest(path.build.css)) // original css file
    .pipe(gulpIf(IS_BUILD, cleanCss())) // minify css
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
};
