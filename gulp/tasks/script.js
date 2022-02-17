import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';

import { errorNotify, IS_DEV, IS_BUILD } from '../common/helpers.js';
import { path } from '../common/path.js';

export const script = () => {
  return gulp
    .src(path.src.js, { sourcemaps: IS_DEV })
    .pipe(errorNotify('JS'))
    .pipe(
      webpack({
        mode: IS_BUILD ? 'production' : 'development',
        output: {
          filename: 'main.min.js',
        },
      })
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
};
