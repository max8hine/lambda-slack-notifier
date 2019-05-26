const createError = (name = "Error") => {
  const err = (message = "Something went wrong.") => {
    this.name = name;
    this.message = message;
  };
  err.prototype = new Error();
  return err;
};

module.exports = createError;
