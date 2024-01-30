import { app } from '../../gulpfile.js';

import webpack from 'webpack-stream';

import { errorLog } from '../helpers/errorLog.js';

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(errorLog('js'))
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'main.min.js',
        },
        module: {
          rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }],
        },
      })
    )

    .pipe(app.plugins.replace(/@php\//g, `./php/`))
    .pipe(app.plugins.replace(/@files\//g, `./files/`))

    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
