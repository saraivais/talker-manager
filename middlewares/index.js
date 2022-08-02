function validateLoginPassword(request, response, next) {
  const { password } = request.body;
  const error = { status: 400 };

  if (!password) {
    error.message = 'O campo "password" é obrigatório';
    next(error);
  }
  if (password.length < 6) {
    error.message = 'O "password" deve ter pelo menos 6 caracteres';
    next(error);
  }

  next();
}

function validateLoginEmail(request, response, next) {
  const { email } = request.body;
  const error = { status: 400 };

  if (!email) {
    error.message = 'O campo "email" é obrigatório';
    next(error);
  }

  const validateEmail = /\S+@\S+\.\S+/;
  if (!validateEmail.test(email)) {
    error.message = 'O "email" deve ter o formato "email@email.com"';
    next(error);
  }

  next();
}

module.exports = { 
  validateLoginPassword,
  validateLoginEmail,
};