import { ApolloServer, UserInputError, gql, AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

import { DB_URI, JWT_SECRET } from './utils/config'
import mongoose from 'mongoose'
import Author from "./models/author"
import Book from "./models/book"
import User from "./models/user"

console.log('connecting to ', DB_URI)

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String,
      genre: String,
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!,
    ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int!,
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root._id }).countDocuments()
    },
  },
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
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
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        const newBook = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })
        return (await newBook.save()).populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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
  }
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7),
      JWT_SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
