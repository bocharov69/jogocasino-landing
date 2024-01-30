import { app } from '../../gulpfile.js';

export const localServer = () => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.buildFolder}`,
    },
    notify: false,
    port: process.env.LOCAL_SITE_PORT,
  });
};
