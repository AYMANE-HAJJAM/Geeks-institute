-- --Exercise 2:
-- UPDATE students
-- SET birth_date = '1998-11-02'
-- WHERE last_name = 'Benichou' AND first_name IN ('Lea', 'Marc')
-- RETURNING *;

-- UPDATE students
-- SET last_name = 'Guez'
-- WHERE last_name = 'Grez'
-- RETURNING *;

-- DELETE FROM students
-- WHERE first_name = 'Lea' AND last_name = 'Benichou'
-- RETURNING *;

-- SELECT count(*) FROM students;

-- SELECT count(*) FROM students
-- WHERE birth_date > '2000-01-01';

-- ALTER TABLE students
-- ADD COLUMN math_grade INTEGER;

-- UPDATE students SET math_grade = 80 
-- WHERE id = 1
-- RETURNING *;
-- UPDATE students SET math_grade = 90 
-- WHERE id IN (2, 4)
-- RETURNING *;
-- UPDATE students SET math_grade = 40 
-- WHERE id = 6
-- RETURNING *;

-- SELECT count(*) FROM students 
-- WHERE math_grade > 83;

-- INSERT INTO students (first_name, last_name, birth_date, math_grade)
-- VALUES ('Omer', 'Simpson', (SELECT birth_date FROM students WHERE first_name = 'Omer' AND last_name = 'Simpson' LIMIT 1), 70);

-- SELECT first_name, last_name, COUNT(math_grade) AS total_grade
-- FROM students
-- GROUP BY first_name, last_name;

-- SELECT SUM(math_grade) AS total_grades_sum
-- FROM students;

--Exercise 3:
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customers_id INTEGER,
    items_id INTEGER,
    quantity_purchased INTEGER,
    FOREIGN KEY (customers_id) REFERENCES customers(id),
    FOREIGN KEY (items_id) REFERENCES items(id)
);

INSERT INTO purchases (customers_id, items_id, quantity_purchased)
VALUES 
((SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
(SELECT id FROM items WHERE name_item = 'Fan'), 1
),
((SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
(SELECT id FROM items WHERE name_item = 'Large Desk'), 10
),
((SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
(SELECT id FROM items WHERE name_item = 'Small Desk'), 2
);

SELECT * FROM purchases;

SELECT p.*, c.first_name, c.last_name
FROM purchases p
LEFT OUTER JOIN customers c 
ON p.customers_id = c.id;

SELECT p.*, c.first_name, c.last_name, i.name_item
FROM purchases p
INNER JOIN customers c 
ON p.customers_id = c.id
INNER JOIN items i 
ON p.items_id = i.id
WHERE p.customers_id = 5;

SELECT p.*, c.first_name, c.last_name, i.name_item
FROM purchases p
INNER JOIN customers c 
ON p.customers_id = c.id
INNER JOIN items i 
ON p.items_id = i.id
WHERE i.name_item IN ('Large Desk', 'Small Desk');

SELECT c.first_name AS "Customer first name", c.last_name AS "Customer last name", i.name_item AS "Item name"
FROM purchases p
INNER JOIN customers c ON p.customers_id = c.id
INNER JOIN items i ON p.items_id = i.id
ORDER BY c.last_name, c.first_name;

INSERT INTO purchases (customers_id, quantity_purchased)
VALUES (1, 5);
--Yes, it works. The INSERT operation succeeds because the items_id column allows NULL values, as it was not defined with a NOT NULL constraint during table creation.