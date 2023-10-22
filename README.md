# Library-Backend

## This README File is to give an overview of what has been used in this project and also to highlight the things that I didn't have time to do and aware of them

This project assumes that ISVB is a unique identifier for books

### Main things that have been showcased in this project:
 - Express in Typescript
 - ESLint, Prettier, Husky and Jest (done just to showcase that I know how it is done)
 - .Env file creation 
 - Scripts for Database creation and seed data
 - Open APi Spec

### Things that were not done but I'm aware of (didn't have the time to do)
 - Endpoints related to borrowers
 - Handling unsupported endpoints


### How to use
- Copy open api spec file into swagger or view it using vscode plugin
- Connect to database locally and run the `crt-library-tables.sql` followed by `load-seed.sql`
- Create a .env file and add the following variables in it:

    HOST = "localhost"
    
    DATABASE = "librarydb"
    
    DATABASE_USER = "Your database username"
    
    DATABASE_PASSWORD = "Your database password"
- Run the following command then use Postman to test the endpoints `npm run dev`

