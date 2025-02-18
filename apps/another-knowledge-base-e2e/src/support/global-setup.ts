import { spawn } from 'child_process';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  const dbContainerStartup = async () => {
    console.log('\nStarting database container...\n');
    const dbContainer = await new PostgreSqlContainer(
      'postgres:alpine'
    ).start();

    process.env.DATABASE_URL = dbContainer.getConnectionUri();
    process.env.POSTGRES_USER = dbContainer.getUsername();
    process.env.POSTGRES_PASSWORD = dbContainer.getPassword();
    process.env.POSTGRES_DB = dbContainer.getDatabase();
    process.env.DATABASE_HOST = dbContainer.getHost();
    process.env.DATABASE_PORT = dbContainer.getFirstMappedPort().toString();

    console.log('\nDatabase container started\n');
    return dbContainer;
  };

  const serverStartup = () => {
    console.log('\nStarting server...\n');
    const server = spawn('nx', ['serve', 'another-knowledge-base'], {
      shell: true,
      stdio: 'pipe',
    });
    console.log('\nServer started\n');

    server.stdout.on('data', (data) => {
      console.log(`Server Output: ${data}`);
    });

    server.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });
    return server;
  };

  const dbContainer = await dbContainerStartup();
  const server = serverStartup();

  globalThis.__DB_CONTAINER__ = dbContainer;
  globalThis.__SERVER_PROCESS__ = server;

  await new Promise((resolve) => setTimeout(resolve, 2000));
};
