// Require the express library:
var express = require('express');

// Require our database library:
var db = require('db');

var hlp = require('./lib/db/index.js');
// Create an app:
var app = express();
var html = '<table style="width:100%"><tr>' +
					'<th>UID</th>' +
					"<th>FirstName</th>" +
					"<th>LastName</th>" +
					"<th>Password</th>" +
					"<th>Age</th>" +
				"</tr>";

//Dynamically makes a string representing html
function populateTable(results) {
	for (var i = 0; i < results.rows.length; i ++) {
		var row = results.rows[i];
		html += "<tr>" +
					"<td>" + row.uid + "</td>" +
					"<td>" + row.fname + "</td>" +
					"<td>" + row.lname + "</td>" +
					"<td>" + row.password + "</td>" +
					"<td>" + row.age + "</td>" +
					"</tr>";
	}
	html += "</table><br><br>";
}

// A route to list all users and provide a form to add more.
app.get('/users', function (req, res) {
	//Callback sent to index.list to compelte once commected
	var list_records = function (client) {
		var query = client.query("SELECT * FROM users ORDER BY uid;", function(err, result) {
      		if(err) {
        		console.log(err);
      		} else {
	      		html = '<table width=100%><tr>' +
						"<td>UID</td>" +
						"<td>FirstName</td>" +
						"<td>LastName</td>" +
						"<td>Password</td>" +
						"<td>Age</td>" +
					"</tr>";
	      		populateTable(result);
	      		res.send(html  + '<form style="display:block" action="/users/add" method="get">' +
	      			'<p><strong>Please Add a New User</strong></p>' +
					'UID:<br> <input type="text" name="uid"><br><br>' +
					'First Name:<br> <input type="text" name="fname"><br><br>' +
					'Last Name:<br> <input type="text" name="lname"><br><br>' +
					'Password:<br> <input type="text" name="password"><br><br>' +
					'Age:<br> <input type="text" name="age"><br><br>' +					'<input type="submit" value="Add User">' +
					'</form><br><br>')
      		//Disconnect from the client once we are finished
      		client.end();
      		}
      	});
	}
	hlp.list(list_records);
});

app.get('/users/add', function (req, res) {
	var values = ["uid", "fname", "lname", "password", "age"],
		//Make sure all of the fields have a value
		checkValues = function() {
			if (req.query != undefined) {
				for(var i = 0; i < values.length; i++) {
					if (req.query[values[i]] === "") {
						return false;
					}
				}
				return true;
			} else {
				return false;
			}
		},
		//Callback which will add a user object to a given database client
		insert_record = function(user, client) {
			client.query("INSERT INTO users(uid, fname, lname, password, age) values ($1, $2, $3, $4, $5)",
				[user.uid, user.fname, user.lname, user.password, user.age],
				function(err, result) {
	                if (err) {
	                    console.log(err);
	                } else {
	                	//Disconnect from the client once we are finished
	                    client.end();
	                    res.redirect('/users');
	                }
            	}
           	);
		};

	if (checkValues()) {
		//Make an object with all of the user data in it
		var user = {
			uid: req.query.uid,
			fname: req.query.fname,
			lname: req.query.lname,
			password: req.query.password,
			age: req.query.age
		};
		hlp.add(user, insert_record);
		//Update the page
		//res.redirect('/users');
	} else {
		//Just clear the input boxes by refreshing the page (table won't change since nothing got added to the table)
		res.redirect('/users');
	}
});

// Start the server:
var server = app.listen(3000, function () {
	console.log('Listening on port %d', server.address().port);
});
