// This middleware validates incoming requests against a provided Zod schema. It checks the request body, params, and query against the schema and returns a 400 error if validation fails.
import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = err.issues.map((issue) => ({
        field: issue.path[1],
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: formattedErrors[0]?.message || "Validation failed",
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Validation middleware failed",
      errors: [],
    });
  }
};