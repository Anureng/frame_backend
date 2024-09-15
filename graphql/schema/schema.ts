export const schema = `#graphql

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

`