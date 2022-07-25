import { ApolloServer, gql } from 'apollo-server'
import { DB_URI } from './utils/config'
import mongoose from 'mongoose'
import Author from "./models/author"
import Book from "./models/book";

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String,
      genre: String,
    ): [Book!]!
    allAuthors: [Author!]!
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name })

      if (!foundAuthor) return null

      foundAuthor.born = args.setBornTo
      return foundAuthor.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
