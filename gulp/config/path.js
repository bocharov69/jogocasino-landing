import * as nodePath from 'path';
import { configProject } from './project.js';

const rootFolderName = configProject.projectBuildFolderCustomName
  ? configProject.projectBuildFolderCustomName
  : nodePath.basename(nodePath.resolve());

const buildFolder = `./dist/${rootFolderName}`;
const srcFolder = './src';

const scrImagesList = 'jpg,jpeg,png,gif,webp';
const watchImagesList = `${scrImagesList},svg,ico`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    php: `${buildFolder}/php/`,
    build: `${buildFolder}/**/*.*`,
  },
  src: {
    js: `${srcFolder}/js/main.js`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/html/pages/**/*.pug`,
    images: `${srcFolder}/img/**/*.{${scrImagesList}}`,
    svg: `${srcFolder}/img/**/*.svg`,
    ico: `${srcFolder}/img/**/*.ico`,
    fonts: `${srcFolder}/fonts/`,
    ttf: `${srcFolder}/fonts/*.ttf`,
    otf: `${srcFolder}/fonts/*.otf`,
    woff: `${srcFolder}/fonts/*.woff`,
    woff2: `${srcFolder}/fonts/*.woff2`,
    files: `${srcFolder}/files/**/*.*`,
    php: `${srcFolder}/php/**/*.*`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/html/**/*.pug`,
    images: `${srcFolder}/img/**/*.{${watchImagesList}}`,
    files: `${srcFolder}/files/**/*.*`,
    php: `${srcFolder}/php/**/*.*`,
  },
  clean: './dist',
  buildFolder,
  srcFolder,
  rootFolder: `${nodePath.resolve()}${nodePath.normalize('/src/html/pages/')}`,
  zip: `./${rootFolderName}.zip`,
  ftp: 'develop',
};
