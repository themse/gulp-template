// TODO need to rethink and refactor this file

import gulp from 'gulp';
import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

import { path } from '../common/path.js';
import { noop, errorNotify } from '../common/helpers.js';

export const otfToTtf = () => {
  return gulp
    .src(`${path.srcFolder}/fonts/*.otf`, {})
    .pipe(errorNotify('Fonts'))
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(gulp.dest(`${path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return gulp
    .src(`${path.srcFolder}/fonts/*.ttf`, {})
    .pipe(errorNotify('Fonts'))
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(gulp.dest(path.build.fonts))
    .pipe(gulp.src(`${path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts));
};

export const fontsStyle = () => {
  let fontsFile = `${path.srcFolder}/scss/fonts.scss`;
  const cb = noop;

  fs.readdir(path.build.fonts, (_err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[1]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `
                    @font-face {
                        font-family: ${fontName};
                        font-display: swap;
                        src: url('../fonts/${fontFileName}.woff2') format('woff2'),
                             url('../fonts/${fontFileName}.ttf') format('truetype');
                        font-weight: ${fontWeight};
                        font-style: normal;
                    }\r\n
                `,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          'File scss/fonts.scss exists. If you want to update it, firstly remove and restart gulp'
        );
      }
    }
  });

  return gulp.src(`${path.srcFolder}`);
};
