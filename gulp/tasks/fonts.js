import gulp from 'gulp';
import concat from 'gulp-concat';

import { path } from '../common/path.js';
import { errorNotify, fontFaceGen } from '../common/helpers.js';

export const fontGenerate = () => {
  return gulp
    .src(`${path.src.fonts}/*.{ttf,otf,woff,woff2}`)
    .pipe(errorNotify('Font Generation'))
    .pipe(
      fontFaceGen({
        css_fontpath: '../fonts/',
        dest: `${path.build.fonts}/`,
      })
    );
};

export const fontStyles = () => {
  return gulp
    .src(`${path.build.fonts}/**/*.css`)
    .pipe(concat('_fonts.scss'))
    .pipe(gulp.dest(`${path.srcFolder}/scss/`));
};
