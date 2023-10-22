import { NextFunction, Response, Router } from 'express';
import { addBookToLibrary, deleteABookInLibrary, getAllBooksInLibrary, searchAllBooksInLibrary, updateABookInLibrary } from '../controllers/bookController';
import { createdResponseHandler, noContentResponseHandler, okResponseHandler } from '../middlewares/responseHandlers';
import { validateAddBookRequest, validateDeleteBookRequest, validateUpdateBookRequest } from '../middlewares/validateBookRequest';
import { AddBookRequest, DeleteBookRequest, GetAllBooksRequest, SearchAllBookRequest, UpdateBookRequest } from '../Requests/bookRequests';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req: GetAllBooksRequest, res:Response, next:NextFunction) => {
    try {
        const responseDto = await getAllBooksInLibrary();
        okResponseHandler(responseDto, res)
    } catch (err) {
       return next(err)
    }

});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', validateAddBookRequest, async (req: AddBookRequest, res:Response, next:NextFunction) =>{
    try {
      await addBookToLibrary(req.body);
      createdResponseHandler(req,res)
    } catch (err) {
       return next(err)
    }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:isbn', validateUpdateBookRequest, async (req: UpdateBookRequest, res:Response, next:NextFunction) =>{
  try {
    const responseDto = await updateABookInLibrary(req);
    okResponseHandler(responseDto, res)
  } catch (err) {
     return next(err)
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/:isbn', validateDeleteBookRequest, async (req: DeleteBookRequest, res:Response, next:NextFunction) =>{
  try {
    await deleteABookInLibrary(req);
    noContentResponseHandler(res)
  } catch (err) {
     return next(err)
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/search', async (req: SearchAllBookRequest, res:Response, next:NextFunction) =>{
    try {
      const responseDto = await searchAllBooksInLibrary(req);
      okResponseHandler(responseDto, res)
    } catch (err) {
       return next(err)
    }
});

export default router;
