class ValidationError extends Error {
  constructor(title, details, code) {
    super(title);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
    this.name = title;
    this.code = code;
    this.details = details;
  }
}

module.exports = ValidationError;
