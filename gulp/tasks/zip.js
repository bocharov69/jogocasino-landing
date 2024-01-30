import { app } from '../../gulpfile.js';

import { deleteAsync } from 'del';
import GulpZip from 'gulp-zip';

import { errorLog } from '../helpers/errorLog.js';

export const zip = () => {
  deleteAsync(app.path.zip);
  return app.gulp.src(app.path.build.build).pipe(errorLog('zip')).pipe(GulpZip(app.path.zip)).pipe(app.gulp.dest('./'));
};
