CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INT,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id) REFERENCES product_orders(order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION total_order_price(p_order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(price) INTO total
    FROM items
    WHERE order_id = p_order_id;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100)
);

ALTER TABLE product_orders
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


CREATE OR REPLACE FUNCTION total_order_price_user(p_user_id INT, p_order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(i.price) INTO total
    FROM items i
    JOIN product_orders o ON i.order_id = o.order_id
    WHERE o.order_id = p_order_id AND o.user_id = p_user_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

