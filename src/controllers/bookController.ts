import { Model } from 'sequelize';
import { Book, addBook, deleteBookByIsbn, getAllBooks, searchAllBooks, updateBookByIsbn } from '../models/book';
import { BookDto } from '../dtos/book.dto';
import { DeleteBookRequest, SearchAllBookRequest, UpdateBookRequest } from '../Requests/bookRequests';

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

export const updateABookInLibrary = async (req: UpdateBookRequest): Promise<BookDto> =>{
  const {isbn} = req.params
  const { body: book } = req

  const bookUpdates = {
    title: book.title,
    author: book.author,
    available_quantity: book.availableQuantity,
    shelf_location: book.shelfLocation
  }

  await updateBookByIsbn(isbn,bookUpdates);
  
  return book
}

export const deleteABookInLibrary = async (req: DeleteBookRequest): Promise<void> =>{
  const {isbn} = req.params

  await deleteBookByIsbn(isbn);
  return
}

export const searchAllBooksInLibrary = async (req:SearchAllBookRequest ): Promise<BookDto[]> =>{
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