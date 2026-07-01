-- This file accumulates changes 

-- Contact form table
CREATE TABLE IF NOT EXISTS contact_form (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table for role-based access control
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed roles (idempotent - safe to run multiple times)
INSERT INTO roles (role_name, role_description) 
VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access')
    ('employee', 'User who works for the organization and has access to the system to perform assigned job responsibilities')
ON CONFLICT (role_name) DO NOTHING;

-- Registration form table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id INTEGER NOT NULL DEFAULT 1 REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

