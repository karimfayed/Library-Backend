import { Request } from "express";
import { BookDto } from "../dtos/book.dto";

export type GetAllBooksRequest = Request;

export type AddBookRequest = Request<NonNullable<unknown>, NonNullable<unknown>, BookDto>

export type UpdateBookRequest = Request<Pick< BookDto,'isbn'>, NonNullable<unknown>, BookDto>

export type DeleteBookRequest = Request<Pick< BookDto,'isbn'>, NonNullable<unknown>, NonNullable<unknown>>

export type SearchAllBookRequest = Request<NonNullable<unknown>, {query:string}, BookDto>