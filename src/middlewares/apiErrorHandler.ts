import { Request, Response, NextFunction } from 'express';
import ApiLogger from '../core/ApiLogger';
import ApiError from '../core/ApiError';

const apiErrorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let errorProperties;

    let logType: 'error' | 'unknownError' | 'dangerousError' = 'error';

    if (err instanceof ApiError) {
      errorProperties = {
        responseStatusCode: err.responseStatusCode,
        responseMessage: err.responseMessage,
        data: err.data,
        dangerousError: err.dangerousError,
        dontRegisterLog: err.dontRegisterLog,
        requestIp: req.ip,
        stack: err.stack,
      };
    } else {
      errorProperties = {
        responseStatusCode: 500,
        responseMessage: 'Algum erro desconhecido ocorreu. Informe o suporte caso o erro persista.',
        requestIp: req.ip,
        stack: err.stack,
      };
    }

    if (errorProperties.dangerousError) {
      logType = 'dangerousError';
    }

    if (!errorProperties.dontRegisterLog) {
      ApiLogger.log(logType, errorProperties);
    }

    return res
      .status(errorProperties.responseStatusCode)
      .json({ message: errorProperties.responseMessage, data: errorProperties.data });
  } catch (error) {
    ApiLogger.log('dangerousError', error.stack);
    return res
      .status(500)
      .send(
        'Um erro ocorreu ao tentar registrar o log de outro erro. Informe ao suporte para ser analisado.'
      );
  }
};

export default apiErrorHandler;
