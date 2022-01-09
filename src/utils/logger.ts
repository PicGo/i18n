import chalk from 'chalk'
import { EPlatform } from '../types'
class Logger {
  private readonly isNode: boolean
  constructor () {
    this.isNode = this.getPlatform() === EPlatform.node
  }

  error (info: string): void {
    const output = this.formatOutput(info)
    console.error(this.isNode ? chalk.red(output) : output)
  }

  log (info: string): void {
    const output = this.formatOutput(info)
    console.log(this.isNode ? chalk.gray(output) : output)
  }

  warn (info: string): void {
    const output = this.formatOutput(info)
    console.warn(this.isNode ? chalk.yellow(output) : output)
  }

  private getPlatform (): EPlatform {
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      return EPlatform.node
    }
    return EPlatform.web
  }

  private formatOutput (output: string): string {
    return `[i18n] ${output}`
  }
}

// 单例模式
export const logger = new Logger()
