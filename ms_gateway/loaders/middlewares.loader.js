const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const client = require('prom-client');
const uuid = require('uuid');

const { collectDefaultMetrics } = client;
const logger = require('../helpers/logger.helper');

/**
 * @description It plays an essential and key role to add middlewares. All request passes
 *              through the middleware.
 */
class MiddlewaresLoader {
  /**
   * @static
   * @memberOf Middlewares
   * @description Initializing middleware contains eg security, logger, parsing, request, viewing.
   * @param {Object} app contains express app and express object
   * @return
   */
  static init(app) {
    logger.info('Loading application middlewares');

    // security middlewares
    app.use(cors());
    app.use(helmet());
    app.use(compression());

    app.use(cookieParser());
    app.use(methodOverride());

    // logging middlewares
    app.use(morgan('combined', { stream: logger.stream }));

    // Process statistics
    collectDefaultMetrics({ prefix: 'ms_gateway' });

    // Middleware to add a correlation ID to the request headers
    app.use((req, res, next) => {
      const transactionId = req.headers['transaction-id'] || uuid.v4();
      req.headers['transaction-id'] = transactionId;

      // Log incoming request details
      logger.info(`[${transactionId}] Incoming Request - ${req.method} ${req.originalUrl}`);
      logger.info(`[${transactionId}] Date/Time: ${new Date().toISOString()}`);
      logger.info(`[${transactionId}] IP Address: ${req.ip}`);
      logger.info(`[${transactionId}] User-Agent: ${req.get('User-Agent')}`);

      // Forward the request to the next middleware or route
      next();
    });

    app.get('/metrics', (req, res) => {
      res.set('Content-Type', client.register.contentType);
      res.end(client.register.metrics());
    });

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
  }
}

module.exports = MiddlewaresLoader;
