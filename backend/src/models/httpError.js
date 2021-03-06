class HttpError extends Error {
  constructor(title, code) {
    super(title);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
    this.name = title;
    this.code = code;
  }
}

module.exports = HttpError;
