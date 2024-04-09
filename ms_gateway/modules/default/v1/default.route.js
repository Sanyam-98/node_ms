const express = require('express');

const router = express.Router();

const DefaultController = require('./default.controller');


/**
 * @description handler get,post,put,patch,delete request
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next method
 * @return
 */
// const requestHandler = (req, res, next) => {
//   req
//     .pipe(request(`${config.msAuth}${req.originalUrl}`))
//     .on('error', (error) => {
//       if (
//         error &&
//         error.errno === 'ECONNREFUSED' &&
//         error.code === 'ECONNREFUSED'
//       ) {
//         // this means, perticalr microservice is out of reach.
//         // may be shutdown or not able to connect this microservice
//         logger.error(
//           'Unable to connect auth microservice, report this error to Developer.'
//         );
//       }
//       next(error);
//     })
//     .pipe(res);
// };

/**
 * @description Default routes
 */
class DefaultRoute {
  /**
   * @static
   * @memberof DefaultRoute
   * @description Initialize default routers
   * @return
   */
  static init() {
    router.route('/').get(DefaultController.welcome);
    router.route('/welcome').get(DefaultController.welcome);
    return router;
  }
}

module.exports = DefaultRoute;
