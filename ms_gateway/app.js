const express = require('express');

const app = express();
const path = require('path');
const createError = require('http-errors');
const loaders = require('./loaders/index');
const logger = require('./helpers/logger.helper');

/**
 * @description Key class to loads all essentials middlewares
 */
class App {
  /**
   * @static
   * @memberOf App
   * @description Boostraping an application and loads
   *  all essentials middleware and application dependencies.
   * @return
   */
  static bootstrap() {
    // Load middlewares
    loaders.init(app);
    logger.info('Application middleware loaded');

    // serve static resources
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    // centralize error handler
    app.use((err, req, res, next) => {
      if (err) {
        logger.error(err);
        res.status(err.status || 500).send({
          status: err.status || 500,
          error: {
            message: err.message,
          },
        });
      } else {
        next();
      }
    });
    return app;
  }
}

module.exports = App;
