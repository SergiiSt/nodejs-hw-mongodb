const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: ` 404 ${req.url} not found`,
  });
};

export default notFoundHandler;
