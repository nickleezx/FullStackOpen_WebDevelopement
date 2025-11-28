import { ApolloServer } from "@apollo/server";
import jwt from "jsonwebtoken";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuid } from "uuid";
import { loadEnvFile } from "node:process";
import mongoose from "mongoose";
import Book from "./schemas/bookSchema.js";
import Author from "./schemas/authorSchema.js";
import User from "./schemas/userSchema.js";
import { MIN_NAME_LENGTH } from "./schemas/authorSchema.js";
import { MIN_BOOK_TITLE_LENGTH } from "./schemas/bookSchema.js";
import { __InputValue, GraphQLError } from "graphql";
import { error } from "node:console";

loadEnvFile();

const MONGO_URI = process.env.MONGO_URI;
const USER_PASSWORD = process.env.PASSWORD;

console.log("connecting to ", MONGO_URI);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((e) => console.log("error connecting to MongoDB: ", e.message));

// let authors = [
//     {
//         name: "Robert Martin",
//         id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//         born: 1952,
//     },
//     {
//         name: "Martin Fowler",
//         id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//         born: 1963,
//     },
//     {
//         name: "Fyodor Dostoevsky",
//         id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//         born: 1821,
//     },
//     {
//         name: "Joshua Kerievsky", // birthyear not known
//         id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//     },
//     {
//         name: "Sandi Metz", // birthyear not known
//         id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//     },
// ];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

// let books = [
//     {
//         title: "Clean Code",
//         published: 2008,
//         author: "Robert Martin",
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring"],
//     },
//     {
//         title: "Agile software development",
//         published: 2002,
//         author: "Robert Martin",
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ["agile", "patterns", "design"],
//     },
//     {
//         title: "Refactoring, edition 2",
//         published: 2018,
//         author: "Martin Fowler",
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring"],
//     },
//     {
//         title: "Refactoring to patterns",
//         published: 2008,
//         author: "Joshua Kerievsky",
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring", "patterns"],
//     },
//     {
//         title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//         published: 2012,
//         author: "Sandi Metz",
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ["refactoring", "design"],
//     },
//     {
//         title: "Crime and punishment",
//         published: 1866,
//         author: "Fyodor Dostoevsky",
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ["classic", "crime"],
//     },
//     {
//         title: "Demons",
//         published: 1872,
//         author: "Fyodor Dostoevsky",
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ["classic", "revolution"],
//     },
// ];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [AuthorWithCount!]!
    me: User
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type AuthorWithCount {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Author {
    name: String!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        password: String!
    ): Token
    login (
        username: String!
        password: String!
    ): Token
  }
`;

const resolvers = {
    Book: {
        author: async (root) => {
            const authorId = root.author;
            return await Author.findById(authorId);
        },
    },
    AuthorWithCount: {
        bookCount: async (root) => {
            const authorId = root._id;
            const books = await Book.find({ author: authorId });
            return books.length;
        },
    },
    Query: {
        bookCount: async () => await Book.countDocuments({}),
        authorCount: async () => await Author.countDocuments({}),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return await Book.find({});
            }
            const filter = {};

            const author = args.author;
            if (author) {
                filter.author = author;
            }
            const genre = args.genre;
            if (genre) {
                filter.genre = genre;
            }

            const result = await Book.find(filter);
            return result;
        },
        allAuthors: async () => {
            return await Author.find({});
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError("Sign in to continue", {
                    extensions: {
                        code: "UNAUTHORISED",
                    },
                });
            }

            const { title, author, published, genres } = args;
            if (author.length < MIN_NAME_LENGTH) {
                throw new GraphQLError("Length of name is too short", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: author,
                    },
                });
            }
            if (title.length < MIN_BOOK_TITLE_LENGTH) {
                throw new GraphQLError("Length of title is too short", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: title,
                    },
                });
            }

            const foundAuthor = await Author.findOne({ name: author });
            let authorId;
            if (!foundAuthor) {
                const newAuthor = new Author({ name: author });
                const savedAuthor = await newAuthor.save();
                authorId = savedAuthor._id;
            } else {
                authorId = foundAuthor._id;
            }

            const newBook = new Book({
                title,
                author: authorId,
                published,
                genres,
                id: uuid(),
            });
            try {
                await newBook.save();
            } catch (error) {
                throw new GraphQLError("Failed to create book entry", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: title,
                        error,
                    },
                });
            }
            return newBook;
            // books = books.concat(newBook);
            // return newBook;
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError("Sign in to continue", {
                    extensions: {
                        code: "UNAUTHORISED",
                    },
                });
            }

            const { name, setBornTo } = args;
            const foundAuthor = await Author.findOne({ name });
            if (!foundAuthor) {
                throw new GraphQLError("Failed to find author", {
                    extensions: {
                        code: "AUTHOR_NOT_FOUND",
                        invalidArgs: name,
                        error,
                    },
                });
            }

            foundAuthor.born = setBornTo;
            return await foundAuthor.save();
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username });
            console.log(args.username);

            await user.save().catch((error) => {
                throw new GraphQLError("Failed to create new user", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                        error,
                    },
                });
            });

            const userForToken = {
                username: args.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
        login: async (root, args) => {
            const { username, password } = args;
            const user = await User.findOne({ username });

            if (!user || password !== USER_PASSWORD) {
                throw new GraphQLError("Wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const userForToken = {
                username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        if (req.body?.operationName === "IntrospectionQuery") {
            return;
        }

        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            );
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
