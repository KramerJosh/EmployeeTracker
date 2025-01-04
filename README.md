# Employee Tracker

## Installation

Please run an npm i to install dependancies, then an npm run build to create the dist folder with the proper js files.
(any updates should be followed by a new build)

## Getting started

First - navigate to the db folder, then connect to the database in postgres (psql -U {username}) and run (\i) the schema.sql and seeds.sql files.  Make sure you have created an .env file with the database name, your postgres username, and password. You can run the query.sql file to check if the database is correctly created and seeded.

Second - open a new bash window outside of the db/ folder, in the top directory of the project and start the server.  you can do this by running npm start.  

Third - open a final bash window in the dist/ folder and enter the command node index.js, this is where the user interface will pop up.

## Usage

With this employee tracker you are able to manage and view personell details for a business.  Following the prompts, you should be able to add new departments, job roles, and employees, as well as update existing employees.

## Walkthru video

[Video Link Here](https://drive.google.com/file/d/1j7myStJTiUGj8I0o_dSq-bp4og-YUDfk/view)