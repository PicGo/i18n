import * as fs from 'fs';
import * as path from 'path';
import { BaseAdapter } from './base';
import { logger } from '../utils';
import { EFileChangeType, IFileSyncAdapterConstructorOptions, ILocaleMap, ILocaleFileName } from '../types';

export class FileSyncAdapter extends BaseAdapter {
  private locales: ILocaleMap = {};
  private localeFileName: ILocaleFileName = {};
  private localesBaseDir: string;
  constructor(options: IFileSyncAdapterConstructorOptions) {
    super();
    const { localesBaseDir, localeFileName } = options;
    this.localesBaseDir = localesBaseDir;
    if (localeFileName) {
      this.localeFileName = localeFileName;
    } else {
      this.guessLocaleFileName(localesBaseDir);
    }

    // only for dev env
    if (process.env.NODE_ENV === 'dev') {
      this.watch(this.localesBaseDir);
    }
  }

  getLocale(language: string) {
    if (!this.locales[language]) {
      this.loadLocale(language);
    }
    return this.locales[language];
  }

  private loadLocale(language: string) {
    if (!this.localeFileName[language]) {
      logger.error(`can\'t locate the locale file of language ${language}`);
      return;
    }
    const filePath = path.join(this.localesBaseDir, this.localeFileName[language]);
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    try {
      const locale = JSON.parse(fileContent);
      this.locales[language] = locale;
    } catch (err) {
      logger.error(`unable to parse locales from file (maybe ${filePath} is empty or invalid json?)`);
      logger.error(`raw error info: ${err}`);
    }
  }

  private guessLocaleFileName(dir: string) {
    const files = fs.readdirSync(dir);
    const localeFileName: ILocaleFileName = {};
    files.forEach((fileName: string) => {
      const localeName = fileName.replace(path.extname(fileName), '');
      localeFileName[localeName] = fileName;
    });
    logger.log(`guess locale file path from ${dir}`);
    logger.log(`localeFileName: ${JSON.stringify(localeFileName)}`);
    this.localeFileName = localeFileName;
  }

  // watch the change of files under `dir`
  private watch(dir: string) {
    fs.watch(dir, (eventType: string, fileName: string) => {
      let language = '';
      const { localeFileName } = this;
      for (const lan in localeFileName) {
        if (localeFileName.hasOwnProperty(lan)) {
          if (localeFileName[lan] === fileName) {
            language = lan;
          }
        }
      }
      if (language && eventType === EFileChangeType.change) {
        this.loadLocale(language); // update locale
        logger.log(`${fileName} has updated`);
      }
    });
  }
}
