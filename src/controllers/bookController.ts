import { Model } from 'sequelize';
import { Book, addBook, getAllBooks, searchAllBooks } from '../models/book';
import { BookDto } from '../dtos/book.dto';
import { Request } from 'express';

export const addBookToLibrary = async (book: BookDto): Promise<BookDto> => {

  const newBook = await addBook(book)

  const responseDto: BookDto = {
    title: newBook.title,
    author: newBook.author,
    isbn: newBook.isbn,
    availableQuantity: newBook.available_quantity,
    shelfLocation: newBook.shelf_location,
  };
  return responseDto

}

export const getAllBooksInLibrary = async (): Promise<BookDto[]> =>{
  const books = await getAllBooks();

  const responseDto: BookDto[] = books.map((book:Model<Book>) => ({
    title: book.dataValues.title,
    author: book.dataValues.author,
    isbn: book.dataValues.isbn,
    availableQuantity: book.dataValues.available_quantity,
    shelfLocation: book.dataValues.shelf_location,
  }));
  
  return responseDto
}

export const searchAllBooksInLibrary = async (req: Request): Promise<BookDto[]> =>{
  const { query: searchQuery } = req.query
  const books = await searchAllBooks(searchQuery as unknown as string);

  const responseDto: BookDto[] = books.map((book:Model<Book>) => ({
    title: book.dataValues.title,
    author: book.dataValues.author,
    isbn: book.dataValues.isbn,
    availableQuantity: book.dataValues.available_quantity,
    shelfLocation: book.dataValues.shelf_location,
  }));
  
  return responseDto
}