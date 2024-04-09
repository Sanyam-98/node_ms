const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, printf } = format;
const myFormat = printf(
  (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
);

const appRoot = path.resolve(__dirname, '../');
const todayDate = new Date();
const fileName = `${todayDate.getFullYear()}-${
  todayDate.getMonth() + 1
}-${todayDate.getDate()}`;
const logDir = path.join(appRoot, 'logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, '%DATE%-rotate.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d',
});

dailyRotateFileTransport.on('rotate', (oldFilename, newFilename) => {
  // do something fun
});

const logger = createLogger({
  format: combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: `${logDir}/${fileName}.info.log`,
      level: 'info',
      maxsize: 5000000,
    }),
    new transports.File({
      filename: `${logDir}/${fileName}.debug.log`,
      level: 'debug',
      maxsize: 5000000,
    }),
    new transports.File({
      filename: `${logDir}/${fileName}.error.log`,
      level: 'error',
      maxsize: 5000000,
    }),
    new transports.File({
      handleExceptions: true,
      filename: `${logDir}/${fileName}.exception.log`,
      level: 'error',
      maxsize: 5000000,
    }),
    new transports.Console(),
    dailyRotateFileTransport,
  ],
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
