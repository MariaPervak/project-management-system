const jwt = require("jsonwebtoken");
const {
  ForbiddenError
} = require('apollo-server-express');
const JWT_SECRET='JWT_SECRET';

const getUser = token => {
  if (token) {
    try {
      let rawToken = token;
      if (token.includes("Bearer")) {
        rawToken = token.split(" ")[1].trim();
      }
      return jwt.verify(rawToken, JWT_SECRET);
    } catch (err) {
      throw new ForbiddenError('Доступ запрещен');
    }
  } else {
    throw new ForbiddenError('Доступ запрещен');
  }
};

module.exports = {getUser}