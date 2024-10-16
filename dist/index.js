"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express_1 = __importDefault(require("express"));
const default_1 = require("@apollo/server/plugin/landingPage/default");
const database_1 = require("./database/database");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const schema_1 = require("./graphql/schema/schema");
const resolver_1 = require("./graphql/resoolver/resolver");
const problem_1 = __importDefault(require("./routes/problem"));
const app = (0, express_1.default)();
const port = 3000;
const mongoUri = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/';
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, database_1.connectDb)(mongoUri);
const server = new server_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: {
        Query: {
            User: resolver_1.getUser,
            singleUser: resolver_1.getUserById,
            Product: resolver_1.Product,
            singleProduct: resolver_1.getProductByID
        }
    },
    plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()] // Optional: Adds a landing page for development
});
// Start Apollo Server
const startServer = async () => {
    await server.start();
    // Apply Apollo middleware to Express
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    // Start Express server
    app.listen(port, () => {
        console.log(`Apollo Server running at http://localhost:${port}/graphql`);
    });
};
startServer().catch(err => {
    console.error('Error starting server:', err);
});
app.use("/", user_1.default);
app.use("/", problem_1.default);
// Basic route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
// const url = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/';
// // API route
app.get('/api/greet', (req, res) => {
    const name = req.query.name || 'World';
    return res.json({ message: `Hello, ${name}!` });
});
// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
