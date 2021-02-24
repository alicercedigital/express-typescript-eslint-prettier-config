interface IApiError {
  responseMessage: string;
  responseStatusCode: number;
  data?: object;
  dontRegisterLog?: boolean;
  dangerousError?: boolean;
  name?: string;
  message?: string;
  stack?: string;
}

class ApiError extends Error {
  public responseMessage: string;

  public responseStatusCode: number;

  public data?: object;

  public dontRegisterLog?: boolean;

  public dangerousError?: boolean;

  constructor(apiError: IApiError) {
    super();
    this.responseMessage = apiError.responseMessage;
    this.responseStatusCode = apiError.responseStatusCode;
    this.data = apiError.data;
    this.dangerousError = apiError.dangerousError;
    this.dontRegisterLog = apiError.dontRegisterLog;
    this.name = apiError.name || '';
    this.message = apiError.message || '';
    this.stack = apiError.stack || '';
  }
}

export default ApiError;
