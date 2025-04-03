const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(), // Add colors to log levels for console output
    logFormat
  ),
  transports: [
    // Console transport for development
    new transports.Console(),
    // File transport for error logs
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    // File transport for all logs
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

module.exports = logger;