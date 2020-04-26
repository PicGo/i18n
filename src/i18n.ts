import * as fs from 'fs';
import * as path from 'path';
import { EFileChangeType, II18nConstructorOptions, ILocaleFileName } from './types/index';
import { Logger } from './logger';

const DOTNOTATION = '.';

export class I18n {
	private language: string;
	private locales: { [locale: string]: any }; // cache locale content
	private localeFileName: ILocaleFileName = {}; // localeName -> the name of localeFile
	private readonly localesBaseDir: string;
	private readonly logger: Logger;
	constructor(options: II18nConstructorOptions) {
		this.logger = new Logger();
		this.locales = {};
		const { language, localesBaseDir, localeFileName } = options;
		this.localesBaseDir = localesBaseDir;
		if (localeFileName) {
			this.localeFileName = localeFileName;
		} else {
			this.guessLocaleFileName(localesBaseDir);
		}
		this.language = language;
		this.loadLocale(language); // load locale
		if (options.autoReoload) {
			this.watch(this.localesBaseDir);
		}
	}

	getLanguage(): string {
		return this.language;
	}

	setLanguage(language: string) {
		this.language = language;
		if (!this.locales[language]) {
			this.loadLocale(language);
		}
	}

	translate(phrase: string, args: any) {
		const currentLocale = this.locales[this.language];
		if (!currentLocale) {
			this.logger.error('current locale is null');
			return;
		}

		const template = phrase.split(DOTNOTATION).reduce((object: any, key: string) => {
			if (!object || !object.hasOwnProperty(key)) {
				this.logger.warn(`current locale does\'t contain ${phrase}`);
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
		const keys = Object.keys(args);
		const values = keys.map((key) => args[key]);
		return new Function(keys.join(','), `return \`${template}\``)(values);
	}

	private loadLocale(language: string) {
		if (!this.localeFileName[language]) {
			this.logger.error(`can\'t locate the locale file of language ${language}`);
			return;
		}
		const filePath = path.join(this.localesBaseDir, this.localeFileName[language]);
		const fileContent = fs.readFileSync(filePath, {
			encoding: 'utf-8',
		});
		try {
			const locale = JSON.parse(fileContent);
			this.locales[language] = locale; // load locale content
		} catch (err) {
			this.logger.error(`unable to parse locales from file (maybe ${filePath} is empty or invalid json?)`);
			this.logger.error(`raw error info: ${err}`);
		}
	}

	// TODO change the name of this method
	private guessLocaleFileName(dir: string) {
		const files = fs.readdirSync(dir);
		const localeFileName: ILocaleFileName = {};
		files.forEach((fileName: string) => {
			const localeName = fileName.replace(path.extname(fileName), '');
			localeFileName[localeName] = fileName;
		});
		this.logger.log(`guess locale file path from ${dir}`);
		this.logger.log(`localeFileName: ${JSON.stringify(localeFileName)}`);
		this.localeFileName = localeFileName;
	}

	// useless ?
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
				this.logger.log(`${fileName} has updated`);
			}
		});
	}
}
