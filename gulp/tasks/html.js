import { app } from '../../gulpfile.js';

import fs from 'fs';
import through from 'through2';
import path from 'path';

import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import GulpPug from 'gulp-pug';

import { errorLog } from '../helpers/errorLog.js';
import { configProject } from '../config/project.js';

export const html = () => {
  const setLangJSON = (path) => {
    const filePath = new URL(path, import.meta.url);

    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath));
    } else {
      return {};
    }
  };

  const langJSONPath = '../../src/files/locales/lang.json';
  const formLangJSONPath = '../../src/files/locales/formLang.json';

  return app.gulp
    .src(app.path.src.html)
    .pipe(errorLog('html'))
    .pipe(
      GulpPug({
        pretty: true,
        verbose: true,
        data: { lang: setLangJSON(langJSONPath), formLang: setLangJSON(formLangJSONPath) },
      })
    )
    .pipe(
      through.obj(function (file, enc, cb) {
        const pathRelative = path.relative(file.path, app.path.rootFolder).replaceAll('\\', '/');
        const pathToRoot = pathRelative === '..' ? '.' : pathRelative.slice(0, -3);

        // Access the file contents
        const contents = file.contents.toString();

        // Perform operations on the file contents
        const modifiedContents = contents
          .replace(/{projectPath}\//g, `${pathToRoot}/`)
          .replace(/@pages\//g, `${pathToRoot}/`)
          .replace(/@img\//g, `${pathToRoot}/img/`)
          .replace(/@files\//g, `${pathToRoot}/files/`)
          .replace(/.pug/g, `.html`)
          .replace(/{isFullScreen}/g, `${configProject.type}`);

        // Update the file contents
        file.contents = Buffer.from(modifiedContents);

        // Pass the updated file to the next pipe
        this.push(file);
        cb();
      })
    )

    .pipe(app.plugins.gulpIf(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
