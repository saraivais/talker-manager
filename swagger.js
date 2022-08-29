const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Talker Manager API',
    description: 'Talker Manager is a CRUD API to manage information about Talkers. The API works through endpoints and uses the fs Node.js module to write and read files.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);