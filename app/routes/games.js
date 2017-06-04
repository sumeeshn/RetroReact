import Game from '../models/games';

// Get all games sorted by postDate
const getGames = (req, res) => {
  Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
    if(err) {
      res.send(err);
    }
    res.json(games);
  });
}

// Get a single game with id
const getGame = (req, res) => {
  const { id } = req.params; // equivalent to id = req.params.id
  Game.findById(id, (err, game) => {
    if(err) {
      res.send(err);
    }
    res.json(game);
  });
};

// Get the body data and create a new game
const postGame = (req, res) => {
  let game = Object.assign(new Game(), req.body);
  // save to db
  game.save(err => {
    if(err) {
      res.send(err);
    }
    res.json({ message: 'game created' });
  });
};

// Delete a game by ID
const deleteGame = (req, res) => {
  let query = {_id: req.params.id}
  Game.remove(query, (err) => {
    if(err) {
      res.send(err);
    }
    res.json({ message: 'game deleted' });
  });
};

// exporting all the variables

export { getGame, getGames, postGame, deleteGame };
