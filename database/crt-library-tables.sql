drop database librarydb;
-- -----------------------------------------------------
-- Create database and tables
-- -----------------------------------------------------

CREATE DATABASE librarydb;

-- -----------------------------------------------------
-- schema librarydb
-- -----------------------------------------------------

USE librarydb;

-- -----------------------------------------------------
-- table book
-- -----------------------------------------------------

CREATE TABLE book (
  isbn VARCHAR(13) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  available_quantity INT NOT NULL,
  shelf_location VARCHAR(255) NOT NULL,
  is_active TINYINT UNSIGNED NOT NULL
);

-- -----------------------------------------------------
-- table borrowers
-- -----------------------------------------------------

CREATE TABLE borrowers (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  register_date DATETIME NOT NULL,
  is_active TINYINT UNSIGNED NOT NULL
);

-- -----------------------------------------------------
-- table borrowings
-- -----------------------------------------------------

CREATE TABLE borrowings (
  borrowing_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) NOT NULL,
  checkout_date DATETIME NOT NULL,
  due_date DATETIME NOT NULL,
  is_active TINYINT UNSIGNED NOT NULL,
  FOREIGN KEY (email) REFERENCES borrowers(email),
  FOREIGN KEY (isbn) REFERENCES book(isbn)
);