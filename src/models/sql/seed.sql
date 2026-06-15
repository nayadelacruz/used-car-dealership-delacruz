-- Database seed file for vehicles categories and dealership information
-- This file creates tables and inserts all initial data

BEGIN;

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS dealership CASCADE;
DROP TABLE IF EXISTS vehicles_details CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


-- Create categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create vehicles table
CREATE TABLE vehicles_details (
    vehicle_id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    mileage INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    transmission VARCHAR(30) NOT NULL,
    drivetrain VARCHAR(20) NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    engine VARCHAR(50) NOT NULL, 
    horsepower INTEGER,
    exterior_color VARCHAR(30) NOT NULL,
    interior_color VARCHAR(30) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    vin	VARCHAR(20) UNIQUE NOT NULL,
    stock_number VARCHAR(20) UNIQUE NOT NULL,
    description	TEXT,
    availability BOOLEAN NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create dealership table
CREATE TABLE dealership (
    dealer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address	VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(20) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    website VARCHAR(100) NOT NULL,
    hours VARCHAR(100)
);


-- Insert categories
INSERT INTO categories (name) VALUES
    ('Cars'),
    ('SUVs'),
    ('Trucks'),
    ('Vans');

-- Insert Vehicle Details
INSERT INTO vehicles_details
(make, model, year, price, mileage, category_id, transmission,
drivetrain, fuel_type, engine, horsepower, exterior_color,
interior_color, image_url, vin, stock_number, description,
availability, featured)

VALUES

('Toyota','Camry',2022,25995.00,28500,1,'Automatic','FWD','Gasoline',
'2.5L I4',203,'Silver','Black',
'/images/vehicles/toyota-camry-2022.jpg',
'4T1G11AK0NU100001','DC1001',
'One-owner sedan in excellent condition with backup camera and Apple CarPlay.',
TRUE,TRUE),

('Honda','Accord',2021,24995.00,34200,1,'Automatic','FWD','Gasoline',
'1.5L Turbo',192,'White','Black',
'/images/vehicles/honda-accord-2021.jpg',
'1HGCV1F30MA100002','DC1002',
'Reliable midsize sedan with excellent fuel economy.',
TRUE,TRUE),

('Mazda','Mazda3',2020,19995.00,40100,1,'Automatic','FWD','Gasoline',
'2.5L I4',186,'Red','Black',
'/images/vehicles/mazda3-2020.jpg',
'JM1BPACL0L1100003','DC1003',
'Sporty compact sedan with premium interior.',
TRUE,FALSE),

('Hyundai','Elantra',2023,22995.00,12000,1,'Automatic','FWD','Gasoline',
'2.0L I4',147,'Blue','Gray',
'/images/vehicles/hyundai-elantra-2023.jpg',
'KMHLM4AG5PU100004','DC1004',
'Low mileage with remaining factory warranty.',
TRUE,FALSE),

('Nissan','Altima',2021,21495.00,35600,1,'CVT','FWD','Gasoline',
'2.5L I4',188,'Black','Charcoal',
'/images/vehicles/nissan-altima-2021.jpg',
'1N4BL4BV0MN100005','DC1005',
'Comfortable daily commuter with advanced safety features.',
TRUE,FALSE),

('Toyota','RAV4',2022,31995.00,22000,2,'Automatic','AWD','Gasoline',
'2.5L I4',203,'Gray','Black',
'/images/vehicles/toyota-rav4-2022.jpg',
'2T3P1RFV5NW100006','DC1006',
'Popular family SUV with all-wheel drive.',
TRUE,TRUE),

('Honda','CR-V',2021,29995.00,28500,2,'Automatic','AWD','Gasoline',
'1.5L Turbo',190,'White','Gray',
'/images/vehicles/honda-crv-2021.jpg',
'7FARW2H85ME100007','DC1007',
'Spacious SUV with excellent reliability.',
TRUE,FALSE),

('Ford','Explorer',2020,30995.00,45000,2,'Automatic','4WD','Gasoline',
'2.3L EcoBoost',300,'Black','Black',
'/images/vehicles/ford-explorer-2020.jpg',
'1FMSK8DH2LGA00008','DC1008',
'Three-row SUV perfect for large families.',
TRUE,FALSE),

('Jeep','Grand Cherokee',2021,33995.00,31000,2,'Automatic','4WD','Gasoline',
'3.6L V6',293,'Green','Black',
'/images/vehicles/jeep-grand-cherokee-2021.jpg',
'1C4RJFAG5MC100009','DC1009',
'Luxury SUV with premium interior and 4WD.',
TRUE,TRUE),

('Subaru','Forester',2022,28995.00,18000,2,'CVT','AWD','Gasoline',
'2.5L Boxer',182,'Blue','Gray',
'/images/vehicles/subaru-forester-2022.jpg',
'JF2SKAEC2NH100010','DC1010',
'Excellent all-weather capability and safety.',
TRUE,FALSE),

('Ford','F-150',2021,39995.00,35000,3,'Automatic','4WD','Gasoline',
'3.5L EcoBoost',400,'Silver','Black',
'/images/vehicles/ford-f150-2021.jpg',
'1FTFW1E84MFA10011','DC1011',
'Powerful pickup with towing package.',
TRUE,TRUE),

('Chevrolet','Silverado 1500',2022,41995.00,27000,3,'Automatic','4WD','Gasoline',
'5.3L V8',355,'White','Black',
'/images/vehicles/chevy-silverado-2022.jpg',
'3GCUYEED4NG100012','DC1012',
'Crew cab truck in excellent condition.',
TRUE,FALSE),

('Ram','1500',2021,38995.00,39000,3,'Automatic','4WD','Gasoline',
'5.7L HEMI',395,'Black','Brown',
'/images/vehicles/ram-1500-2021.jpg',
'1C6SRFMT5MN100013','DC1013',
'Smooth ride with premium features.',
TRUE,FALSE),

('Toyota','Tacoma',2023,36995.00,15000,3,'Automatic','4WD','Gasoline',
'3.5L V6',278,'Gray','Black',
'/images/vehicles/toyota-tacoma-2023.jpg',
'3TMCZ5AN5PM100014','DC1014',
'Excellent off-road capability.',
TRUE,TRUE),

('GMC','Sierra 1500',2020,35995.00,48000,3,'Automatic','4WD','Gasoline',
'5.3L V8',355,'Red','Black',
'/images/vehicles/gmc-sierra-2020.jpg',
'1GTU9CED7LZ100015','DC1015',
'Well-maintained truck with premium package.',
TRUE,FALSE),

('Honda','Odyssey',2022,34995.00,22000,4,'Automatic','FWD','Gasoline',
'3.5L V6',280,'White','Gray',
'/images/vehicles/honda-odyssey-2022.jpg',
'5FNRL6H79NB100016','DC1016',
'Family minivan with seating for eight.',
TRUE,TRUE),

('Toyota','Sienna',2023,42995.00,12000,4,'Automatic','AWD','Hybrid',
'2.5L Hybrid',245,'Silver','Gray',
'/images/vehicles/toyota-sienna-2023.jpg',
'5TDESKFC3PS100017','DC1017',
'Hybrid minivan with excellent fuel economy.',
TRUE,TRUE),

('Chrysler','Pacifica',2021,30995.00,33000,4,'Automatic','FWD','Gasoline',
'3.6L V6',287,'Blue','Black',
'/images/vehicles/chrysler-pacifica-2021.jpg',
'2C4RC1GG5MR100018','DC1018',
'Comfortable and spacious family van.',
TRUE,FALSE),

('Kia','Carnival',2022,33995.00,21000,4,'Automatic','FWD','Gasoline',
'3.5L V6',290,'Black','Gray',
'/images/vehicles/kia-carnival-2022.jpg',
'KNDNE5H36N6100019','DC1019',
'Modern minivan with SUV-inspired styling.',
TRUE,FALSE),

('Ford','Transit Connect',2020,24995.00,41000,4,'Automatic','FWD','Gasoline',
'2.0L I4',162,'White','Black',
'/images/vehicles/ford-transit-connect-2020.jpg',
'NM0LS7E20L1450020','DC1020',
'Versatile passenger van for families or business.',
TRUE,FALSE);

COMMIT;