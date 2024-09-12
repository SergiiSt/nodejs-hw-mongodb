// const errorHandler = (error, req, res, next) => {
//   const { status = 500, message = 'Something went wrong' } = error;
//   res.status(status).json({ message });
// };

// export default errorHandler;

import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).send({
    message: 'Something went wrong',
    error: err.message,
  });
};
export default errorHandler;
