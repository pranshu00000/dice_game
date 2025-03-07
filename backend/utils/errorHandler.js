const errorHandler = (res, error, statusCode = 400) => {
    console.error(error);
    return res.status(statusCode).json({ error: error.message || 'An error occurred' });
  };
  
  module.exports = errorHandler;