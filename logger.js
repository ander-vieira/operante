const winston = require("winston");

global.logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.File({name: 'global', filename: 'log/global.log'}),
    new winston.transports.File({name: 'error', filename: 'log/error.log', level: 'error'}),
    new winston.transports.Console({level: 'warn'})
  ]
});
