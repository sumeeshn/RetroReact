import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/users';
import {config} from '../../config';

// creating a payload
const createToken = name => {
  let payload = {
    sub: name,
    exp: moment().add(1, 'day').unix()
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
};

// sign up function
const signup = (req, res) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if(existingUser) {
      // HTTP 409 is sent if the email is already taken
      return res.status(409).json({ message: 'email already taken' });
    }

    const newUser = Object.assign(new User(), req.body);
    newUser.save((err, result) => {
      if(err) {
        res.send(err);
      }
      res.json({
        message: 'Welcome to Retrogames, you are now logged in',
        token: createToken(result.name)
      });
    });
  });
};

// login function
const login = (req, res) => {
  User.findOne({ email: req.body.email }, '+password', (err, user) => {
    if(!user) {
      // HTTP 401 is sent if no user with provided email
      return res.status(401).json({ message: 'Invalid Email' });
    }
    // if user exists check password match
    user.comparePwd(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
      }
      return res.json({ message: 'You are now logged in', token: createToken(user.name) });
    });
  });
};

// middleware to protect post, delete operations
const verifyAuth = (req, res, next) => {
  // token from request header
  const token = req.headers['x-token-access'];
  if(token) {
    // verifies the token
    jwt.verify(token, config.TOKEN_SECRET, (err, payload) => {
      // 403 is sent if fails
      if(err) {
        return res.status(403).send({ message: 'Failed to authenticate token.' });
      } else {
        // move on to next route
        next();
      }
    });
  } else {
    // No Token
    return res.status(403).send({ message: 'No Token provided' });
  }
}

export {
  signup,
  login,
  verifyAuth
};
