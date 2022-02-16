const buildFolder = '../dist';
const srcFolder = '../src';

export const path = {
  build: {
    images: `${buildFolder}/img/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    js: `${srcFolder}/js/main.js`,
    scss: `${srcFolder}/scss/stylesheet.scss`,
    html: `${srcFolder}/*.html`,
    fonts: `${srcFolder}/fonts`,
  },
  watch: {
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
    js: `${srcFolder}/**/*.js`,
    scss: `${srcFolder}/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
};
