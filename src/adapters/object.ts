import { BaseAdapter } from './base';
import { ILocale, ILocaleMap } from '../types';

export class ObjectAdapter extends BaseAdapter {
  private locales: ILocaleMap = {};
  constructor(locales: ILocaleMap) {
    super();
    this.locales = locales;
  }

  getLocale(language: string): ILocale {
    return this.locales[language];
  }
}
