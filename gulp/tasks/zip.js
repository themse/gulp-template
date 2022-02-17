import gulp from 'gulp';
import gulpZip from 'gulp-zip';

import { path, ROOT_FOLDER } from '../common/path.js';
import { errorNotify } from '../common/helpers.js';

export const zip = () => {
  const createdAt = new Date().toISOString();
  const fileName = `${ROOT_FOLDER}-${createdAt}.zip`;

  return gulp
    .src(`${path.buildFolder}/**/*.*`)
    .pipe(errorNotify('ZIP'))
    .pipe(gulpZip(fileName))
    .pipe(gulp.dest(`${path.archiveFolder}/`));
};
