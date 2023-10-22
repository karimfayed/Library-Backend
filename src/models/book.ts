import { Sequelize, Model, DataTypes, Op } from 'sequelize' 
import { BooksErrorMessages } from '../constants/BooksErrorMessages';
import { BookDto } from '../dtos/book.dto';
import { InternalServerError } from '../errors/InternalServerError';

const sequelize = new Sequelize('librarydb', 'root', 'admin@123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });

export class Book extends Model {
    public title!: string;
    public author!: string;
    public isbn!: string;
    public available_quantity!: number;
    public shelf_location!: string;
    public is_active!:number

}

Book.init(
  {
    isbn: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
    primaryKey: true,
    },
    title: {
    type: DataTypes.STRING(255),
    allowNull: false
    },
    author: {
    type: DataTypes.STRING(255),
    allowNull: false
    },
    available_quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    },
    shelf_location: {
    type: DataTypes.STRING(255),
    allowNull: false,
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
  },
  {
    tableName: 'book',
    sequelize,
  }
);

void Book.sync();

export const addBook = async (bookDto: BookDto) =>{
  const { title, author, isbn, availableQuantity, shelfLocation } = bookDto ;
  const book = new Book({
    title: title,
    author: author,
    isbn: isbn,
    available_quantity: availableQuantity,
    shelf_location:shelfLocation,
    is_active: 1 
  });

  try {
    const newBook = await book.save();
    return newBook
  } catch (err) {
      throw new InternalServerError(BooksErrorMessages.AddingBookToDatabaseError)
  }
}

export const getAllBooks = async (): Promise<Book[]> => {
    const books = await Book.findAll({
      where: {
        is_active: 1,
      },
    });
    return books ;
};

export const searchAllBooks = async (query:string): Promise<Book[]> => {
    const books = await Book.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { author: { [Op.like]: `%${query}%` } },
            { isbn: { [Op.like]: `%${query}%` } },
          ],
          is_active:1
        },
      });
    return books ;
};

export const getBookByIsbn = async (isbn: string): Promise<Book | null> => {  
  const book = await Book.findOne({
      where: {
        isbn,
        is_active: 1,
      },
    });
    return book;
  };

export const updateBookByIsbn = async (isbn: string, updates: Partial<BookDto>) => {
  const updatedBook = await Book.update(updates, {
    where: {
      isbn,
      is_active: 1,
    },
  });
  return updatedBook;
};

export const deleteBookByIsbn = async (isbn: string) => {
  const deletedBook = await Book.update({is_active:0}, {
    where: {
      isbn,
    },
  });
  return deletedBook;
};