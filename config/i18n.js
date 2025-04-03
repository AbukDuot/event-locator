const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const { join } = require('path');

i18n.use(Backend).init({
  lng: 'en',  // Default language
  fallbackLng: 'en',
  backend: {
    loadPath: join(__dirname, '../locales/{{lng}}.json'),
  },
});

module.exports = i18n;
