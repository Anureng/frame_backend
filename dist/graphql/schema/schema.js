"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
exports.schema = `#graphql

type User{
    name:String,
    email:String
}

type Product{
    name: String,
    image: [String],
    category: String,
    price: String,
    stars: String
}

type Query{
    User:[User]
    singleUser(id:ID!):User
    Product:[Product]
    singleProduct(id:ID!):Product
}

`;
