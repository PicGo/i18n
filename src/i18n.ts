import { BaseAdapter } from './adapters'
import { II18nConstructorOptions, ILocale } from './types'
import { logger } from './utils'

const DOTNOTATION = '.'

export class I18n {
  private readonly adapter: BaseAdapter
  private currentLanguage: string
  private defaultLanguage: string
  constructor (options: II18nConstructorOptions) {
    const { adapter, defaultLanguage } = options
    this.adapter = adapter
    this.currentLanguage = defaultLanguage.trim()
    this.defaultLanguage = this.currentLanguage
  }

  getAdapter (): BaseAdapter {
    return this.adapter
  }

  getLanguage (): string {
    return this.currentLanguage
  }

  setLanguage (language: string): void {
    this.currentLanguage = language.trim()
  }

  setDefaultLanguage (language: string): void {
    this.defaultLanguage = language.trim()
  }

  private getLocale (): ILocale | null {
    let currentLocale = this.adapter.getLocale(this.currentLanguage)
    if (!currentLocale) {
      currentLocale = this.adapter.getLocale(this.defaultLanguage)
      if (!currentLocale) {
        logger.error(`current locale ${this.currentLanguage} is null`)
        return null
      }
      logger.error(`current locale ${this.currentLanguage} is null, change to default locale ${this.defaultLanguage}`)
    }
    return currentLocale
  }

  translate (phrase: string, args?: any): string | undefined {
    const currentLocale = this.getLocale()
    if (!currentLocale) {
      return
    }

    const template = phrase.split(DOTNOTATION).reduce((object: any, key: string) => {
      if (!object || !object.hasOwnProperty(key)) {
        logger.warn(`current locale doesn't contain ${phrase}`)
        return undefined
      }
      return object[key]
    }, currentLocale)

    return this.postProcess(template, args)
  }

  private postProcess (template: string, args?: any): string | undefined {
    if (!template) {
      return
    }
    if (!args) {
      return template
    }
    // see benchmark
    return Object.keys(args).reduce((res, key) => {
      return res.replace('${' + key + '}', args[key])
    }, template)
  }
}
