import { app } from '../../gulpfile.js';

import gulpSitemap from 'gulp-sitemap';

export const sitemap = () => {
  return app.gulp
    .src(`${app.path.src.html}`, {
      read: false,
    })
    .pipe(
      gulpSitemap({
        siteUrl: process.env.SITE_URL,
      })
    )
    .pipe(app.plugins.replace(/index.pug/g, ``))
    .pipe(app.gulp.dest(app.path.build.html));
};
