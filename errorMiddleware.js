function errorMiddleware(error, _request, response, _next) {
  if (error.status) {
    return response.status(error.status).json({ message: `${error.message}` });
  }
}

module.exports = { errorMiddleware };
