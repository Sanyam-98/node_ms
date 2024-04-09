const middlewaresLoader = require('./middlewares.loader');
const routesLoader = require('./routes.loader');

const logger = require('../helpers/logger.helper');


/**
 * @description Loads appliation middleware
 */
class Loaders {
  /**
   * @static
   * @memberOf Loaders
   * @description Initialize application essential middlewares.
   * @param {Object} app contains express app and express object
   * @return
   */
  static init(app) {
    // try {
    // loading middleware
    middlewaresLoader.init(app);

    // Bypass authentication signature verification
    // app.use(byPassAuthSignatureVerification());

    // Verify authentication signature
    // app.use(verifyAuthSignature());

    // app routers
    routesLoader.init(app);
    // app schedulers
    // scheduler.init();
    // } catch (err) {
    //   logger.error('Error occurs while boostraping application loaders');
    //   logger.error(err);
    //   new Error(err);
    // }
  }
}

module.exports = Loaders;
