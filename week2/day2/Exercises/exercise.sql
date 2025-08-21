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
