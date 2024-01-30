import * as dotenv from 'dotenv';
dotenv.config();
import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

import { copy } from './gulp/tasks/copy.js';
import { php } from './gulp/tasks/php.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { localServer } from './gulp/tasks/localServer.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, copyWoff, copyWoff2, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { sitemap } from './gulp/tasks/sitemap.js';

export const app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  isStart: process.argv.includes('--start'),
  gulp,
  path,
  plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.php, php);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, copyWoff, copyWoff2, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, php, html, scss, js, images));

export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, localServer));
export const build = gulp.series(reset, mainTasks, sitemap);
export const start = gulp.series(reset, mainTasks, localServer);
export const deployZip = gulp.series(reset, mainTasks, sitemap, zip);
export const deployFtp = gulp.series(reset, mainTasks, sitemap, ftp);

gulp.task('default', dev);
