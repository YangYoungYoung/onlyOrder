// https://github.com/michael-ciniawsky/postcss-load-config
const pxtorem = require('postcss-pxtorem');
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  },
  'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 6']
  },
  'postcss-pxtorem': {
    rootValue: 20,
    propList: ['*']
  }     
}
