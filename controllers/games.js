const Game = require('../models/game');
const genres = [
  'Action',
  'RPG',
  'Crime',
  'Family',
  'Fantasy',
  'Horror',
  'Sci',
  'Sport',
  'Thriller'
];

function gamesIndex(req, res, next) {
  Game
    .find()
    .then((games) => res.render('games/index', { games }))
    .catch(next);
}

function gamesNew(req, res) {
  res.render('games/new', { genres });
}

function gamesCreate(req, res, next) {
  req.body.createdBy = req.user._id;

  Game
    .create(req.body)
    .then(() => res.redirect('/games'))
    .catch(next);
}

function gamesShow(req, res, next) {
  Game
    .findById(req.params.id)
    .populate('createdBy comments.user')
    .exec()
    .then((game) => {
      if(!game) return res.status(404).render('statics/404');
      res.render('games/show', { game });
    })
    .catch(next);
}

function gamesEdit(req, res, next) {
  Game
    .findById(req.params.id)
    .then((game) => {
      if(!game) return res.status(404).render('statics/404');
      res.render('games/edit', { game, genres });
    })
    .catch(next);
}

function gamesUpdate(req, res, next) {
  Game
    .findById(req.params.id)
    .then((game) => {
      if(!game) return res.status(404).render('statics/404');

      for(const field in req.body) {
        game[field] = req.body[field];
      }

      return game.save();
    })
    .then((game) => res.redirect(`/games/${game.id}`))
    .catch(next);
}

function gamesDelete(req, res, next) {
  Game
    .findById(req.params.id)
    .then((game) => {
      if(!game) return res.status(404).render('statics/404');
      return game.remove();
    })
    .then(() => res.redirect('/games'))
    .catch(next);
}

module.exports = {
  index: gamesIndex,
  new: gamesNew,
  create: gamesCreate,
  show: gamesShow,
  edit: gamesEdit,
  update: gamesUpdate,
  delete: gamesDelete
};
