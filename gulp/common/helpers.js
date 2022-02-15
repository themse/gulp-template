import through2 from 'through2';

import { plugins } from './plugins.js';

export const noop = () => {};

export const errorNotify = (title) => {
  const transform = function (file, _encoding, callback) {
    plugins.plumber(
      plugins.notify.onError({
        title,
        message: 'Error: <%= error.message %>',
      })
    );
    callback(null, file);
  };
  return through2.obj(transform);
};
