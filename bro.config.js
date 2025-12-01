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
      },
      // Proxy API requests to separate backend server on port 5000
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          // Don't proxy requests that are handled by stubs/api
          bypass: function(req, res, proxyOptions) {
            // If you want to use stubs/api for some routes, add conditions here
            // For now, all /api requests go to backend on port 5000
            return false;
          }
        }
      }
    }
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'travelforge.main': '/travelforge',
    'travelforge.login': '/travelforge/login',
    'travelforge.register': '/travelforge/register',
    'link.travelforge.auth': '/travelforge/login'
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
