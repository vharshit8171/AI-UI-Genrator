// This middleware validates incoming requests against a provided Zod schema. It checks the request body, params, and query against the schema and returns a 400 error if validation fails.

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    next();
  } catch (err) {
    console.log("validation",err)
    return res.status(400).json({
      success: false,
      errors: err.issues[0].message
    });
  }
};