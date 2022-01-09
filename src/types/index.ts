import { BaseAdapter } from '../adapters'
export interface ILocaleFileName {
  [locale: string]: string
}

export interface ILocale {
  [key: string]: any
}

export interface ILocaleMap {
  [language: string]: ILocale
}

export interface II18nConstructorOptions {
  adapter: BaseAdapter
  defaultLanguage: string
}

export interface IFileSyncAdapterConstructorOptions {
  localesBaseDir: string
  localeFileName?: ILocaleFileName
}

export enum EFileChangeType {
  change = 'change',
}

export enum ERUN_ENV {
  dev = 'development',
}

export enum EPlatform {
  node = 'node',
  web = 'web',
}
