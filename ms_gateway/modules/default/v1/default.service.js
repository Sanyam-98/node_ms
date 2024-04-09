const logger = require('../../../helpers/logger.helper');

/**
 * @description Default service
 */
class DefaultService {
  /**
   * @static
   * @memberof DefaultService
   * @description Initialize default service
   * @param {Object} router router object
   * @params {Object} router router object
   * @return
   */
  static init() {
    logger.info('Loading default service');
  }
}

module.exports = DefaultService;
