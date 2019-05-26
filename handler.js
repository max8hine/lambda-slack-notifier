"use strict";
const axios = require("axios");
const createError = require("./helpers/error");
// const notifierError = createError("Slack Notifier");

const resSuccessDefault = {
  statusCode: 200,
  body: JSON.stringify({ message: "Success!" }, null, 2)
};

const resErrorDefault = error => ({
  statusCode: 501,
  body: JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
});

module.exports.notifier = async event => {
  try {
    const { notifierUrl } = process.env;
    await axios.post(notifierUrl, { text: event.body });
    return resSuccessDefault;
  } catch (error) {
    return resErrorDefault(error);
  }
};

module.exports.test = async event => {
  try {
    const err = new Error("*** function went wrong");
    await axios.post(
      "http://localhost:8000/notifier",
      JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
    );
    return resSuccessDefault;
  } catch (error) {
    return resErrorDefault(error);
  }
};
