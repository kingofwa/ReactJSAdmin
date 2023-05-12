const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra');

const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@font-family': `Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
    }
  }),
  addWebpackAlias({
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@styles': path.resolve(__dirname, 'src/styles')
  })
);
