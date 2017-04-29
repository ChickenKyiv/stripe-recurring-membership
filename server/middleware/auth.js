'use strict';

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }

  res.redirect(req.redirect.auth);
};

function isUnauthenticated (req, res, next) {
  if (!req.isAuthenticated()){
    return next();
  }

  res.redirect(req.redirect.auth);
};

function adminRequired(req, res, next) {
  const errorMessage = 'You do not have permission to do that.';
  if (!req.user) {
    throw new Error(errorMessage);
  } else {
    return userQueries.getUserByEmail(req.user.email)
    .then((user) => {
      if (!user) {
        throw new Error(errorMessage);
      }
      if (!user.admin) {
        throw new Error(errorMessage);
      }
      return next();
    })
    .catch((err) => {
      return next(errorMessage); });
  }
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  isAuthenticated,
  isUnauthenticated,
  adminRequired,
  comparePass
};