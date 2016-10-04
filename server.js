var browserSync = require('browser-sync').create()
var historyApiFallback = require('connect-history-api-fallback')

browserSync.init({
  server: 'public',
  files: ['public/**/*.*'],
  middleware: [require('connect-logger')(), historyApiFallback()]
})
