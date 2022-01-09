import { ILocale } from '../types'

export abstract class BaseAdapter {
  abstract getLocale (language: string): ILocale
}
