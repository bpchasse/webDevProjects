# Workshop: Admins and Adding Users!

## Overview

This workshop will exercise your understanding of using express,
server-side templates, and sessions. You will extend the session
example covered in class with additional support for adding users from
the application. We will use the in-memory "database" as provided by
the class example, however, you are encouraged to use a real database
to exercise your understanding.

## Prerequisite Knowledge

In order to complete this workshop successfully you will need to
understand the following topics:

* Sessions and cookies
* Routes
* Server-side templates
* Client-side JavaScript
* Document Object Model
* Browser events
* Understanding of HTTP

## Part 1: Grab the Code!

First, download the [workshop starter kit] and extract it inside your
course git repository (do not clone this repository). This will create
a folder named `ws-client-users-master`. Do not rename this folder.
Next, commit this to your repository:

```bash
$ git add .
$ git commit -am 'first ws-client-users commit'
$ git push
```

[workshop starter kit]: https://github.com/umass-cs-326/ws-client-users/archive/master.zip

## Part 2: Admin Authentication

You need to first extend the application to include *administration*
support. In particular, you need to first extend the model we are
using to represent users on the system. This is contained in the
[lib/user/user.js] file. You need to add an additional field to the
`User` object that indicates if a user is an "admin" or a "normal"
user. It may also be helpful to add a method to the `User` object such
as `isAdmin` that will return true if the user is an admin. Now, add a
new user called "admin" that has administrative privileges.

[lib/user/user.js]: lib/user/user.js

## Part 3: Admin View

Next, you want to add an admin view that will display the list of the
administrators on the system. You can simply copy the
[views/online.ejs] file and customize to displaying administrators
only. Call this new view `admin.ejs`. You will provide the routes in
the next part.

[views/online.ejs]: views/online.ejs

## Part 4: Admin Routes

To allow administrative access to your admin view you need to create a
new route space for admins. Create a new routes file called `admin.js`
inside the `routes ` directory by copying the existing
[routes/users.js] file. You should then remove all the existing routes
and add a new route that will render the admin view from Part 3. You
should only display the admins in your view if the user accessing the
view is indeed an admin. In addition, you need to make sure that a
user is indeed logged in and redirect to the login if that is not the
case. You will need to use sessions to check if the user has logged in
previously and is online. You should consult [routes/users.js] to see
how we do this for regular users.

[routes/users.js]: routes/users.js

## Part 5: Adding New Users

After you have verified that everything is working in Part 4 you
should implement a new view that allows new users to be created. This
new view should have a
[form](http://www.w3schools.com/html/html_forms.asp) that allows you
to enter in the name and password of a new user and if the new user is
an admin. Access to this view is restricted to admin users only. If
the user is not logged in and not online then the request should be
redirected to login. If they are logged in then a check needs to be
made to make sure they are an admin.

The form should have a method of POST and have an action of
`/admin/newuser`. This will direct the submission of the form to a new
route that you need to create in the admin routes you created in
Part 4. The new route will perform the checking on the user as
mentioned in the previous paragraph. You will need to create a new
function in the [lib/user/user.js] that will allow you to add a new
user. This function should return the new user added or undefined if a
user already exists with that name. If the user already exists you
will need to redirect back to the new user form with a message
indicating that the user already exists.

[lib/user/user.js]: lib/user/user.js

## Submission

When you finish your implementation make sure you have the latest
version on gitblit (`git push`). You should make at least 10 commits
to your repository. We will view your repository log to make sure this
is the case. You should also include a `README.md` file (in markdown
format) that briefly explains to us your implementation (a couple of
paragraphs is sufficient) and instructions on how to run your code.

You are welcome to submit additional files as you see fit, but make
sure you explain what they are in your `README.md` file. You are also
allowed to make your implementation as elaborate as you want. For
example, add in access to a database, create a delete user form, etc.
Play around with the code and have fun!