const express = require('express');
const fs = require('fs/promises');
const middlewares = require('./middlewares');

const talkerRouter = express.Router();
talkerRouter.use(express.json());

const talkerJsonFile = 'talker.json';

// requisito 8~ adiciona o middleware do token
talkerRouter.get('/search', middlewares.validateToken, async (request, response) => {
  const { q } = request.query;
  const searchRegex = new RegExp(q);
  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);

  const filteredFile = parsedFile.filter(({ name }) => searchRegex.test(name));

  return response.status(200).json(filteredFile);

});

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
  const talkerFile = await fs.readFile(talkerJsonFile);
  const parsedFile = await JSON.parse(talkerFile);

  const getReturn = [];

  parsedFile.forEach((talker) => getReturn.push(talker));

  return response.status(200).json(getReturn);
});

// daqui pra baixo, faz validação dos dados que vem no body~
talkerRouter.use(middlewares.validateToken);

// requisito 7~
talkerRouter.delete('/:id', async (request, response) => {
  const talkerFile = await fs.readFile(talkerJsonFile);
  const parsedFile = await JSON.parse(talkerFile);

  const { id } = request.params;

  const newTalkerArray = parsedFile.filter((talker) => talker.id !== Number(id));
  const newTalkerContent = JSON.stringify(newTalkerArray);
  await fs.writeFile(talkerJsonFile, newTalkerContent);
  return response.status(204).end();
});

talkerRouter.use(middlewares.validateTalkerName);
talkerRouter.use(middlewares.validateTalkerAge);
talkerRouter.use(middlewares.validateTalkerTalk);
talkerRouter.use(middlewares.validateTalkerRate);
talkerRouter.use(middlewares.validateTalkerWatchedAt);

// requisito 6~
talkerRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;

  const talkerFile = await fs.readFile(talkerJsonFile);
  const parsedFile = await JSON.parse(talkerFile);

  const editedTalker = { name, age, id: Number(id), talk };
  const newTalkerArray = parsedFile.map((talker) => {
    if (talker.id === Number(id)) {
      return editedTalker;
    }
    return talker;
  });

  const newTalkerContent = JSON.stringify(newTalkerArray);
  // console.log(newTalkerContent);
  await fs.writeFile(talkerJsonFile, newTalkerContent);
  return response.status(200).json(editedTalker);
});

// requisito 5~
talkerRouter.post('/', 
  async (request, response) => {
  const { name, age, talk } = request.body;
  const { watchedAt, rate } = talk;
  const talkerFile = await fs.readFile(talkerJsonFile);
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
  await fs.writeFile(talkerJsonFile, newFileContentParsed);

  return response.status(201).json(newTalker);
});

module.exports = { talkerRouter };
