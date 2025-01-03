const jwt = require("jsonwebtoken");
const {
  ForbiddenError
} = require('apollo-server-express');
const JWT_SECRET='JWT_SECRET';

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new ForbiddenError('Доступ запрещен');
    }
  } else {
    throw new ForbiddenError('Доступ запрещен');
  }
};

module.exports = {getUser}