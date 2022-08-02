const express = require('express');
const fs = require('fs/promises');
const middlewares = require('./middlewares');

const talkerRouter = express.Router();
talkerRouter.use(express.json());

// requisito 2~
talkerRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);

  const chosenTalker = parsedFile.find((talker) => talker.id === Number(id));
  if (!chosenTalker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(chosenTalker);
});

// requisito 1~
talkerRouter.get('/', async (request, response) => {
  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);

  const getReturn = [];

  parsedFile.forEach((talker) => getReturn.push(talker));

  return response.status(200).json(getReturn);
});

// daqui pra baixo, faz validação dos dados que vem no body~
talkerRouter.use(middlewares.validateToken);
talkerRouter.use(middlewares.validateTalkerName);
talkerRouter.use(middlewares.validateTalkerAge);
talkerRouter.use(middlewares.validateTalkerTalk);
talkerRouter.use(middlewares.validateTalkerRate);
talkerRouter.use(middlewares.validateTalkerWatchedAt);

// requisito 5~
talkerRouter.post('/', 
  async (request, response) => {
  const { name, age, talk } = request.body;
  const { watchedAt, rate } = talk;
  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);
  const nextId = parsedFile.length + 1;

  const newTalker = {
    name,
    age,
    id: nextId,
    talk: { watchedAt, rate },
  };

  const newFileContent = [...parsedFile, newTalker];
  const newFileContentParsed = JSON.stringify(newFileContent);
  await fs.writeFile('talker.json', newFileContentParsed);

  return response.status(201).json(newTalker);
});

module.exports = { talkerRouter };
