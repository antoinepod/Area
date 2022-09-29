# Orga des fichiers dans ce projet
cf: https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/

### Configs
 all the configs needed for the application. For example, if the app connects to a database, the configuration for the database (like database name and username) can be put in a file like db.config.js. Similarly, other configurations like the number of records to show on each page for pagination can be saved in a file named general.config.js inside this configs folder.

### Controllers
 will house all the controllers needed for the application. These controller methods get the request from the routes and convert them to HTTP responses with the use of any middleware as necessary.

### Middlewares
will segregate any middleware needed for the application in one place. There can be middleware for authentication, logging, or any other purpose.