const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, json } = format;

const logger = createLogger({
    transports:[
        new transports.File({
            filename: 'activity.log',
            level: 'info',
            format:format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss'}),
                format.json())
        }),
       new transports.File({
           filename:'error.log',
           level: 'error',
           format:format.combine(
            format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss'}),
            format.json())
       })
        
    ]
});

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    });
  
    return createLogger({
      format: combine(
        format.colorize(),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
      ),
      transports: [new transports.Console()],
    });
  }
  
  function buildProdLogger() {
    return createLogger({
      format: combine(timestamp(), errors({ stack: true }), json()),
      defaultMeta: { service: 'user-service' },
      transports: [new transports.Console()],
    });
  }

module.exports = logger;
module.exports = {logger,buildDevLogger,buildProdLogger};
