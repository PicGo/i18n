const { PerformanceObserver, performance } = require('perf_hooks');
debugger;

const CNT = 1000000;

const TEMPLATE = 'There ara ${bookCnt} books for ${childrenCnt} children';
const args = {
  bookCnt: 4,
  childrenCnt: 2,
};

const obs = new PerformanceObserver((items) => {
  const entry = items.getEntries()[0];
  console.log(entry.name, entry.duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

function formatByStringReplace(tpl, args) {
  return Object.keys(args).reduce((res, key) => {
    return res.replace('${' + key + '}', args[key]);
  }, tpl);
}

function formatByNewFunction(tpl, args) {
  const keys = Object.keys(args);
  const values = keys.map((key) => args[key]);
  return new Function(keys.join(','), `return \`${tpl}\``)(...values);
}

function formatByRegExp(tpl, args) {
  return tpl.replace(/\$\{([^\}]+)\}/g, function () {
    return args[arguments[1]];
  });
}

performance.mark('r-start');
for (let i = 0; i < CNT; i++) {
  formatByStringReplace(TEMPLATE, args);
}
performance.mark('r-end');
performance.measure('stringReplace', 'r-start', 'r-end');

performance.mark('f-start');
for (let i = 0; i < CNT; i++) {
  formatByNewFunction(TEMPLATE, args);
}
performance.mark('f-end');
performance.measure('function', 'f-start', 'f-end');

performance.mark('regexp-start');
for (let i = 0; i < CNT; i++) {
  formatByRegExp(TEMPLATE, args);
}
performance.mark('regexp-end');
performance.measure('regexp', 'regexp-start', 'regexp-end');



/**
 * results
 *  stringReplace 676.861757
 *  function 1323.756486
 *  regexp 1087.751756
 */
