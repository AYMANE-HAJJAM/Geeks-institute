--Exercise 1:
select * from customer

SELECT first_name || ' ' || last_name AS full_name
FROM customer;


select distinct create_date from customer

select * from customer
order by first_name desc

select film_id, title, description, release_year, rental_rate from film
order by rental_rate

SELECT a.address, a.phone, a.district
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE a.district = 'Texas';

SELECT *
FROM film
WHERE film_id IN (15, 150);

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Titanic';

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'Ti%';

SELECT * FROM film
ORDER BY rental_rate 
LIMIT 10;

SELECT * FROM film
ORDER BY rental_rate ASC
OFFSET 10 FETCH NEXT 10 ROWS ONLY;

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
INNER JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

SELECT f.*
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;

SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id, c.customer_id;


SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating;

SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG-13');

SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13') AND length < 120 AND rental_rate < 3.00
ORDER BY title;

UPDATE customer
SET first_name = 'aymane', last_name  = 'hajjam'
WHERE customer_id = 1;

select * from customer
WHERE customer_id = 1;

UPDATE address
SET address = 'Bournazil'
WHERE address_id = 5;

select * from address
WHERE address_id = 5;


--Exercise 2:
UPDATE students
SET birth_date = '1998-11-02'
WHERE last_name = 'Benichou' AND first_name IN ('Lea', 'Marc')
RETURNING *;

UPDATE students
SET last_name = 'Guez'
WHERE last_name = 'Grez'
RETURNING *;

DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou'
RETURNING *;

SELECT count(*) FROM students;

SELECT count(*) FROM students
WHERE birth_date > '2000-01-01';

ALTER TABLE students
ADD COLUMN math_grade INTEGER;

UPDATE students SET math_grade = 80 
WHERE id = 1
RETURNING *;
UPDATE students SET math_grade = 90 
WHERE id IN (2, 4)
RETURNING *;
UPDATE students SET math_grade = 40 
WHERE id = 6
RETURNING *;

SELECT count(*) FROM students 
WHERE math_grade > 83;

INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer', 'Simpson', (SELECT birth_date FROM students WHERE first_name = 'Omer' AND last_name = 'Simpson' LIMIT 1), 70);

SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

SELECT SUM(math_grade) AS total_grades_sum
FROM students;

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