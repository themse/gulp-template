import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import browserSync from 'browser-sync';
import gulpIf from 'gulp-if';

import { path } from '../common/path.js';
import { errorNotify, IS_BUILD } from '../common/helpers.js';

export const images = () => {
  return (
    gulp
      .src(path.src.images)
      .pipe(errorNotify('Images'))
      .pipe(newer(path.build.images))

      // Image optimization
      .pipe(gulpIf(IS_BUILD, webp()))
      .pipe(gulpIf(IS_BUILD, gulp.dest(path.build.images)))
      .pipe(gulpIf(IS_BUILD, gulp.src(path.src.images)))
      .pipe(gulpIf(IS_BUILD, newer(path.build.images)))
      .pipe(
        gulpIf(
          IS_BUILD,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          })
        )
      )

      .pipe(gulp.dest(path.build.images))
      .pipe(gulp.src(path.src.svg))
      .pipe(gulp.dest(path.build.images))
      .pipe(browserSync.stream())
  );
};
