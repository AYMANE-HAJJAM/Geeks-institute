SELECT first_name, last_name 
FROM customers 
ORDER BY first_name ASC, last_name ASC 
LIMIT 2;

DELETE FROM purchases 
WHERE customers_id = (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott');

SELECT * FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott';

SELECT p.*
FROM purchases p 
LEFT OUTER JOIN customers c ON p.customers_id = c.id 
WHERE c.id IS NULL;

SELECT p.*, c.first_name, c.last_name 
FROM purchases p 
INNER JOIN customers c 
ON p.customers_id = c.id;