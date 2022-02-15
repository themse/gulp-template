import del from 'del';

import { path } from '../common/path.js';

export const clean = () => {
  // use force as we want to delete `dist` that is outside our `gulp`
  return del([path.clean], { force: true });
};
