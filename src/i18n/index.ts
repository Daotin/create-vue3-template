import { createI18n } from "vue-i18n"
import defaultLang from '@/i18n/zh-CN.json';
// import defaultLang from '@/i18n/en-US.json';

const defaultLocale = 'zh-CN';
// const defaultLocale = 'en-US';

// let defaultMessages = defaultLang;

// const defaultConfig = localStorage.getItem("lang");
// if (defaultConfig) {
//   const config = JSON.parse(defaultConfig);
//   const { locale, messages } = config;
//   defaultLocale = locale;
//   defaultMessages = messages;
// }


const i18n = createI18n({
  locale: defaultLocale,
  // legacy: false,
  allowComposition: true,
  // globalInjection: true,
  messages: { [defaultLocale]: defaultLang }
})
console.log(i18n)
export default i18n;