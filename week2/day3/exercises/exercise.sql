--Exercise 1:
SELECT * FROM language;

SELECT f.title, f.description, l.name
FROM film f
INNER JOIN language l ON f.language_id = l.language_id;


SELECT f.title, f.description, l.name
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO new_film (name) VALUES
('Spider Man'),
('The Matrix');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (1, 1, 'Amazing superhero movie', 9, 'Really enjoyed Spider Man!'),
       (2, 2, 'Classic sci-fi', 8, 'The Matrix is a must watch!');

DELETE FROM new_film WHERE id = 1;

SELECT * FROM new_film;
SELECT * FROM customer_review;

--Exercise 2:
UPDATE film
SET language_id = 1
WHERE film_id = 1;

--store_id and address_id, when inserting a new customer, you must provide a valid store_id and a valid address_id that already exist in their respective tables.

DROP TABLE customer_review;

SELECT COUNT(*)
FROM rental
WHERE return_date IS NULL;

SELECT f.*
FROM rental r
INNER JOIN inventory i ON r.inventory_id = i.inventory_id
INNER JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

SELECT f.*
FROM film f
INNER JOIN film_actor fa ON f.film_id = fa.film_id
INNER JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo wrestler%'
  AND a.first_name = 'Penelope'
  AND a.last_name = 'Monroe';

SELECT * FROM film
WHERE length < 60
  AND rating = 'R'
  AND description ILIKE '%Documentary%';


SELECT DISTINCT f.*
FROM rental r
INNER JOIN customer c ON r.customer_id = c.customer_id
INNER JOIN payment p ON r.rental_id = p.rental_id
INNER JOIN inventory i ON r.inventory_id = i.inventory_id
INNER JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT DISTINCT f.*
FROM rental r
INNER JOIN customer c ON r.customer_id = c.customer_id
INNER JOIN inventory i ON r.inventory_id = i.inventory_id
INNER JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;







