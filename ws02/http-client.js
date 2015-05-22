var url  = require('url');
var http = require('http');

function usage() {
  console.log('node client.js [text|json] [url]');
  process.exit(1);
}

function isURL(str) {
  if (!str)
    return undefined;  
  var u = url.parse(str);
  if (u.protocol !== null)
    return str;
  else
    return undefined;
}

function checkType(type) {
  if (!type) return undefined
  else if (type === 'text' ||
	   type === 'json' ||
     type === 'csvUser' ||
     type === 'jsonUser')
    return type;
}

function checkURL(str) {
  if (!str) return undefined
  else {
    var u = url.parse(str);
    if (u.protocol !== null)
      return u;
    else
      return undefined;
  }
}

var args = process.argv;
var type = checkType(args[2]) || 'text';
var url  = checkURL(args[3])  || url.parse('http://localhost:3000');

console.log(type);
console.log(url);

// This function is used to receive data being received from the
// server's response. The provided callback has a single argument that
// is passed a string of the received data.
function receive(res, callback) {
  var str = '';

  // When data is received we append to string.
  res.on('data', function (chunk) {
    str += chunk;
  });

  // When the connection is closed, we invoke our callback.
  res.on('end', function () {
    callback(str);
  });  
}

function textHandler(res) {
  receive(res, function (data) {
    console.log('received text: ' + data);
  });
}

function jsonHandler(res) {
  receive(res, function (data) {
    var obj = JSON.parse(data);
    console.log('received json message: ' + obj.msg);
  });
}

function jsonUserHandler(res) {
  receive(res, function (data) {
    iterateUsersAndKeys(data, function (user, userIndex, key, keyIndex, logFn) {
      (keyIndex === 0) && logFn('\n');
      logFn(key + ': ' + user[key] + '\n');
    });
  });
}

function csvUserHandler(res) {
  receive(res, function(data) {
    iterateUsersAndKeys(data, function (user, userIndex, key, keyIndex, logFn) {
        if (userIndex === 0)
          (keyIndex === 0) ? logFn('\n' + key) : logFn(', ' + key);
        else
          (keyIndex === 0) ? logFn('\n' + user[key]) : logFn(', ' + user[key]);
    });
    process.stdout.write('\n');
  });
}

function iterateUsersAndKeys(data, workerFunction) {
  var users = JSON.parse(data),
      keys = [],
      log = function (s) { process.stdout.write(s); };
  log('received message:');
  users.forEach(function (user, userIndex) {
    keys=Object.keys(user);
    keys.forEach(function (key, keyIndex) {
      workerFunction(user, userIndex, key, keyIndex, log);
    });
  });
}

var handlers = {
  text : textHandler,
  json : jsonHandler,
  jsonUser : jsonUserHandler,
  csvUser : csvUserHandler
};

var options = {
  host: url.hostname,
  path: url.path,
  port: url.port || 80,
  method: 'GET'
};

var h   = handlers[type];
var req = http.request(options, h);
req.end();
