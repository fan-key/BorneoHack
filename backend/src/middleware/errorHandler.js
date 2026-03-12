const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    code: 'SERVER_ERROR',
    message: err.message || 'Sesuatu telah berlaku. Sila cuba lagi.'
  });
};

module.exports = errorHandler;