const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/users')

router.post('/signup', function(req, res, next){
  User.find({username: req.body.username}).exec().
  then(function(user){
    console.log('one' + user);
    if(user.length >= 1){
      res.status(409).json({
        message: 'user already exist with this email'
      })
    }
    else{
      bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
          res.status(500).json({
            error: err.message
          })
        }
        else{
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hash
          })
          user.save().
          then(function(result){
            console.log(result);
            res.status(200).json({
            message: 'sucessfully created'
          })
          }).
          catch(function(error){
            res.status(400).json({
              error: error.message
            })
          })
        }
      })
    }
  })
})

router.post('/login', function(req, res, next){
  User.find({username: req.body.username}).exec().
  then(function(users){
    if(users.length < 1){
      res.status(404).json({
        message: 'Auth failed'
      })
    }
    bcrypt.compare(req.body.password, users[0].password, function(err, result){
      if(err){res.status(404).json({
        message: 'Auth failed'
      })
    }
    if(result){
      const token = jwt.sign(
        {
          username: users[0].username,
          userid: users[0]._id
        },
        'secret',
        {
          expiresIn: '1h'
        }
      )
      res.status(200).json({
        message: 'Auth Sucessful',
        token :token
      })
    }else{
    res.status(404).json({
      message: 'Auth failed'
    })
  }
    })
  })
})

router.delete('/:userid', function(req, res, next){
  let ID = req.params.userid
  User.remove({_id: ID}).exec().
  then(function(result){
    console.log(result);
    res.status(200).json({message: 'sucessfully deleted'})
  }).
  catch(function(error){
    console.log(error);
    res.status(400).json({
      error: error.message
    })
  })
})

module.exports = router
