const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { talkerRouter } = require('./talkerRouter');
const middlewares = require('./middlewares');
const { errorMiddleware } = require('./errorMiddleware');
const generateToken = require('./generateToken');
const swaggerDocument = require('./swagger-output.json');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// iniciando rota talker~
app.use('/talker', talkerRouter);

app.post('/login',
  middlewares.validateLoginEmail,
  middlewares.validateLoginPassword,
  (request, response) => {
  // const { email, password } = request.body;
  const randomToken = generateToken();
  return response.status(200).json({ token: `${randomToken}` });
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
