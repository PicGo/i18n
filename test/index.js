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
      country: 'China',
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
    it('setLanguate', () => {
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
    it('setLanguate', () => {
      i18n.setLanguage('en');
      assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2 reports');
    });
  });
});
