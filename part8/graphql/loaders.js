import DataLoader from 'dataloader';
import Book from './models/book';

const bookLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({
    author: { $in: authorIds }
  })

  const counts = authorIds
    .map((id) => books.filter((book) => book.author.equals(id)).length)

  return counts
})

export default { bookLoader }
