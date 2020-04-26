const assert = require('assert');
const path = require('path');
const I18n = require('../dist/index').I18n;

const i18n = new I18n({
  autoReoload: true,
  language: 'zh',
  localesBaseDir: path.resolve(__dirname, './locales'),
});

describe('i18n', function(){

  it('translate', () => {
    assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2个报告');
  });
  it('setLanguate', () => {
    i18n.setLanguage('en');
    assert.equal(i18n.translate('report.plural', { cnt: 2 }), '2 reports');
  });
});