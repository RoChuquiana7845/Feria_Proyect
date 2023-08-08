const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).send(
      error.errors.map((error) => {
        error.message;
      })
    );
  }
};

export default validateSchema;
