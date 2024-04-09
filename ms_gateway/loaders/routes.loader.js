const logger = require('../helpers/logger.helper');

const defaultRoutes = require('../modules/default/v1/default.route');
const ms1Routes = require('../modules/ms1/v1/ms1.route');
const ms2Routes = require('../modules/ms2/v1/ms2.route');
const ms3Routes = require('../modules/ms3/v1/ms3.route');

/**
 * @description Define all app routes
 */
class RoutesLoader {
  /**
   * @static
   * @memberof Routes
   * @description initialize app routes
   * @param {Object} app app object
   * @return
   */
  static init(app) {
    logger.info('Loading application routes');

    app.use('/api/v1/', defaultRoutes.init());
    app.use('/api/v1/ms1', ms1Routes.init());
    app.use('/api/v1/ms2', ms2Routes.init());
    app.use('/api/v1/ms3', ms3Routes.init());
  }
}

module.exports = RoutesLoader;
