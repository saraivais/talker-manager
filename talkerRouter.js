const express = require('express');
const fs = require('fs/promises');

const talkerRouter = express.Router();
talkerRouter.use(express.json());

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

talkerRouter.get('/', async (request, response) => {
  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);

  const getReturn = [];

  parsedFile.forEach((talker) => getReturn.push(talker));

  return response.status(200).json(getReturn);
});

module.exports = { talkerRouter };
