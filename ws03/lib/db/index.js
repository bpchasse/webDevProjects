var pg = require('pg');

var cstr = 'postgres://student:student@localhost/users';

/**
 * This function adds a user to the database.
 */
function add(user, cb) {
	var client = new pg.Client(cstr);
	client.connect(function(err) {
  		if(err) {
    		return console.log('could not connect to postgres', err);
  		}
  		cb(user, client);
  	});
}

/**
 * This function returns a list of all users in the database.
 */
function list(cb) {
	var client = new pg.Client(cstr);
	client.connect(function(err) {
  		if(err) {
    		return console.log('could not connect to postgres', err);
  		}
  		cb(client);
  	});
}

module.exports = {
  add     : add,
  list    : list
};
