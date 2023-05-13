import http from 'node:http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const { HOST_ADDRESS, PORT } = process.env;

const address = HOST_ADDRESS + ':' + PORT;
const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server is running on ${address}`);
  });
}

startServer();
