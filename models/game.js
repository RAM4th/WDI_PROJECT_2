const User = require('../models/user');
const Game = require('../models/game');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Game
        .find({ createdBy: user._id })
        .exec()
        .then(games => {
          res.render('users/show', { user, games });
        });
    });
}

module.exports = {
  show: usersShow
};
