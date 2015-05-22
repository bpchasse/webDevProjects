// # User Library

// ## User Objects
function User(username, password, uid, priviledge) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  // Added User priviledge
  this.priviledge = priviledge;
  this.isAdmin = (priviledge === 'admin') ? true : false;
}



// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1, 'normal'),
  new User('hazel', 'lezah', 2, 'normal'),
  new User('caleb', 'belac', 3, 'normal'),
  new User('admin', 'admin', 0, 'admin')
];


//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

exports.addUser = function(username, password, priviledge, cb) {
  for (var i = 0; i < userdb.length; i++) {
    var u = userdb[i];
    if(u.username === username) {
      cb(true)
      return;
    }
  }
  var newUser = new User(username, password, userdb.length, priviledge);
  userdb[userdb.length] = newUser;
  cb(false);
};

