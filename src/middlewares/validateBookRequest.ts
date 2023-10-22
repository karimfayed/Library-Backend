import { Request, Response, NextFunction } from 'express';
import { BookDto } from '../dtos/book.dto';
import { BadRequestError } from '../errors/BadRequestError';
import { BooksErrorMessages } from '../constants/BooksErrorMessages';
 import { getBookByIsbn } from '../models/book';

export const validateAddBookRequest = async (req: Request<NonNullable<unknown>, NonNullable<unknown>, BookDto>, _res: Response, next: NextFunction) => {
  const { body: book } = req
  try {
    validateRequiredFields(book)
    await validateIsbn(book)
  } catch (error) {
    return next(error);
  }
  return next();
};

const validateRequiredFields = (book: BookDto) =>{
  const areValid = areRequiredFieldsPresent(book)
  if(!areValid)
   throw new BadRequestError(BooksErrorMessages.RequiredFieldsMissing)
}

const validateIsbn = async (book: BookDto):Promise<void | never> =>{
  validateIsbnSize(book.isbn)
  await validateIsbnExist(book.isbn)
}

const areRequiredFieldsPresent = (book: BookDto) =>{
  const { title, author, isbn, availableQuantity, shelfLocation } = book;
  return title && author && isbn && availableQuantity && shelfLocation
}

const validateIsbnSize = (isbn:string) =>{
  const isValid = isIsbnSizeValid(isbn) 
  if(!isValid)
    throw new BadRequestError(BooksErrorMessages.InvalidISBN)
}

const validateIsbnExist = async (isbn:string):Promise<void | never> =>{
  const isBookExist =  await getBookByIsbn(isbn)

  if(isBookExist)
    throw new BadRequestError(BooksErrorMessages.InvalidISBN)
}

const isIsbnSizeValid = (isbn:string) =>{
  return isbn.length === 13
}