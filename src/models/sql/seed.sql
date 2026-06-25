-- Database seed file for vehicles categories and dealership information
-- This file creates tables and inserts all initial data

BEGIN;

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS dealership CASCADE;
DROP TABLE IF EXISTS vehicle_images CASCADE;
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

-- Create vehicle_images table
CREATE TABLE vehicle_images (
    image_id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    vehicle_id INTEGER NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles_details(vehicle_id)
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
interior_color, vin, stock_number, description,
availability, featured)

VALUES

('Toyota','Camry',2022,25995.00,28500,1,'Automatic','FWD','Gasoline',
'2.5L I4',203,'Silver','Black',
'4T1G11AK0NU100001','DC1001',
'One-owner sedan in excellent condition with backup camera and Apple CarPlay.',
TRUE,TRUE),

('Honda','Accord',2021,24995.00,34200,1,'Automatic','FWD','Gasoline',
'1.5L Turbo',192,'White','Black',
'1HGCV1F30MA100002','DC1002',
'Reliable midsize sedan with excellent fuel economy.',
TRUE,TRUE),

('Mazda','Mazda3',2020,19995.00,40100,1,'Automatic','FWD','Gasoline',
'2.5L I4',186,'Red','Black',
'JM1BPACL0L1100003','DC1003',
'Sporty compact sedan with premium interior.',
TRUE,FALSE),

('Hyundai','Elantra',2023,22995.00,12000,1,'Automatic','FWD','Gasoline',
'2.0L I4',147,'Blue','Gray',
'KMHLM4AG5PU100004','DC1004',
'Low mileage with remaining factory warranty.',
TRUE,FALSE),

('Nissan','Altima',2021,21495.00,35600,1,'CVT','FWD','Gasoline',
'2.5L I4',188,'Black','Charcoal',
'1N4BL4BV0MN100005','DC1005',
'Comfortable daily commuter with advanced safety features.',
TRUE,FALSE),

('Toyota','RAV4',2022,31995.00,22000,2,'Automatic','AWD','Gasoline',
'2.5L I4',203,'Gray','Black',
'2T3P1RFV5NW100006','DC1006',
'Popular family SUV with all-wheel drive.',
TRUE,TRUE),

('Honda','CR-V',2021,29995.00,28500,2,'Automatic','AWD','Gasoline',
'1.5L Turbo',190,'White','Gray',
'7FARW2H85ME100007','DC1007',
'Spacious SUV with excellent reliability.',
TRUE,FALSE),

('Ford','Explorer',2020,30995.00,45000,2,'Automatic','4WD','Gasoline',
'2.3L EcoBoost',300,'Black','Black',
'1FMSK8DH2LGA00008','DC1008',
'Three-row SUV perfect for large families.',
TRUE,FALSE),

('Jeep','Grand Cherokee',2021,33995.00,31000,2,'Automatic','4WD','Gasoline',
'3.6L V6',293,'Green','Black',
'1C4RJFAG5MC100009','DC1009',
'Luxury SUV with premium interior and 4WD.',
TRUE,TRUE),

('Subaru','Forester',2022,28995.00,18000,2,'CVT','AWD','Gasoline',
'2.5L Boxer',182,'Blue','Gray',
'JF2SKAEC2NH100010','DC1010',
'Excellent all-weather capability and safety.',
TRUE,FALSE),

('Ford','F-150',2021,39995.00,35000,3,'Automatic','4WD','Gasoline',
'3.5L EcoBoost',400,'Silver','Black',
'1FTFW1E84MFA10011','DC1011',
'Powerful pickup with towing package.',
TRUE,TRUE),

('Chevrolet','Silverado 1500',2022,41995.00,27000,3,'Automatic','4WD','Gasoline',
'5.3L V8',355,'White','Black',
'3GCUYEED4NG100012','DC1012',
'Crew cab truck in excellent condition.',
TRUE,FALSE),

('Ram','1500',2021,38995.00,39000,3,'Automatic','4WD','Gasoline',
'5.7L HEMI',395,'Black','Brown',
'1C6SRFMT5MN100013','DC1013',
'Smooth ride with premium features.',
TRUE,FALSE),

('Toyota','Tacoma',2023,36995.00,15000,3,'Automatic','4WD','Gasoline',
'3.5L V6',278,'Gray','Black',
'3TMCZ5AN5PM100014','DC1014',
'Excellent off-road capability.',
TRUE,TRUE),

