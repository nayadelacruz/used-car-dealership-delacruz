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
('https://images.unsplash.com/photo-1664287721774-13da4b108b18?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b3lvdGElMjBjYW1yeXxlbnwwfHx8fDE3ODM2MjU1Mzd8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    1,'Toyota Camry Front View',TRUE),
('https://images.unsplash.com/photo-1664287721774-13da4b108b18?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b3lvdGElMjBjYW1yeXxlbnwwfHx8fDE3ODM2MjU1Mzd8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    1,'Toyota Camry Side View',FALSE),
('https://images.unsplash.com/photo-1652675389931-513389f4f603?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxyZWQlMjB0b3lvdGElMjBjYW1yeXxlbnwwfHx8fDE3ODM2MjU1Mzd8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    1,'Toyota Camry Interior',FALSE),

-- Honda Accord
('https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGFjY29yZHxlbnwwfHx8fDE3ODM2MjU2Njh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    2,'Honda Accord Front View',TRUE),
('https://images.unsplash.com/photo-1634737581963-5a22ba471961?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxob25kYSUyMGFjY29yZHxlbnwwfHx8fDE3ODM2MjU2Njh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    2,'Honda Accord Side View',FALSE),
('https://images.unsplash.com/photo-1578659258511-4a4e7dee7344?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxob25kYSUyMGFjY29yZHxlbnwwfHx8fDE3ODM2MjU2Njh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    2,'Honda Accord Interior',FALSE),

-- Mazda3
('https://images.unsplash.com/photo-1599491143816-8c1ea12a4e06?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxtYXpkYSUyMDN8ZW58MHx8fHwxNzgzNjI1NzYyfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    3,'Mazda3 Front View',TRUE),
('https://images.unsplash.com/photo-1562614528-47b2bcb5ee1c?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxtYXpkYSUyMDN8ZW58MHx8fHwxNzgzNjI1NzYyfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    3,'Mazda3 Side View',FALSE),
('https://images.unsplash.com/photo-1615849551444-c48741741ff2?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxtYXpkYSUyMDN8ZW58MHx8fHwxNzgzNjI1NzYyfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    3,'Mazda3 Interior',FALSE),

-- Hyundai Elantra
('https://images.unsplash.com/photo-1707325653284-49057765e44c?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxoeXVuZGFpJTIwZWxhbnRyYXxlbnwwfHx8fDE3ODM2MjU5NDF8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    4,'Hyundai Elantra Front View',TRUE),
('https://images.unsplash.com/photo-1649963233289-b9ecd40c4c77?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxoeXVuZGFpJTIwZWxhbnRyYXxlbnwwfHx8fDE3ODM2MjU5NDF8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    4,'Hyundai Elantra Side View',FALSE),
('https://images.unsplash.com/photo-1629678212150-d928baa670f0?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxoeXVuZGFpJTIwZWxhbnRyYXxlbnwwfHx8fDE3ODM2MjU5NDF8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    4,'Hyundai Elantra Interior',FALSE),

-- Nissan Altima
('https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxuaXNzYW4lMjBhbHRpbWF8ZW58MHx8fHwxNzgzNjI2MTA5fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    5,'Nissan Altima Front View',TRUE),
('https://images.unsplash.com/photo-1575501707067-0e4c7db2a950?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxuaXNzYW4lMjBhbHRpbWF8ZW58MHx8fHwxNzgzNjI2MTA5fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    5,'Nissan Altima Side View',FALSE),
('https://images.unsplash.com/photo-1609250687610-95d4f56261a6?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxuaXNzYW4lMjBhbHRpbWF8ZW58MHx8fHwxNzgzNjI2MTA5fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    5,'Nissan Altima Interior',FALSE),

-- Toyota RAV4
('https://images.unsplash.com/photo-1617469767053-d3b523a0b982?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjByYXY0fGVufDB8fHx8MTc4MzYyNjE3N3ww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    6,'Toyota RAV4 Front View',TRUE),
('https://images.unsplash.com/photo-1622210642960-0f6a2cdbdc9f?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHx0b3lvdGElMjByYXY0fGVufDB8fHx8MTc4MzYyNjE3N3ww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    6,'Toyota RAV4 Side View',FALSE),
('https://images.unsplash.com/photo-1706509234538-9831b1b33d66?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHx0b3lvdGElMjByYXY0fGVufDB8fHx8MTc4MzYyNjE3N3ww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    6,'Toyota RAV4 Interior',FALSE),

-- Honda CR-V
('https://images.unsplash.com/photo-1681697390363-1142eb46b76d?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNydnxlbnwwfHx8fDE3ODM2MjY0NTB8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    7,'Honda CR-V Front View',TRUE),
('https://images.unsplash.com/photo-1708148246994-b7b3c818090d?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxob25kYSUyMGNydnxlbnwwfHx8fDE3ODM2MjY0NTB8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    7,'Honda CR-V Side View',FALSE),
('https://images.unsplash.com/photo-1623597780975-38ccd5030c83?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxob25kYSUyMGNydnxlbnwwfHx8fDE3ODM2MjY0NTB8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    7,'Honda CR-V Interior',FALSE),

-- Ford Explorer
('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwZXhwbG9yZXJ8ZW58MHx8fHwxNzgzNjI2NTA0fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    8,'Ford Explorer Front View',TRUE),
('https://images.unsplash.com/photo-1606611013016-969c19ba27bb?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxmb3JkJTIwZXhwbG9yZXJ8ZW58MHx8fHwxNzgzNjI2NTA0fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    8,'Ford Explorer Side View',FALSE),
('https://images.unsplash.com/photo-1670069247956-1a6dfee5338e?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxmb3JkJTIwZXhwbG9yZXJ8ZW58MHx8fHwxNzgzNjI2NTA0fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    8,'Ford Explorer Interior',FALSE),

-- Jeep Grand Cherokee
('https://images.unsplash.com/photo-1511527844068-006b95d162c2?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxqZWVwJTIwZ3JhbmQlMjBjaGVyb2tlZXxlbnwwfHx8fDE3ODM2MjY1NjZ8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    9,'Jeep Grand Cherokee Front View',TRUE),
('https://images.unsplash.com/photo-1618353482480-61ca5a9a7879?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxqZWVwJTIwZ3JhbmQlMjBjaGVyb2tlZXxlbnwwfHx8fDE3ODM2MjY1NjZ8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    9,'Jeep Grand Cherokee Side View',FALSE),
('https://images.unsplash.com/photo-1616453181857-bc79ef9d66c6?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxqZWVwJTIwZ3JhbmQlMjBjaGVyb2tlZXxlbnwwfHx8fDE3ODM2MjY1NjZ8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    9,'Jeep Grand Cherokee Interior',FALSE),

-- Subaru Forester
('https://images.unsplash.com/photo-1722542517938-aa6a98d25235?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxzdWJhcnUlMjBmb3Jlc3RlcnxlbnwwfHx8fDE3ODM2MjY2Mzh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    10,'Subaru Forester Front View',TRUE),
('https://images.unsplash.com/photo-1687048988997-ec57f83ea3bd?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxzdWJhcnUlMjBmb3Jlc3RlcnxlbnwwfHx8fDE3ODM2MjY2Mzh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    10,'Subaru Forester Side View',FALSE),
('https://images.unsplash.com/photo-1631913551163-0dd28fd69e90?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxzdWJhcnUlMjBmb3Jlc3RlcnxlbnwwfHx8fDE3ODM2MjY2Mzh8MA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    10,'Subaru Forester Interior',FALSE),

-- Ford F-150
('https://images.unsplash.com/photo-1589981941324-27c29919de98?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwZi0xNTB8ZW58MHx8fHwxNzgzNjI2Njk2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    11,'Ford F-150 Front View',TRUE),
('https://images.unsplash.com/photo-1590053936004-faca6038bfec?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxmb3JkJTIwZi0xNTB8ZW58MHx8fHwxNzgzNjI2Njk2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    11,'Ford F-150 Side View',FALSE),
('https://images.unsplash.com/photo-1704222961369-bf5738613878?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxmb3JkJTIwZi0xNTB8ZW58MHx8fHwxNzgzNjI2Njk2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    11,'Ford F-150 Interior',FALSE),

-- Chevrolet Silverado
('https://images.unsplash.com/photo-1590456744030-8b9128517cbb?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxjaGV2cm9sZXQlMjBzaWx2ZXJhZG98ZW58MHx8fHwxNzgzNjI2NzU2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    12,'Chevrolet Silverado Front View',TRUE),
('https://images.unsplash.com/photo-1597730071805-f87fe40f6796?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxjaGV2cm9sZXQlMjBzaWx2ZXJhZG98ZW58MHx8fHwxNzgzNjI2NzU2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    12,'Chevrolet Silverado Side View',FALSE),
('https://images.unsplash.com/photo-1645830102962-f2716eed466d?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxjaGV2cm9sZXQlMjBzaWx2ZXJhZG98ZW58MHx8fHwxNzgzNjI2NzU2fDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    12,'Chevrolet Silverado Interior',FALSE),

-- Ram 1500
('https://images.unsplash.com/photo-1753476778215-a49f777cd185?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxyYW0lMjAxNTAwfGVufDB8fHx8MTc4MzYyNjgwNXww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    13,'Ram 1500 Front View',TRUE),
('https://images.unsplash.com/photo-1626669249177-9fe9dbe7e825?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxyYW0lMjAxNTAwfGVufDB8fHx8MTc4MzYyNjgwNXww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    13,'Ram 1500 Side View',FALSE),
('https://images.unsplash.com/photo-1753476768634-d3f06127c7d1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxyYW0lMjAxNTAwfGVufDB8fHx8MTc4MzYyNjgwNXww&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    13,'Ram 1500 Interior',FALSE),

-- Toyota Tacoma
('https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjB0YWNvbWF8ZW58MHx8fHwxNzgzNjI2ODYzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    14,'Toyota Tacoma Front View',TRUE),
('https://images.unsplash.com/photo-1641431616381-3f0613d82ca7?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHx0b3lvdGElMjB0YWNvbWF8ZW58MHx8fHwxNzgzNjI2ODYzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    14,'Toyota Tacoma Side View',FALSE),
('https://images.unsplash.com/photo-1641333326784-24a9c21d3c4e?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHx0b3lvdGElMjB0YWNvbWF8ZW58MHx8fHwxNzgzNjI2ODYzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    14,'Toyota Tacoma Interior',FALSE),

-- GMC Sierra
('https://images.unsplash.com/photo-1657145076873-fbee01c714db?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxnbWMlMjBzaWVycmF8ZW58MHx8fHwxNzgzNjI3MDQwfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    15,'GMC Sierra Front View',TRUE),
('https://images.unsplash.com/photo-1674831422740-5ab6ba4a3d72?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxnbWMlMjBzaWVycmF8ZW58MHx8fHwxNzgzNjI3MDQwfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    15,'GMC Sierra Side View',FALSE),
('https://images.unsplash.com/photo-1601919706273-88125e95ba71?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxnbWMlMjBzaWVycmF8ZW58MHx8fHwxNzgzNjI3MDQwfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    15,'GMC Sierra Interior',FALSE),

-- Honda Odyssey
('https://images.unsplash.com/photo-1614152204567-04903fff36b0?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxob25kYSUyMG9keXNzZXl8ZW58MHx8fHwxNzgzNjI3MTAzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    16,'Honda Odyssey Front View',TRUE),
('https://images.unsplash.com/photo-1661501315831-d7a0aba599be?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxob25kYSUyMG9keXNzZXl8ZW58MHx8fHwxNzgzNjI3MTAzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    16,'Honda Odyssey Side View',FALSE),
('https://images.unsplash.com/photo-1711226876939-2e5fb5fa0096?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxob25kYSUyMG9keXNzZXl8ZW58MHx8fHwxNzgzNjI3MTAzfDA&ixlib=rb-4.1.0&w=100&fit=max&q=80',
    16,'Honda Odyssey Interior',FALSE),

-- Toyota Sienna
('https://images.unsplash.com/photo-1720545044233-d2ac77fa6030?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBzaWVubmF8ZW58MHx8fHwxNzgzNjI3MTYyfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    17,'Toyota Sienna Front View',TRUE),
('https://images.unsplash.com/photo-1573984324369-3899ec5b3a9e?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHx0b3lvdGElMjBzaWVubmF8ZW58MHx8fHwxNzgzNjI3MTYyfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    17,'Toyota Sienna Side View',FALSE),
('https://images.unsplash.com/photo-1639956624484-adc68d3c48a0?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHx0b3lvdGElMjBzaWVubmF8ZW58MHx8fHwxNzgzNjI3MTYyfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    17,'Toyota Sienna Interior',FALSE),

-- Chrysler Pacifica
('https://images.unsplash.com/photo-1623371857133-6d5552bbdc13?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxjaHJ5c2xlciUyMHBhY2lmaWNhfGVufDB8fHx8MTc4MzYyNzU0Mnww&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    18,'Chrysler Pacifica Front View',TRUE),
('https://images.unsplash.com/photo-1623371871371-5ce94f7188df?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxjaHJ5c2xlciUyMHBhY2lmaWNhfGVufDB8fHx8MTc4MzYyNzU0Mnww&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    18,'Chrysler Pacifica Side View',FALSE),
('https://images.unsplash.com/photo-1623372090464-c9481c05dd71?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxjaHJ5c2xlciUyMHBhY2lmaWNhfGVufDB8fHx8MTc4MzYyNzU0Mnww&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    18,'Chrysler Pacifica Interior',FALSE),

-- Kia Carnival
('https://images.unsplash.com/photo-1672216197924-89b8d14a47b1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxraWElMjBjYXJuaXZhbHxlbnwwfHx8fDE3ODM2Mjc2MDF8MA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    19,'Kia Carnival Front View',TRUE),
('https://images.unsplash.com/photo-1709791195523-4e9382c2dc6b?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxraWElMjBjYXJuaXZhbHxlbnwwfHx8fDE3ODM2Mjc2MDF8MA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    19,'Kia Carnival Side View',FALSE),
('https://images.unsplash.com/photo-1653022779664-3a9d0616548c?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxraWElMjBjYXJuaXZhbHxlbnwwfHx8fDE3ODM2Mjc2MDF8MA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    19,'Kia Carnival Interior',FALSE),

-- Ford Transit Connect
('https://images.unsplash.com/photo-1738015460552-4096148534ad?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwdHJhbnNpdCUyMGNvbm5lY3R8ZW58MHx8fHwxNzgzNjI3NjcxfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    20,'Ford Transit Connect Front View',TRUE),
('https://images.unsplash.com/photo-1712742353511-4462353204b8?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxmb3JkJTIwdHJhbnNpdCUyMGNvbm5lY3R8ZW58MHx8fHwxNzgzNjI3NjcxfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    20,'Ford Transit Connect Side View',FALSE),
('https://images.unsplash.com/photo-1612390729739-9115a36a7045?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwzfHxmb3JkJTIwdHJhbnNpdCUyMGNvbm5lY3R8ZW58MHx8fHwxNzgzNjI3NjcxfDA&ixlib=rb-4.1.0&w=800&fit=max&q=80',
    20,'Ford Transit Connect Interior',FALSE);

COMMIT;