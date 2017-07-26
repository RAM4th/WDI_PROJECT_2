const router        = require('express').Router();

const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const games         = require('../controllers/games');
const users         = require('../controllers/users');
const comments      = require('../controllers/comments');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to view this content');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
  .get(statics.index);

router.route('/games')
  .get(games.index)
  .post(secureRoute, games.create);

router.route('/games/new')
  .get(secureRoute, games.new);

router.route('/games/:id')
  .get(games.show)
  .post(secureRoute, comments.create)
  .put(secureRoute, games.update)
  .delete(secureRoute, games.delete);

router.route('/games/:id/edit')
  .get(games.edit);

router.route('/games/:filmId/comments/:commentId')
  .delete(comments.delete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.show);

module.exports = router;
