DROP table Vehicles;
CREATE TABLE Vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    year INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Available', 'Sold')),
    image VARCHAR(255)
);


INSERT INTO Vehicles (name, model, price, year, status, image) VALUES
('Toyota', 'Camry', 25000, 2022, 'Available', '/static/images/toyota_camry.jpg'),
('BMW', 'X5', 50000, 2023, 'Sold', '/static/images/bmw_x5.jpg'),
('Mercedes', 'C-Class', 45000, 2021, 'Available', '/static/images/mercedes_cclass.jpg'),
('Honda', 'Civic', 20000, 2022, 'Available', '/static/images/honda_civic.jpg'),
('Audi', 'A4', 40000, 2023, 'Sold', '/static/images/audi_a4.jpg');

INSERT INTO Vehicles (name, model, price, year, status, image) VALUES
('Ford', 'Mustang', 30000, 2022, 'Available', '/static/images/Untitled design.png')


CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salespeople (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    salesperson_id INTEGER NOT NULL REFERENCES salespeople(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




