import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import browserSync from 'browser-sync';

import { path } from '../common/path.js';
import { errorNotify } from '../common/helpers.js';

const sass = gulpSass(dartSass);

export const scss = () => {
  return gulp
    .src(path.src.scss, { sourcemaps: true })
    .pipe(errorNotify('Scss'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      webpcss({
        webpClass: '.webp',
        noWebpClass: '.no-webp',
      })
    )
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true,
      })
    )
    .pipe(gulp.dest(path.build.css)) // original css file
    .pipe(cleanCss()) // minify css
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
};
