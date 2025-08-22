--Exercise 1:
SELECT * FROM rental
WHERE return_date IS NULL;

SELECT * FROM customer
INNER JOIN rental ON customer.customer_id = rental.customer_id
WHERE rental.return_date IS NULL;

SELECT * FROM film
INNER JOIN film_actor ON film.film_id = film_actor.film_id
INNER JOIN actor ON film_actor.actor_id = actor.actor_id
INNER JOIN film_category ON film.film_id = film_category.film_id
INNER JOIN category ON film_category.category_id = category.category_id
WHERE actor.first_name = 'Joe'
  AND actor.last_name = 'Swank'
  AND category.name = 'Action'

--Exercise 2:
SELECT s.store_id, c.city, co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id;

SELECT s.store_id,
       SUM(f.length) AS total_minutes,
       SUM(f.length) / 60 AS total_hours,
       SUM(f.length) / 1440 AS total_days
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NOT NULL OR r.rental_id IS NULL
GROUP BY s.store_id;

SELECT DISTINCT cu.* , ci.city
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city_id IN (
    SELECT c.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c ON a2.city_id = c.city_id
);

SELECT DISTINCT cu.*, co.country
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT c.country_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c ON a2.city_id = c.city_id
);


SELECT f.*
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'


SELECT SUM(length) AS total_minutes,
       SUM(length) / 60 AS total_hours,
       SUM(length) / 1440 AS total_days
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%';



