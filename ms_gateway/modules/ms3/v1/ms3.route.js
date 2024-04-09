const express = require('express');

const router = express.Router();
const request = require('request');

const logger = require('../../../helpers/logger.helper');
const config = require('../../../config/app.config');

/**
 * @description handler get,post,put,patch,delete request
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next method
 * @return
 */
const requestHandler = (req, res, next) => {
  console.log('request forward to:');
  console.log(`${config.ms3}${req.originalUrl}`);
  req
    .pipe(request(`${config.ms3}${req.originalUrl}`))
    .on('error', (error) => {
      if (error && error.errno === 'ECONNREFUSED' && error.code === 'ECONNREFUSED') {
        // this means, perticalr microservice is out of reach.
        // may be shutdown or not able to connect this microservice
        logger.error('Unable to connect ms3 microservice, report this error to Developer.');
      }
      next(error);
    })
    .pipe(res);
};

/**
 * @description ms3 routes
 */
class Ms3Route {
  /**
   * @static
   * @memberof Ms3Route
   * @description Initialize ms3 routers
   * @return
   */
  static init() {
    router.route('*').get(requestHandler);
    router.route('*').post(requestHandler);
    router.route('*').put(requestHandler);
    router.route('*').delete(requestHandler);
    router.route('*').patch(requestHandler);
    return router;
  }
}

module.exports = Ms3Route;
