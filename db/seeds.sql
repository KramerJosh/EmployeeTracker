INSERT INTO department (name)
VALUES ('Engineering'),
       ('Science/Medical'),
       ('Communications'),
       ('Command');

INSERT INTO role (title, salary, department_id)
VALUES ('Transporter Cheif', 80000, 1),
       ('Cheif Engineer', 14000, 1),
       ('Science Officer', 75000, 2),
       ('Chief Medical Officer', 90000, 2),
       ('Exolinguistics Officer', 100000, 3),
       ('Bridge Communications', 65000, 3),
       ('Executive Officer', 450000, 4),
       ('Commanding Officer', 11000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Miles', 'Obrien', 1, 2),
       ('Geordie', 'LaForge', 2, NULL),
       ('Jadzia', 'Dax', 3, 4),
       ('Julian', 'Bashir', 4, NULL),
       ('Hoshi', 'Sato', 5, 6),
       ('Nyota', 'Uhura', 6, NULL),
       ('Kira', 'Nerys', 7, 8),
       ('Benjamin', 'Sisko', 8, NULL);