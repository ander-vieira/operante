const winston = require("winston");
var fs = require('fs');
var logsDir = "log/"

if (!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}

global.logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.File({name: 'global', filename: logsDir+'global.log'}),
    new winston.transports.File({name: 'error', filename: logsDir+'error.log', level: 'error'}),
    new winston.transports.Console({level: 'warn'})
  ]
});
