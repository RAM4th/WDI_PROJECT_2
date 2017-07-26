const Game = require('../models/game');

function commentsCreate(req, res) {
  Game
  .findById(req.params.id)
  .exec()
  .then(game => {
    req.body.user = req.user._id;

    game.comments.push(req.body);
    game.save();

    res.redirect(`/games/${game._id}`);
  });
}

function commentsDelete(req, res) {
  Game
  .findById(req.params.gameId)
  .exec()
  .then(game => {
    const comment = game.comments.id(req.params.commentId);
    comment.remove();
    game.save();

    res.redirect(`/games/${game._id}`);
  });
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};
