var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

router.get('/online', function(req, res) {
  var user = req.session.user;
  var online = req.session.online;

  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }

  if (user.isAdmin) {
    res.render('admin', { title : 'Admins Online',
                          users : online });
  } else {
    res.redirect('/user/online');
  }
});

router.get('/adduser', function(req, res) {
  var user = req.session.user;
  var online = req.session.online;
  var addmessage = req.flash('add') || '';

  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }

  if (user.isAdmin) {
    if(!req.session.cacheddb) {
      req.session.cacheddb = [];
    }
    res.render('newuser', { title : 'Add A New User',
                            returnmessage : addmessage,
                            message : 'Enter the new user\'s data in the form below.',
                            users : req.session.cacheddb });
  } else {
    res.redirect('/user/online');
  }
});

router.post('/newuser', function(req, res) {
  var user = req.session.user;
  var online = req.session.online;

  if (user === undefined && online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    var uid = req.body.uid;
    var priviledge = req.body.priv;
    // Perform the user lookup.
    userlib.addUser(username, password, priviledge, function(error, userdb) {
      req.session.cacheddb = userdb;
      if (error) {
        req.flash('add', 'A user with the name "' + username + '" already exists in the database');
        res.redirect('/admin/adduser');
      } else {
        req.flash('add', 'Sucessfully added new user "' + username + '"" to the database');
        res.redirect('/admin/addUser');
      }
    });
  }
});

module.exports = router;