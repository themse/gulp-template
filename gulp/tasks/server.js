import browserSync from 'browser-sync';

import { path } from '../common/path.js';

export const server = () => {
  browserSync.init({
    server: {
      baseDir: path.build.html,
    },
    notify: false,
    port: 3000,
  });
};
