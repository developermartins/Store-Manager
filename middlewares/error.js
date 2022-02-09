module.exports = (err, _req, res, _next) => {

  const INTERNAL_SERVER_ERROR = 500;

  const statusByErrorCode = {
    not_found: 404,
    alreadyExists: 409,
    invalid_data: 422,
  };

  const status = statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR;

  res.status(status).json({ err: { code: err.code, message: err.message } });

};
