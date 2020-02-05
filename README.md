# appinessUserNode
node version 10.16.0
npm version 6.9.0

run npm install before running this project
use npm start to start

this project uses mongoose as mongoclient and mongodb atlas is used for db

api calls through postman : localhost:3000/users/resgister (post) req =>{name, email, password} for registration
api calls to retreive data: localhost:3000/users/users, localhost:3000/users/userRoles (get) to verify
api calls to remove all data from users table  localhost:3000/users/deleteUsers (delete) to reset
api calls to remove all data from userRoles table  localhost:3000/users/deleteUserRoles (delete) to reset
