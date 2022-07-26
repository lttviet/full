import { UserInputError, AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'

import { JWT_SECRET } from './utils/config'
import Author from "./models/author"
import Book from "./models/book"
import User from "./models/user"

const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: async ({ _id }, args, { loaders }) => {
      return loaders.bookLoader.load(_id)
    },
  },
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      console.log('allbooks')
      let books = null
      let foundAuthorId = null

      if (args.author) {
        foundAuthorId = (await Author.findOne({ name: args.author }, '_id'))._id
      }

      if (args.author && args.genre) {
        books = Book.find({
          author: foundAuthorId,
          genres: args.genre
        })
      } else if (args.author) {
        books = Book.find({
          author: foundAuthorId,
        })
      } else if (args.genre) {
        books = Book.find({
          genres: args.genre
        })
      } else {
        books = Book.find({})
      }

      return books.populate('author')
    },
    recommend: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const books = await Book.find({ genres: context.currentUser.favouriteGenre }).populate('author')

      const result = {
        favouriteGenre: context.currentUser.favouriteGenre,
        books,
      }

      return result
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      })

      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        newBook.author = author._id
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const returnedBook = await newBook.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: returnedBook })

      return returnedBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const foundAuthor = await Author.findOne({ name: args.name })

        if (!foundAuthor) return null

        foundAuthor.born = args.setBornTo
        return foundAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

export default resolvers
