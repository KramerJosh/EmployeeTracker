// to populate the inquirer with options, should take the responses sent back from each API call
// in the inquirer file I can use template literals like ${res.manager_id} - that should work well.


// add routes for each table?

// View All Depts               DONE! Added to Index.
// view all roles               DONE! Added to Index.
// view all employees           DONE! Added to Index.
// add a department             DONE! Added to Index.
// add an employee              DONE! Added to Index.   
// Add a role                   Done! Added to Index.   
// update employee role         DONE! Added to Index.
// Delete an Employee           DONE! Added to Index.

// Delete an Employee should return a list of names
// add a dept - check out that work flow...

import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create an employee
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  pool.query(sql, params, (err, _result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// Create a new department
app.post('/api/new-dept', ({ body }, res) => {
  const sql = `INSERT INTO department (name)
    VALUES ($1)`;
  const params = [body.name];

  pool.query(sql, params, (err, _result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// Create a new role
app.post('/api/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3)`;
  const params = [body.title, body.salary, body.department_id];

  pool.query(sql, params, (err, _result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});


// Update an employee role
app.put('/api/employee', ({body}, res) => {
  const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;
  const params = [body.id, body.role];

  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'employee not found',
      });
    } else {
      res.json({
        message: 'updated',
        changes: result.rowCount,
        id: body.id,
      });
    }
  });
});

// Get all Depts
app.get('/api/depts', (_req, res) => {
  const sql = `SELECT * FROM department;`;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Get all Roles
app.get('/api/roles', (_req, res) => {
  const sql = `SELECT * FROM role;`;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Cleaner call for displaying all roles
app.get('/api/roles-display', (_req, res) => {
  const sql = `SELECT 
    r.id AS role_id,
    r.title AS role_title,
    r.salary AS role_salary,
    d.name AS department_name
FROM 
    role r
JOIN 
    department d
ON 
    r.department_id = d.id;`;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
});


// Read all employees
app.get('/api/employee', (_req, res) => {
  const sql = `SELECT 
    e.id AS id,
    e.first_name AS first_name,
    e.last_name AS last_name,
    m.first_name || ' ' || m.last_name AS manager_name,
    r.title AS title,
    r.salary AS salary,
    d.name AS department_name
FROM 
    employee e
LEFT JOIN 
    employee m ON e.manager_id = m.id
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id;`;

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const { rows } = result;
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Delete an employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'employee not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
        id: req.params.id,
      });
    }
  });
});



// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server! running on port ${PORT}`);
});


export default app;