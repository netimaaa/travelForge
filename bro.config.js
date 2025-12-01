const pkg = require('./package')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    },
    devServer: {
      historyApiFallback: true,
      headers: {
        'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';"
      }
    }
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "travelforge.register": "/travelforge/register",
    "travelforge.main": "/travelforge",
    "travelforge.login": "/travelforge/login"
  },
  features: {
    'travelforge': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    'travelforge.api': '/api'
  },
  // Путь к кастомному HTML-шаблону prom-режима (оставьте undefined чтобы использовать дефолт)
  htmlTemplatePath: undefined
}
