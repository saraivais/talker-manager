const express = require('express');
const fs = require('fs/promises');

const talkerRouter = express.Router();

talkerRouter.get('/', async (request, response) => {
  const talkerFile = await fs.readFile('talker.json');
  const parsedFile = await JSON.parse(talkerFile);

  const getReturn = [];

  parsedFile.forEach((talker) => getReturn.push(talker));

  return response.status(200).json(getReturn);
});


module.exports = { talkerRouter };
