import gulp from 'gulp';

import { path } from './common/path.js';
import {
  clean,
  html,
  fonts,
  server,
  scss,
  images,
  script,
  zip,
} from './tasks/index.js';

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, script);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(html, scss, script, images);

export const fontTasks = gulp.series(fonts.fontGenerate, fonts.fontStyles);

export const build = gulp.series(clean, fontTasks, mainTasks);
export const archiveZip = gulp.series(build, zip);
export default gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
