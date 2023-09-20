# express-locallibrary-tutorial
Tutorial "Local Library" website written in in Node/Express.

This web application creates an online catalog for a small local library, where users can browse available books and manage their accounts.

A UML diagram showing the relation of database entities in this example repository
![image](https://github.com/Leagues2/MiniLocalLibraryProject/assets/86221772/1e516705-8d72-4777-9486-52996832deac)

For more information see the associated MDN tutorial home page.

Note The auth branch in this repository implements an unsupported and undocumented version of the library with User Authentication and Authorization. This may be a useful starting point for some users.

Quick Start
To get this project up and running locally on your computer:

Set up a Node.js development environment.

Once you have node setup install the project in the root of your clone of this repo:

npm install
Run the tutorial server, using the appropriate command line shell for your environment:

# Linux terminal
DEBUG=express-locallibrary-tutorial:* npm run devstart

# Windows Powershell
$ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start
Open a browser to http://localhost:3000/ to open the library site.

Note: The library uses a default MongoDB database hosted on MongoDB Atlas. You should use a different database for your own code experiments.
