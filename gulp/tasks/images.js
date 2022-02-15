import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

import { path } from '../common/path.js';
import { errorNotify } from '../common/helpers.js';
import { plugins } from '../common/plugins.js';

export const images = () => {
  return gulp
    .src(path.src.images)
    .pipe(errorNotify('Images'))
    .pipe(plugins.newer(path.build.images))
    .pipe(webp())
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.images))
    .pipe(plugins.newer(path.build.images))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      })
    )
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.images))
    .pipe(plugins.browserSync.stream());
};
