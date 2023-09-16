CREATE DATABASE users_data ;

CREATE TABLE Parents(
    user_id SERIAL PRIMARY KEY ,
    name VARCHAR (30) ,
    address VARCHAR(255) ,
    phone_no INT ,
    email VARCHAR(50),
    child_name VARCHAR(30),
    child_age INT,
    gender VARCHAR(7),
    password VARCHAR(40)
);

CREATE TABLE Bsitters(
    B_id SERIAL PRIMARY KEY ,
    name VARCHAR(30) ,
    age INT,
    gender VARCHAR(7),
    phone_no INT ,
    exp_hrs INT ,
    email VARCHAR(50),
    password VARCHAR(40),
    description VARCHAR(300),
    image BYTEA 
);

CREATE TABLE Appointments(
    app_id SERIAL PRIMARY KEY ,
    user_email VARCHAR(30) ,
    bsitter_email VARCHAR(30),
    date DATE ,
    bsitter_approval BOOLEAN ,
    hrs INT 
)
