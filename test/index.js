const assert = require('assert');
const path = require('path');
const { I18n, FileSyncAdapter, ObjectAdapter } = require('../dist/index');

const fileSyncAdapter = new FileSyncAdapter({
  localesBaseDir: path.resolve(__dirname, './locales'),
});

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

describe('i18n', () => {
  describe('fileSyncAdapter', () => {
    const i18n = new I18n({
      adapter: fileSyncAdapter,
      defaultLanguage: 'zh',
    });

    it('translate', () => {
      assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2个报告');
    });
    it('setLanguage', () => {
      i18n.setLanguage('en');
      assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2 reports');
    });
  });

  describe('objectAdapter', () => {
    const i18n = new I18n({
      adapter: objectAdapter,
      defaultLanguage: 'zh',
    });
    it('translate', () => {
      assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2个报告');
    });
    it('setLanguage', () => {
      i18n.setLanguage('en');
      assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2 reports');
    });

    it('setLocales', () => {
      objectAdapter.setLocales({
        en: {
          user: {
            name: 'PicGo',
            country: 'China',
          },
          post: {
            singular: 'only ${cnt} post',
            plural: '${cnt} posts',
          },
        },
      });
      assert.equal(i18n.translate('post.plural', { cnt: 2 }), '2 posts');

    });
    it('getLocale null & translate to undefined', () => {
      i18n.setLanguage('TEST')
      assert.equal(i18n.translate('test'), undefined)
    })
    it('getLocale null but change to default', () => {
      i18n.setDefaultLanguage('en')
      assert.equal(i18n.translate('user.name'), 'PicGo')
    })
    it('language can has upper-case string', () => {
      objectAdapter.setLocale('zh-CN', {
        test: '测试PicGo'
      })
      i18n.setLanguage('zh-CN')
      assert.equal(i18n.translate('test'), '测试PicGo')
    })
  });
});
