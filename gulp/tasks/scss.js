import { app } from '../../gulpfile.js';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
// import sassImportJson from 'gulp-sass-import-json';
import sassImportJson from 'node-sass-json-importer';

import { errorLog } from '../helpers/errorLog.js';

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(errorLog('scss'))
      // .pipe(sassImportJson({ isScss: true, cache: false }))
      .pipe(sass({ importer: sassImportJson(), outputStyle: 'expanded' }))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(app.plugins.gulpIf(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.gulpIf(
          app.isBuild,
          webpCss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      .pipe(
        app.plugins.gulpIf(
          app.isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
