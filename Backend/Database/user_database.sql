CREATE DATABASE users_data ;

CREATE TABLE Parents(
    user_id SERIAL PRIMARY KEY ,
    name VARCHAR (300) ,
    address VARCHAR(255) ,
    phone_no INT ,
    email VARCHAR(500),
    child_name VARCHAR(300),
    child_age INT,
    gender VARCHAR(7),
    password VARCHAR(400)
);

CREATE TABLE Bsitters(
    B_id SERIAL PRIMARY KEY ,
    name VARCHAR(300) ,
    age INT,
    gender VARCHAR(7),
    phone_no INT ,
    exp_hrs INT ,
    email VARCHAR(500),
    password VARCHAR(4000),
    description VARCHAR(3000),
    image VARCHAR (65530)
);

CREATE TABLE Messages(
    messageID SERIAL PRIMARY KEY ,
    consversationID INT ,
    senderID VARCHAR(500)  ,
    receiverID VARCHAR(500),
    MessageString VARCHAR(500)
);

CREATE TABLE Conversation(
    consversationID SERIAL PRIMARY KEY ,
    SenderID VARCHAR(255) ,
    RecieverID VARCHAR(255), 
);

