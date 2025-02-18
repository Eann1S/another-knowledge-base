/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  axios.defaults.baseURL = `http://${host}:${port}/api`;
  // axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.validateStatus = () => true;
};
