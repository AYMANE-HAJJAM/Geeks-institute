CREATE TABLE salespeople (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    year INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Available', 'Sold')),
    image VARCHAR(255),
    salesperson_id INTEGER REFERENCES salespeople(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES Vehicles(id) ON DELETE SET NULL ON UPDATE CASCADE,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    salesperson_id INTEGER NOT NULL REFERENCES salespeople(id) ON DELETE SET NULL ON UPDATE CASCADE,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(10,2) NOT NULL
);





INSERT INTO Vehicles (name, model, price, year, status, image) VALUES
('Toyota', 'Camry', 25000, 2022, 'Available', '/static/images/toyota.jpg',1),
('BMW', 'X5', 50000, 2023, 'Sold', '/static/images/bmw.jpg',1),
('Mercedes', 'C-Class', 45000, 2021, 'Available', '/static/images/mercedes.jpg',1),
('Honda', 'Civic', 20000, 2022, 'Available', '/static/images/honda.jpg',1),
('Audi', 'A4', 40000, 2023, 'Sold', '/static/images/audi.jpg',1);

INSERT INTO Vehicles (name, model, price, year, status, image) VALUES
('Ford', 'Mustang', 30000, 2022, 'Available', '/static/images/ford.jpg',1);
