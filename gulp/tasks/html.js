import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number'; // to avoid caching files

import { errorNotify } from '../common/helpers.js';
import { path } from '../common/path.js';
import { plugins } from '../common/plugins.js';

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(errorNotify('Html'))
    .pipe(fileInclude())
    .pipe(webpHtmlNosvg())
    .pipe(
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
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browserSync.stream());
};
