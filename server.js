import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgon from 'morgan';
import cors from 'cors';

import { config } from './config';
import Game from './app/models/games';
import {
  getGames,
  getGame,
  postGame,
  deleteGame
} from './app/routes/games';
import { signup, login, verifyAuth } from './app/routes/user';

const app = express();
const port = process.env.PORT || 3000;

// Connecting to MongoDB through mongoose
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}
mongoose.Promise = global.Promise;
mongoose.connect(config.DB_CONNECTION, options);

// On Connection
mongoose.connection.on("connected", () => {console.log("Connected to DB")});
// err Connection
mongoose.connection.on("err", (err) => {console.log(err)});


// Adding body-parser and morgon middleware to app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgon('dev')); // for log

// location of Static files
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS
app.use(cors());

// Authentication routes
app.post('/auth/login', login);
app.post('/auth/signup', signup);

// API routes
app.route('/games')
  // create a game
  .post(verifyAuth, postGame)
  // get all the games
  .get(getGames)
app.route('/games/:id')
  // get a single game
  .get(getGame)
  // delete a single game
  .delete(verifyAuth, deleteGame)

// for all other request redirect to index page
app.get('*', (req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname })
})

// Listen to PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
