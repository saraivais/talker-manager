const dateValidation = require('../helpers/dateValidation');

function validateLoginPassword(request, _response, next) {
  const { password } = request.body;
  const error = { status: 400 };

  if (!password) {
    error.message = 'O campo "password" é obrigatório';
    return next(error);
  }
  if (password.length < 6) {
    error.message = 'O "password" deve ter pelo menos 6 caracteres';
    return next(error);
  }

  return next();
}

function validateLoginEmail(request, _response, next) {
  const { email } = request.body;
  const error = { status: 400 };

  if (!email) {
    error.message = 'O campo "email" é obrigatório';
    return next(error);
  }

  const validateEmail = /\S+@\S+\.\S+/;
  if (!validateEmail.test(email)) {
    error.message = 'O "email" deve ter o formato "email@email.com"';
    return next(error);
  }

  return next();
}

function validateToken(request, _response, next) {
  const { authorization } = request.headers;
  const error = { status: 401 };

  if (!authorization) {
    error.message = 'Token não encontrado';
    return next(error);
  }
  
  if (authorization.length !== 16) {
    error.message = 'Token inválido';
    return next(error);
  }

  return next();
}

function validateTalkerName(request, _response, next) {
  const { name } = request.body;
  const error = { status: 400 };

  if (!name) {
    error.message = 'O campo "name" é obrigatório';
    return next(error);
  }

  if (name.length < 3) {
    error.message = 'O "name" deve ter pelo menos 3 caracteres';
    return next(error);
  }

  return next();
}

function validateTalkerAge(request, _response, next) {
  const { age } = request.body;
  const error = { status: 400 };

  if (!age) {
    error.message = 'O campo "age" é obrigatório';
    return next(error);
  }

  if (Number(age) < 18) {
    error.message = 'A pessoa palestrante deve ser maior de idade';
    return next(error);
  }

  return next();
}

function validateTalkerTalk(request, _response, next) {
  const { talk } = request.body;
  const error = { status: 400 };
  if (!talk) {
    error.message = 'O campo "talk" é obrigatório';
    return next(error);
  }

  return next();
}

function validateTalkerRate(request, _response, next) {
  const { talk } = request.body;
  const { rate } = talk;
  const error = { status: 400 };

  if (rate !== 0 && !rate) {
    error.message = 'O campo "rate" é obrigatório';
    return next(error);
  }

  if (Number(rate) > 5 || Number(rate) < 1) {
    error.message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return next(error);
  }
  
  return next();
}

function validateDate(dateString) {
  const splitDate = dateString.split('/');
  return dateValidation(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2]));
}

function validateTalkerWatchedAt(request, _response, next) {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const error = { status: 400 };

  if (!watchedAt) {
    error.message = 'O campo "watchedAt" é obrigatório';
    return next(error);
  }

  if (!validateDate(watchedAt)) {
    error.message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return next(error);
  }

  return next();
}

module.exports = { 
  validateLoginPassword,
  validateLoginEmail,
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerRate,
  validateTalkerWatchedAt,
};