import * as fontkit from 'fontkit';
import { app } from '../../gulpfile.js';

import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

import { errorLog } from '../helpers/errorLog.js';

export const otfToTtf = () => {
  return app.gulp
    .src(app.path.src.otf)
    .pipe(errorLog('fonts'))
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(app.gulp.dest(app.path.src.fonts));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(app.path.src.ttf)
    .pipe(errorLog('fonts'))
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(app.path.src.ttf))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
};

export const copyWoff = () => {
  return app.gulp.src(app.path.src.woff).pipe(app.gulp.dest(app.path.build.fonts));
};

export const copyWoff2 = () => {
  return app.gulp.src(app.path.src.woff2).pipe(app.gulp.dest(app.path.build.fonts));
};

const getFontWeight = (fontWeightTypes, fontName) => {
  const baseFontWeightType = 400;

  for (const fontWeightType in fontWeightTypes) {
    if (fontName.toLocaleLowerCase().includes(fontWeightType)) {
      return fontWeightTypes[fontWeightType];
    }
  }

  return baseFontWeightType;
};

const getFontStyle = (fontStyleTypes, fontName) => {
  const baseFontStyleType = 'normal';

  for (const fontStyleType in fontStyleTypes) {
    if (fontName.toLocaleLowerCase().includes(fontStyleType)) {
      return fontStyleTypes[fontStyleType];
    }
  }

  return baseFontStyleType;
};

const fontWeightTypes = {
  thin: 100,
  extralight: 200,
  light: 300,
  medium: 500,
  semibold: 600,
  extrabold: 800,
  bold: 700,
  heavy: 800,
  black: 900,
};

const fontStyleTypes = {
  normal: 'normal',
  italic: 'italic',
  oblique: 'oblique',
};

const createFontsFile = (cssFontsFile, fontsFiles) => {
  fs.writeFile(cssFontsFile, '', () => {});
  for (let i = 0; i < fontsFiles.length; i++) {
    const fontFileName = fontsFiles[i];
    const fontMeta = fontkit.openSync(`${app.path.build.fonts}${fontFileName}`);
    const fontFormat = fontMeta.type.toLowerCase() || fontFileName.split('.')[1];
    const fontName = fontMeta.postscriptName.split('-')[0] || fontFileName.split('.')[0];
    const fontWeight = fontMeta['OS/2'].usWeightClass || getFontWeight(fontWeightTypes, fontFileName);
    const fontStyle =
      fontMeta['OS/2'].fsSelection.oblique ||
      fontMeta['OS/2'].fsSelection.italic ||
      getFontStyle(fontStyleTypes, fontFileName) ||
      'normal';

    fs.appendFile(
      cssFontsFile,
      `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}") format("${fontFormat}");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
      () => {}
    );
  }
};

export const fontsStyle = () => {
  const cssFontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(cssFontsFile)) {
        createFontsFile(cssFontsFile, fontsFiles);
      } else {
        try {
          fs.unlinkSync(cssFontsFile);
          createFontsFile(cssFontsFile, fontsFiles);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      console.error('There are no files in the "fonts" directory');
      fs.writeFile(cssFontsFile, '', () => {});
      fs.appendFile(cssFontsFile, '// There are no files in the "fonts" directory', () => {});
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
};
