const {buildDevLogger,buildProdLogger} = require('./Logger')

let logger = null;

if (process.env.NODE_ENV === 'development') {
  
    logger = buildDevLogger();
} 
else 
{
  logger = buildProdLogger();
}


module.exports = logger;