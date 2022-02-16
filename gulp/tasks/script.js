import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';

import { errorNotify } from '../common/helpers.js';
import { path } from '../common/path.js';

export const script = () => {
  return gulp
    .src(path.src.js, { sourcemaps: true })
    .pipe(errorNotify('JS'))
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'main.min.js',
        },
      })
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
};
