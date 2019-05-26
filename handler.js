"use strict";
const axios = require("axios");
const createError = require("./helpers/error");
const notifierError = createError("Slack Notifier");

const responseDefault = {
  statusCode: 200,
  body: JSON.stringify({ message: "Success!" }, null, 2)
};

module.exports.notifier = async event => {
  try {
    const { notifierUrl } = process.env;
    await axios.post(notifierUrl, { text: event.body });
    return responseDefault;
  } catch (error) {
    if (error.response) {
      const { status, statusText } = error.response;
      throw notifierError(`${error.status} ${error.statusText}`);
    }
    throw notifierError(error.message && error.message);
  }
};

module.exports.test = async event => {
  try {
    const err = new Error("Oops!");
    await axios.post(
      "http://localhost:8000/error",
      JSON.stringify(err, null, 4)
    );
    return responseDefault;
  } catch (error) {
    if (error.response) {
      const { status, statusText } = error.response;
      throw notifierError(`${error.status} ${error.statusText}`);
    }
    throw notifierError(error.message && error.message);
  }
};
