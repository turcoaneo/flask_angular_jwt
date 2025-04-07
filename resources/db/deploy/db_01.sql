CREATE DATABASE dev_db;
use dev_db;

CREATE TABLE user_account (
                              id int NOT NULL AUTO_INCREMENT,
                              alias varchar(30) UNIQUE,
                              email varchar(50) UNIQUE,
                              created DATETIME DEFAULT CURRENT_TIMESTAMP,
                              updated DATETIME NOT NULL,
                              expire DATETIME,
                              password varchar(100),
                              PRIMARY KEY (id)
);