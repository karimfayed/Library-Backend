import express from 'express';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

const port = 8000

app.listen(port)

app.use(express.json());

app.use('/books', bookRoutes);
app.use(errorHandler);
