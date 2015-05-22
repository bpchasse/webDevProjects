var http = require('http');
var url  = require('url');

function usage() {
  console.log('node server.js [text|json]');
  process.exit(1);
}

var args = process.argv;
var type = args[2] || 'text';

function textHandler(req, res) {
  res.writeHead(200, { 'Content-Type' : 'text/plain' });
  res.write('hello, world');
  res.end();
}

function jsonHandler(req, res) {
  res.writeHead(200, { 'Content-Type' : 'text/json' });
  var data = { msg: 'hello, world' };
  var json = JSON.stringify(data);
  res.write(json);
  res.end();
}

function csvHandler(req, res) {
  //implementation
  res.writeHead(200, { 'Content-Type' : 'text/csv' });
  var stream = require('fs').createReadStream('user.csv');
  var remainingData = '';
  var lineNum = 0;
  var fields = [];
  var entries = [];
  stream.on('data', function (data) {
    remainingData += data;
    var index = remainingData.indexOf('\n');
    var lastIndex = 0;
    while (index > -1) {
      var line = remainingData.substring(lastIndex, index);
      lastIndex = index + 1;
      var lineArray = line.split(',');
      remainindData = remainingData.substring(lastIndex);
      if(lineNum == 0) {
        lineArray.forEach(function (key, index) {
          fields[index] = key;
        });
      } else {
        var entry = {};
        lineArray.forEach(function (field, index) {
          entry[fields[index]] = field;
        });
        entries.push(entry);
      }
      index = remainingData.indexOf('\n', lastIndex);
      lineNum ++;
    }
  });
  stream.on('end', function (data) {
    var json = JSON.stringify(entries);
    res.write(json);
    res.end();
  });
}

var handlers = {
  text : textHandler,
  json : jsonHandler,
  csv : csvHandler
};

var h = handlers[type];

console.log('Running ' + type + ' service on port 3000');
http.createServer(h).listen(3000);
