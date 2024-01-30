import { app } from '../../gulpfile.js';

import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

import { configFTP } from '../config/ftp.js';
import { errorLog } from '../helpers/errorLog.js';
import { configProject } from '../config/project.js';

export const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);

  return app.gulp
    .src(app.path.build.build)
    .pipe(errorLog('ftp'))
    .pipe(ftpConnect.dest(`./${app.path.ftp}/${app.path.rootFolder}`)); //TODO
};
