import through2 from 'through2';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export const noop = () => {};

export const errorNotify = (title) => {
  const transform = function (file, _encoding, callback) {
    plumber(
      notify.onError({
        title,
        message: 'Error: <%= error.message %>',
      })
    );
    callback(null, file);
  };
  return through2.obj(transform);
};
