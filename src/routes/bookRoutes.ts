import { NextFunction, Request, Response, Router } from 'express';
import { BookDto } from '../dtos/book.dto';
import { addBookToLibrary, getAllBooksInLibrary, searchAllBooksInLibrary } from '../controllers/bookController';
import { createdResponseHandler, okResponseHandler } from '../middlewares/responseHandlers';
import { validateAddBookRequest } from '../middlewares/validateBookRequest';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req: Request<NonNullable<unknown>, NonNullable<unknown>, BookDto>, res:Response, next:NextFunction) => {
    try {
        const responseDto = await getAllBooksInLibrary();
        okResponseHandler(responseDto, res)
    } catch (err) {
       return next(err)
    }

});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', validateAddBookRequest, async (req: Request<NonNullable<unknown>, NonNullable<unknown>, BookDto>, res:Response, next:NextFunction) =>{
    try {
      await addBookToLibrary(req.body);
      createdResponseHandler(req,res)
    } catch (err) {
       return next(err)
    }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/search', async (req: Request, res:Response, next:NextFunction) =>{
    try {
      const responseDto = await searchAllBooksInLibrary(req);
      okResponseHandler(responseDto, res)
    } catch (err) {
       return next(err)
    }
});

export default router;
