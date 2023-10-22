import { Request, Response } from "express";
import { BookDto } from "../dtos/book.dto";
import { HttpStatusCode } from "../constants/HttpStatusCode";

export const createdResponseHandler = (req: Request, res:Response) =>{
    res.status( HttpStatusCode.Created)
    .send(req.body)
}

export const okResponseHandler = (bookDto: BookDto[], res:Response) =>{
    res.status( HttpStatusCode.OK)
    .send(bookDto)
}

export const noContentResponseHandler = (res:Response) =>{
    res.status(HttpStatusCode.NoContent)
}