import { plugins } from '../common/plugins.js';
import { path } from '../common/path.js';

export const server = () => {
  plugins.browserSync.init({
    server: {
      baseDir: path.build.html,
    },
    notify: false,
    port: 3000,
  });
};
