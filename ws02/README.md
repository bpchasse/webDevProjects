**Brenton Chasse**
==================
**26698633**
============

##About my solution

>Server: Used a read stream to read each line of the file, one line at a time. I assumed the first line of the file would be csv formated with the key values for the user fields that would follow. Thus, when the first line is read, then the key values are placed into an array (array of possible user fields). For every line after the first, an object with key-value pairs for each value of each field of the line and each field key retrieved from the first line (associated with that given field value). Once an object is made, it is pushed onto an array of all users. Once all lines of the file have been read, and the 'end' signal is received from the readableStream, then the array of user objects is stringified and written out.

>Client: Data recieved is a stringified array of objects. This array of objects is parsed out using JSON.parse. Then for each user in the array, all of the keys are found, then for each key in the user, the associated key-value pair is logged to the console.


##Difficulties

>I found the difficult part of this workshop to be finding a clean/efficient method of extending the HTTP server to allow it to handle csv files. I pondered with asynchronous methods of doing so before determing there was little point in doing so for this particular workshop.

##Pleasures

>I found the easiest part of this workshop to be forming the client side handler.

##Instructions
Step 1:
-In one terminal-

>node http-server.js csv

Step 2:
-In ANOTHER terminal-

>node http-client.js csvUser

                    or

>node http-client.js jsonUser
