class errorHandlingUtils {
  static formatError = (error) => {
    if (error.statusCode) {
      return error;
    } else {
      let Internalerror = new Error("Internal Server Error");
      Internalerror.statusCode = 500;
      return Internalerror;
    }
  };

  static throwError = (errorMsg, errorStatusCode) => {
    let error = new Error(errorMsg);
    error.statusCode = errorStatusCode;
    throw error;
  };
}

export default errorHandlingUtils;
