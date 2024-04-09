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
  console.log(`${config.ms2}${req.originalUrl}`);
  req
    .pipe(request(`${config.ms2}${req.originalUrl}`))
    .on('error', (error) => {
      if (error && error.errno === 'ECONNREFUSED' && error.code === 'ECONNREFUSED') {
        // this means, perticalr microservice is out of reach.
        // may be shutdown or not able to connect this microservice
        logger.error('Unable to connect ms2 microservice, report this error to Developer.');
      }
      next(error);
    })
    .pipe(res);
};

/**
 * @description ms2 routes
 */
class Ms2Route {
  /**
   * @static
   * @memberof Ms2Route
   * @description Initialize Ms2Route
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

module.exports = Ms2Route;
