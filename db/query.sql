-- Show All Employees

SELECT 
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
    department d ON r.department_id = d.id;


