const express = require('express');
const bodyParser = require('body-parser');
const { talkerRouter } = require('./talkerRouter');
const middlewares = require('./middlewares');
const { errorMiddleware } = require('./errorMiddleware');
const generateToken = require('./generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
