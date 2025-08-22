--Exercise 1:
select * from items
order by price ;

SELECT * FROM items
WHERE price >= 80
ORDER BY price DESC;

SELECT first_name, last_name FROM customers
ORDER BY first_name
LIMIT 3;

SELECT last_name 
FROM customers
ORDER BY last_name DESC;

--Exercise 2:
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
INNER JOIN address a ON c.address_id = a.address_id
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
