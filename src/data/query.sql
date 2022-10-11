
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    address JSON,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    status CHARACTER VARYING(1) DEFAULT 'A',
    added_by numeric DEFAULT 1,
    added_date timestamp DEFAULT NOW(),
    modified_by numeric DEFAULT 1,
    modified_date timestamp DEFAULT NOW()
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    name TEXT,
    rating numeric,
    casts JSON,
    genre TEXT,
    release_date date,
    added_by numeric DEFAULT 1,
    added_date timestamp DEFAULT NOW(),
    modified_by numeric DEFAULT 1,
    modified_date timestamp DEFAULT NOW()
);


