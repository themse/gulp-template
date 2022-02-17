import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number'; // to avoid caching files
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import { errorNotify, IS_BUILD } from '../common/helpers.js';
import { path } from '../common/path.js';

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(errorNotify('Html'))
    .pipe(fileInclude())
    .pipe(gulpIf(IS_BUILD, webpHtmlNosvg()))
    .pipe(
      gulpIf(
        IS_BUILD,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: './version.json',
          },
        })
      )
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
};