('GMC','Sierra 1500',2020,35995.00,48000,3,'Automatic','4WD','Gasoline',
'5.3L V8',355,'Red','Black',
'1GTU9CED7LZ100015','DC1015',
'Well-maintained truck with premium package.',
TRUE,FALSE),

('Honda','Odyssey',2022,34995.00,22000,4,'Automatic','FWD','Gasoline',
'3.5L V6',280,'White','Gray',
'5FNRL6H79NB100016','DC1016',
'Family minivan with seating for eight.',
TRUE,TRUE),

('Toyota','Sienna',2023,42995.00,12000,4,'Automatic','AWD','Hybrid',
'2.5L Hybrid',245,'Silver','Gray',
'5TDESKFC3PS100017','DC1017',
'Hybrid minivan with excellent fuel economy.',
TRUE,TRUE),

('Chrysler','Pacifica',2021,30995.00,33000,4,'Automatic','FWD','Gasoline',
'3.6L V6',287,'Blue','Black',
'2C4RC1GG5MR100018','DC1018',
'Comfortable and spacious family van.',
TRUE,FALSE),

('Kia','Carnival',2022,33995.00,21000,4,'Automatic','FWD','Gasoline',
'3.5L V6',290,'Black','Gray',
'KNDNE5H36N6100019','DC1019',
'Modern minivan with SUV-inspired styling.',
TRUE,FALSE),

('Ford','Transit Connect',2020,24995.00,41000,4,'Automatic','FWD','Gasoline',
'2.0L I4',162,'White','Black',
'NM0LS7E20L1450020','DC1020',
'Versatile passenger van for families or business.',
TRUE,FALSE);

-- Insert Vehicle Images
INSERT INTO vehicle_images
(image_url, vehicle_id, alt_text, is_primary)
VALUES

-- Toyota Camry
('/images/vehicles/toyota-camry-front.jpg',1,'Toyota Camry Front View',TRUE),
('/images/vehicles/toyota-camry-side.jpg',1,'Toyota Camry Side View',FALSE),
('/images/vehicles/toyota-camry-interior.jpg',1,'Toyota Camry Interior',FALSE),

-- Honda Accord
('/images/vehicles/honda-accord-front.jpg',2,'Honda Accord Front View',TRUE),
('/images/vehicles/honda-accord-side.jpg',2,'Honda Accord Side View',FALSE),
('/images/vehicles/honda-accord-interior.jpg',2,'Honda Accord Interior',FALSE),

-- Mazda3
('/images/vehicles/mazda3-front.jpg',3,'Mazda3 Front View',TRUE),
('/images/vehicles/mazda3-side.jpg',3,'Mazda3 Side View',FALSE),
('/images/vehicles/mazda3-interior.jpg',3,'Mazda3 Interior',FALSE),

-- Hyundai Elantra
('/images/vehicles/hyundai-elantra-front.jpg',4,'Hyundai Elantra Front View',TRUE),
('/images/vehicles/hyundai-elantra-side.jpg',4,'Hyundai Elantra Side View',FALSE),
('/images/vehicles/hyundai-elantra-interior.jpg',4,'Hyundai Elantra Interior',FALSE),

-- Nissan Altima
('/images/vehicles/nissan-altima-front.jpg',5,'Nissan Altima Front View',TRUE),
('/images/vehicles/nissan-altima-side.jpg',5,'Nissan Altima Side View',FALSE),
('/images/vehicles/nissan-altima-interior.jpg',5,'Nissan Altima Interior',FALSE),

-- Toyota RAV4
('/images/vehicles/toyota-rav4-front.jpg',6,'Toyota RAV4 Front View',TRUE),
('/images/vehicles/toyota-rav4-side.jpg',6,'Toyota RAV4 Side View',FALSE),
('/images/vehicles/toyota-rav4-interior.jpg',6,'Toyota RAV4 Interior',FALSE),

-- Honda CR-V
('/images/vehicles/honda-crv-front.jpg',7,'Honda CR-V Front View',TRUE),
('/images/vehicles/honda-crv-side.jpg',7,'Honda CR-V Side View',FALSE),
('/images/vehicles/honda-crv-interior.jpg',7,'Honda CR-V Interior',FALSE),

-- Ford Explorer
('/images/vehicles/ford-explorer-front.jpg',8,'Ford Explorer Front View',TRUE),
('/images/vehicles/ford-explorer-side.jpg',8,'Ford Explorer Side View',FALSE),
('/images/vehicles/ford-explorer-interior.jpg',8,'Ford Explorer Interior',FALSE),

