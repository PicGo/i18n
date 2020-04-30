import chalk from 'chalk';
class Logger {
  error(info: string) {
    console.error(chalk.red(`[i18n] ${info}`));
  }
  log(info: string) {
    console.log(chalk.gray(`[i18n] ${info}`));
  }
  warn(info: string) {
    console.warn(chalk.yellow(`[i18n] ${info}`));
  }
}

// 单例模式
export const logger = new Logger();
