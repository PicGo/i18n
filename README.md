## i18n

## Usage

```js
import { I18n } from '@picgo/i18n';
const i18n = new I18n({
  autoReoload: true,
  language: DEFAULT_LANGUAGE,
  localesBaseDir: YOUR_LOCALES_DIR,
});
```

- 构造函数 I18n

  - 参数: options
    ```json
    {
      "autoReload": boolean, // true -> 自动监听 locales文件变化
      "lauguage": string, // 默认语言类型
      "localesBaseDir": string, // locales 文件所在路径，绝对路径
      "localeFileName": { "language": 对应的locales文件名 } // localeFileName存储语言类型到locales文件的映射，该项可选，当不传入时，将自动扫描localesBaseDir目录下文件，并将各个locale文件名作为该文件对应的语言
    }
    ```
  - 返回值: I18n 实例

- setLanguage

  - 参数: language
  - 无返回值

- getLauguage

  - 返回当前语言类型

- translate

  - 参数 phrase, args
  - 返回翻译后文本

  ```json
  // en.json
  {
    "report": {
      "singular": "only ${cnt} report",
      "plural": "${cnt} reports"
    }
  }
  ```
  ```js
  i18n.translate('report.singular', {cnt: 1}); // only 1 report
  ```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020 PicGo Group
