/* 
 * Load seed data into an empty librarydb
 */

-- -----------------------------------------------------
-- schema librarydb
-- -----------------------------------------------------

USE librarydb;

-- -----------------------------------------------------
-- set variables
-- -----------------------------------------------------
set @register_date = now();
set @checkout_date = now();
set @due_date = DATE_ADD(NOW(), INTERVAL 7 DAY);
set @is_active = 1;

-- -----------------------------------------------------
-- table books
-- -----------------------------------------------------

INSERT INTO books (isbn, title, author, available_quantity, shelf_location, is_active)
VALUES ('9783161484100', 'The Great Gatsby', 'F. Scott Fitzgerald', 10, 'A1', @is_active);

INSERT INTO books (isbn, title, author, available_quantity, shelf_location, is_active)
VALUES ('9780142437261', 'Pride and Prejudice', 'Jane Austen', 5, 'B2', @is_active);

INSERT INTO books (isbn, title, author, available_quantity, shelf_location, is_active)
VALUES ('9780061120084', 'To Kill a Mockingbird', 'Harper Lee', 7, 'C3', @is_active);

-- -----------------------------------------------------
-- table borrowers
-- -----------------------------------------------------

INSERT INTO borrowers (email, name, address, register_date, is_active)
VALUES ('john.doe@example.com', 'John Doe', '123 Main St', @register_date, @is_active);

INSERT INTO borrowers (email, name, address, register_date, is_active)
VALUES ('jane.doe@example.com', 'Jane Doe', '456 Oak St', @register_date, @is_active);

INSERT INTO borrowers (email, name, address, register_date, is_active)
VALUES ('bob.smith@example.com', 'Bob Smith', '789 Maple Ave', @register_date, @is_active);

-- -----------------------------------------------------
-- table borrowings
-- -----------------------------------------------------

INSERT INTO borrowings (email, isbn, title, author, checkout_date, due_date, is_active)
VALUES ('john.doe@example.com', '9783161484100', 'The Great Gatsby', 'F. Scott Fitzgerald', @checkout_date, @due_date, @is_active);

INSERT INTO borrowings (email, isbn, title, author, checkout_date, due_date, is_active)
VALUES ('jane.doe@example.com', '9780142437261', 'Pride and Prejudice', 'Jane Austen', @checkout_date, @due_date, @is_active);

INSERT INTO borrowings (email, isbn, title, author, checkout_date, due_date, is_active)
VALUES ('bob.smith@example.com', '9780061120084', 'To Kill a Mockingbird', 'Harper Lee', @checkout_date, @due_date, @is_active);