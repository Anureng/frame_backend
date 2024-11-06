import { ApolloServer } from '@apollo/server';
import express, { Request, Response } from 'express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { connectDb } from './database/database';
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors"
import router from './routes/user';
import { schema } from './graphql/schema/schema';
import { getProductByID, getUser, getUserById, Product } from './graphql/resoolver/resolver';
import routerProblem from './routes/problem';
import { init } from './src/start.services';
const app = express();
const port = 3001;
const mongoUri = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/'
// Middleware to parse JSON
app.use(express.json());
app.use(cors())
connectDb(mongoUri)
const server = new ApolloServer({
    typeDefs: schema,
    resolvers: {
        Query: {
            User: getUser,
            singleUser: getUserById,
            Product: Product,
            singleProduct: getProductByID
        }
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()] // Optional: Adds a landing page for development
});

// Start Apollo Server
const startServer = async () => {
    await server.start();

    // Apply Apollo middleware to Express
    app.use('/graphql', expressMiddleware(server));

    // Start Express server
    app.listen(port, () => {
        console.log(`Apollo Server running at http://localhost:${port}/graphql`);
    });
};

startServer().catch(err => {
    console.error('Error starting server:', err);
});

app.use("/", router)
app.use("/", routerProblem)

init()
// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});
// const url = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/';
// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
