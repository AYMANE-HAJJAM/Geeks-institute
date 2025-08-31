DROP TABLE if EXISTS tickets;
DROP TABLE if EXISTS attendees;
DROP TABLE if EXISTS events;
DROP TABLE if EXISTS organizers;



CREATE TABLE IF NOT EXISTS organizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);



CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(100) NOT NULL,
    organizer_id INTEGER REFERENCES organizers(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS attendees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
    attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE ON UPDATE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    UNIQUE (event_id, attendee_id)
);


INSERT INTO organizers (name, email) VALUES
('Amsa Events', 'contact@amsa.com'),
('Global Expo', 'info@globalexpo.com'),
('Future Vision', 'vision@future.com'),
('Elite Gatherings', 'elite@gatherings.com'),
('Casablanca Hub', 'hub@casa.com'),
('Marrakech Events', 'marrakech@events.com'),
('Tech World', 'tech@world.com'),
('Art & Culture Org', 'art@culture.com'),
('Business Connect', 'biz@connect.com'),
('EduLearn', 'edu@learn.com');

INSERT INTO events (name, date, location, organizer_id) VALUES
('Tech Summit 2025', '2025-09-15 10:00:00', 'Casablanca', 1),
('Startup Expo', '2025-10-01 09:00:00', 'Marrakech', 2),
('AI Conference', '2025-11-20 14:00:00', 'Rabat', 3),
('Cultural Festival', '2025-09-05 18:00:00', 'Fes', 4),
('Music Concert', '2025-09-10 20:00:00', 'Agadir', 5),
('Business Forum', '2025-10-12 09:30:00', 'Casablanca', 6),
('Art Exhibition', '2025-09-25 11:00:00', 'Tangier', 7),
('Education Fair', '2025-10-18 09:00:00', 'Oujda', 8),
('Innovation Week', '2025-11-01 10:00:00', 'Casablanca', 9),
('Book Fair', '2025-12-05 10:00:00', 'Rabat', 10);

INSERT INTO attendees (name, email, phone) VALUES
('Ali Ahmed', 'ali@example.com', '0612345678'),
('Sara Ben', 'sara@example.com', '0611111111'),
('Youssef Karim', 'youssef@example.com', '0622222222'),
('Hind Laila', 'hind@example.com', '0633333333'),
('Omar Zaki', 'omar@example.com', '0644444444'),
('Salma Idrissi', 'salma@example.com', '0655555555'),
('Karim Rami', 'karim@example.com', '0666666666'),
('Nadia El Amrani', 'nadia@example.com', '0677777777'),
('Mohamed Fouad', 'mohamed@example.com', '0688888888'),
('Fatima Zahra', 'fatima@example.com', '0699999999'),
('Reda Amine', 'reda@example.com', '0612121212'),
('Leila Souad', 'leila@example.com', '0623232323'),
('Hicham Badr', 'hicham@example.com', '0634343434'),
('Samira Othmane', 'samira@example.com', '0645454545'),
('Khalid Nabil', 'khalid@example.com', '0656565656');

INSERT INTO tickets (event_id, attendee_id, price) VALUES
(1, 1, 200.00),
(1, 2, 200.00),
(2, 3, 150.00),
(2, 4, 150.00),
(3, 5, 300.00),
(3, 6, 300.00),
(4, 7, 100.00),
(4, 8, 100.00),
(5, 9, 250.00),
(6, 10, 200.00),
(7, 11, 180.00),
(8, 12, 120.00),
(9, 13, 400.00),
(9, 14, 400.00),
(10, 15, 90.00);



