/* eslint-disable */

module.exports = async function () {
  if (globalThis.__SERVER_PROCESS__) {
    globalThis.__SERVER_PROCESS__.kill();
  }

  const dbContainer = globalThis.__DB_CONTAINER__;
  await dbContainer.stop();
};
