INSERT INTO department (name)
VALUES ('IT'),
       ('Legal'),
       ('Dining Services'),
       ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Junior Developer', 80000, 1),
       ('Senior Developer', 14000, 1),
       ('Legal Assistant', 75000, 2),
       ('Lawyer', 450000, 2),
       ('Chef', 100000, 3),
       ('Cook', 65000, 3),
       ('Benifits Specialist', 90000, 4),
       ('Personel Specialist', 11000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Montgomery', 'Scott', 1, 2),
       ('Geordie', 'LaForge', 2, NULL),
       ('William', 'Riker', 3, 4),
       ('Kira', 'Nerys', 4, NULL),
       ('Miles', 'Obrien', 5, 6),
       ('Julian', 'Bashir', 6, NULL),
       ('Jadzia', 'Dax', 7, 8),
       ('Benjamin', 'Sisko', 8, NULL);