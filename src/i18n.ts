import { BaseAdapter } from './adapters';
import { II18nConstructorOptions } from './types';
import { logger } from './utils';

const DOTNOTATION = '.';

export class I18n {
  private adapter: BaseAdapter;
  private currentLanguage: string;
  constructor(options: II18nConstructorOptions) {
    const { adapter, defaultLanguage } = options;
    this.adapter = adapter;
    this.currentLanguage = defaultLanguage.trim().toLowerCase();
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(language: string) {
    this.currentLanguage = language.trim().toLowerCase();
  }

  translate(phrase: string, args: any) {
    const currentLocale = this.adapter.getLocale(this.currentLanguage);
    if (!currentLocale) {
      logger.error('current locale is null');
      return;
    }

    const template = phrase.split(DOTNOTATION).reduce((object: any, key: string) => {
      if (!object || !object.hasOwnProperty(key)) {
        logger.warn(`current locale does\'t contain ${phrase}`);
        return;
      }
      return object[key];
    }, currentLocale);

    return this.postProcess(template, args);
  }

  private postProcess(template: string, args: any) {
    if (!template) {
      return;
    }
    // see benchmark
    return Object.keys(args).reduce((res, key) => {
      return res.replace('${' + key + '}', args[key]);
    }, template);
  }
}
