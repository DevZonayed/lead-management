function errorMessageExtractor(err) {
  let error = err.response?.data.message || err.message;
  return error;
}

export default errorMessageExtractor;
