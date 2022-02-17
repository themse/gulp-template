import through2 from 'through2';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fontfacegen from 'fontfacegen';

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

export const fontFaceGen = ({
  source,
  dest,
  css,
  css_fontpath,
  subset,
  collate,
  embed,
}) => {
  const opt = Object.fromEntries(
    Object.entries({
      source,
      dest,
      css,
      css_fontpath,
      subset,
      collate,
      embed,
    }).filter(([_, value]) => value)
  );

  const transform = function (file, _encoding, callback) {
    fontfacegen({
      source: file.path,
      dest: 'dist/fonts/',
      collate: true,
      ...opt,
    });
    callback(null, file);
  };
  return through2.obj(transform);
};

export const IS_BUILD = process.argv.includes('--build');
export const IS_DEV = !process.argv.includes('--build');
