const DefaultService = require('./default.service');
const appConfig = require('../../../config/app.config');
/**
 * @description Default controller
 */
class DefaultController {
  /**
   * @static
   * @memberof DefaultController
   * @description welcome method
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} res response object
   * @return
   */
  static async welcome(req, res) {
    DefaultService.init();
    return res.status(200).send({
      status: 200,
      data: `Welcome to the ${appConfig.appName}, running on port ${appConfig.appPort}!`,
    });
  }
}

module.exports = DefaultController;
