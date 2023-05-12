const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './styles/antd/variables.less',
  lessVarsFilePathAppendToEndOfContent: true,
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
  wepack(config) {
    return config;
  }
});