-- Jeep Grand Cherokee
('/images/vehicles/jeep-grand-cherokee-front.jpg',9,'Jeep Grand Cherokee Front View',TRUE),
('/images/vehicles/jeep-grand-cherokee-side.jpg',9,'Jeep Grand Cherokee Side View',FALSE),
('/images/vehicles/jeep-grand-cherokee-interior.jpg',9,'Jeep Grand Cherokee Interior',FALSE),

-- Subaru Forester
('/images/vehicles/subaru-forester-front.jpg',10,'Subaru Forester Front View',TRUE),
('/images/vehicles/subaru-forester-side.jpg',10,'Subaru Forester Side View',FALSE),
('/images/vehicles/subaru-forester-interior.jpg',10,'Subaru Forester Interior',FALSE),

-- Ford F-150
('/images/vehicles/ford-f150-front.jpg',11,'Ford F-150 Front View',TRUE),
('/images/vehicles/ford-f150-side.jpg',11,'Ford F-150 Side View',FALSE),
('/images/vehicles/ford-f150-interior.jpg',11,'Ford F-150 Interior',FALSE),

-- Chevrolet Silverado
('/images/vehicles/chevy-silverado-front.jpg',12,'Chevrolet Silverado Front View',TRUE),
('/images/vehicles/chevy-silverado-side.jpg',12,'Chevrolet Silverado Side View',FALSE),
('/images/vehicles/chevy-silverado-interior.jpg',12,'Chevrolet Silverado Interior',FALSE),

-- Ram 1500
('/images/vehicles/ram-1500-front.jpg',13,'Ram 1500 Front View',TRUE),
('/images/vehicles/ram-1500-side.jpg',13,'Ram 1500 Side View',FALSE),
('/images/vehicles/ram-1500-interior.jpg',13,'Ram 1500 Interior',FALSE),

-- Toyota Tacoma
('/images/vehicles/toyota-tacoma-front.jpg',14,'Toyota Tacoma Front View',TRUE),
('/images/vehicles/toyota-tacoma-side.jpg',14,'Toyota Tacoma Side View',FALSE),
('/images/vehicles/toyota-tacoma-interior.jpg',14,'Toyota Tacoma Interior',FALSE),

-- GMC Sierra
('/images/vehicles/gmc-sierra-front.jpg',15,'GMC Sierra Front View',TRUE),
('/images/vehicles/gmc-sierra-side.jpg',15,'GMC Sierra Side View',FALSE),
('/images/vehicles/gmc-sierra-interior.jpg',15,'GMC Sierra Interior',FALSE),

-- Honda Odyssey
('/images/vehicles/honda-odyssey-front.jpg',16,'Honda Odyssey Front View',TRUE),
('/images/vehicles/honda-odyssey-side.jpg',16,'Honda Odyssey Side View',FALSE),
('/images/vehicles/honda-odyssey-interior.jpg',16,'Honda Odyssey Interior',FALSE),

-- Toyota Sienna
('/images/vehicles/toyota-sienna-front.jpg',17,'Toyota Sienna Front View',TRUE),
('/images/vehicles/toyota-sienna-side.jpg',17,'Toyota Sienna Side View',FALSE),
('/images/vehicles/toyota-sienna-interior.jpg',17,'Toyota Sienna Interior',FALSE),

-- Chrysler Pacifica
('/images/vehicles/chrysler-pacifica-front.jpg',18,'Chrysler Pacifica Front View',TRUE),
('/images/vehicles/chrysler-pacifica-side.jpg',18,'Chrysler Pacifica Side View',FALSE),
('/images/vehicles/chrysler-pacifica-interior.jpg',18,'Chrysler Pacifica Interior',FALSE),

-- Kia Carnival
('/images/vehicles/kia-carnival-front.jpg',19,'Kia Carnival Front View',TRUE),
('/images/vehicles/kia-carnival-side.jpg',19,'Kia Carnival Side View',FALSE),
('/images/vehicles/kia-carnival-interior.jpg',19,'Kia Carnival Interior',FALSE),

-- Ford Transit Connect
('/images/vehicles/ford-transit-connect-front.jpg',20,'Ford Transit Connect Front View',TRUE),
('/images/vehicles/ford-transit-connect-side.jpg',20,'Ford Transit Connect Side View',FALSE),
('/images/vehicles/ford-transit-connect-interior.jpg',20,'Ford Transit Connect Interior',FALSE);

COMMIT;