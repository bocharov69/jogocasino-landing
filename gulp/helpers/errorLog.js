import { app } from '../../gulpfile.js';

export const errorLog = (title) => {
  return app.plugins.plumber(
    app.plugins.notify.onError({
      title: title.toUpperCase(),
      message: 'Error: <%= error.message %>',
    })
  );
};
