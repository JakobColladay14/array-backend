USE array;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    primary key(id),
    email varchar(255),
    password varchar(255),
    salt varchar(255),
    createdAt date,
    updatedAt date
);