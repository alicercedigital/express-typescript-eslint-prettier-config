import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const { createLogger, transports, format } = winston;
const logDirectory = path.resolve('logs');

class ApiLogger {
  static log(
    type: 'info' | 'error' | 'unknownError' | 'dangerousError' | 'unhandled',
    object: Error | object | string | undefined
  ) {
    let directory = logDirectory;
    switch (type) {
      case 'error':
        directory += '/error';
        break;
      case 'unknownError':
        directory += '/error/unknown';
        break;
      case 'dangerousError':
        directory += '/error/dangerous';
        break;
      case 'unhandled':
        directory += '/error/unhandled';
        break;
      default:
        break;
    }

    const winstonOptions = {
      datePattern: 'DD-MM-YYYY',
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhadledException: true,
      zippedArchive: true,
      colorize: true,
      maxFiles: '14d',
      maxSize: '28m',
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
        format.colorize({ all: true }),
        format.timestamp({ format: 'DD/MM/YYYY HH:MM:SS' }),
        format.printf(({ level, message, timestamp, stack }) => {
          return `[INÍCIO - ${timestamp}]\n${level}: ${stack || message || ''}\n[FIM]`;
        })
      ),
    };

    const createLoggerOptions = {
      transports: [
        new transports.Console(winstonOptions),
        new DailyRotateFile({ ...winstonOptions, filename: `${directory}/%DATE%.log` }),
      ],
      exceptionHandlers: [
        new transports.Console(winstonOptions),
        new DailyRotateFile({
          ...winstonOptions,
          filename: `${logDirectory}/error/unhadled/%DATE%.log`,
        }),
      ],
      exitOnError: false,
    };

    let parsedObject = object;

    if (object instanceof Error) {
      parsedObject = object.stack;
    }

    if (type === 'info') {
      return createLogger(createLoggerOptions).info(parsedObject);
    }
    return createLogger(createLoggerOptions).error(parsedObject);
  }
}

export default ApiLogger;
