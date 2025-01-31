-- look into changing role to roles

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);


CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL, 
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE -- maybe ditch this, but probably useful
  );


CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) UNIQUE NOT NULL, 
  last_name VARCHAR(30) UNIQUE NOT NULL, 
  role_id INTEGER NOT NULL, 
  FOREIGN KEY (role_id)
  REFERENCES role(id),
  manager_id INTEGER, --reference another employee
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE CASCADE -- maybe ditch this, but probably useful
  );

  