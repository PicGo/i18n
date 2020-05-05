## i18n

![CI Test](https://github.com/PicGo/i18n/workflows/CI%20Test/badge.svg)

i18n 工具

### 用法

i18n 默认提供 FileSyncAdapter、ObjectAdapter 两个适配器，适用的场景分别为:

- FileSyncAdapter: locales 信息保存在文件中, 该适配器**只适用于 Nodejs 平台**
- ObjectAdapter: locales 信息保存在对象中, 该适配器适用于 Web 平台、Nodejs 平台

#### Nodejs

- 安装

  npm install @picgo/i18n -S

- 使用

  ```js
  import { I18n, FileSyncAdapter, ObjectAdapter } from '@picgo/i18n';

  // use FileSyncAdapter
  const fileSyncAdapter = new FileSyncAdapter({
    localesBaseDir: path.resolve(__dirname, './locales'), // locales文件目录
  });

  const i18n = new I18n({
    adapter: fileSyncAdapter,
    defaultLanguage: 'zh',
  });

  // use ObjectAdapter
  const objectAdapter = new ObjectAdapter({
    zh: {
      user: {
        name: 'PicGo',
        country: '中国',
      },
      report: {
        singular: ' ${cnt}个报告',
        plural: '${cnt}个报告',
      },
    },
    en: {
      user: {
        name: 'PicGo',
        country: 'China',
      },
      report: {
        singular: 'only ${cnt} report',
        plural: '${cnt} reports',
      },
    },
  });
  const i18n = new I18n({
    adapter: objectAdapter,
    defaultLanguage: 'zh',
  });
  ```

#### Web

- 引入

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@picgo/i18n/dist/i18n_umd.js"></script>
  ```

- 使用
  ```js
  const { ObjectAdapter, I18n } = PicGo_I18n;
  // use ObjectAdapter
  const objectAdapter = new ObjectAdapter({
    zh: {
      user: {
        name: 'PicGo',
        country: '中国',
      },
      report: {
        singular: ' ${cnt}个报告',
        plural: '${cnt}个报告',
      },
    },
    en: {
      user: {
        name: 'PicGo',
        country: 'China',
      },
      report: {
        singular: 'only ${cnt} report',
        plural: '${cnt} reports',
      },
    },
  });
  const i18n = new I18n({
    adapter: objectAdapter,
    defaultLanguage: 'zh',
  });
  ```

### 自定义 Adapter

```js
import { BaseAdapter } from 'i18n';
class CustomAdapter extends BaseAdapter {
  getLocale(language) {}
}
```

### API

#### I18n

- 构造函数 I18n

  - 参数: options
    ```json
    {
      "adater": BaseAdapter, // 适配器
      "defaultLanguage": string // 默认语言
    }
    ```
  - 返回值: I18n 实例

* i18n.setLanguage

  - 参数: language, 语言类型
  - 无返回值

* i18n.getLauguage

  - 无参数
  - 返回当前语言类型

* i18n.translate

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
  i18n.translate('report.singular', { cnt: 1 }); // only 1 report
  ```

#### FileSyncAdapter

- 构造函数 FileSyncAdapter

  - 参数: options
    ```json
    {
      "localesBaseDir": string, // locales 文件所在路径，绝对路径
      "localeFileName": { "language": 对应的locales文件名 } // localeFileName存储语言类型到locales文件的映射，该项可选，当不传入时，将自动扫描localesBaseDir目录下文件，并将各个locale文件名作为该文件对应的语言
    }
    ```
  - 返回 FileSyncAdapter 实例

- fileSyncAdapter.getLocale
  - 参数 languag, 语言类型
  - 返回 language 对应的 locale 数据

#### ObjectAdapter

- 构造函数 ObjectAdapter

  - 参数 locales, 保存 locales 信息的对象

  ```json
  {
    "zh": {
      "user": {
        "name": "PicGo",
        "country": "China"
      },
      "report": {
        "singular": " ${cnt}个报告",
        "plural": "${cnt}个报告"
      }
    },
    "en": {
      "user": {
        "name": "PicGo",
        "country": "China"
      },
      "report": {
        "singular": "only ${cnt} report",
        "plural": "${cnt} reports"
      }
    }
  }
  ```

  - 返回 ObjectAdapter 实例

- objectAdapter.getLocale
  - 参数 languag, 语言类型
  - 返回 language 对应的 locale 数据

* objectAdapter.setLocales 用于动态修改 objectAdapter 上的 locales 数据

  - 参数 locales, locales 数据
  - 无返回值

  ```js
  objectAdapter.setLocales({
    zh: {
      newData: 'this is new Data',
    },
  });
  ```

### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020 PicGo Group
