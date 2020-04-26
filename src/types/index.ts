export interface ILocaleFileName {
  [locale: string]: string;
}

export interface II18nConstructorOptions {
  autoReoload?: boolean;
  language: string;
  localesBaseDir: string;
  localeFileName?: ILocaleFileName;
}

export enum EFileChangeType {
  change = 'change',
}
