export const schema = `#graphql

type User{
    _id:ID
    name:String,
    email:String
    cart:[String]
}

type Product{
    _id:ID
    name: String,
    image: [String],
    category: String,
    price: String,
    stars: String
}

type  Comment{
    _id:ID,
    name:String,
    discription:String
}

type Query{
    User:[User]
    singleUser(id:ID!):User
    Product:[Product]
    Comment:[Comment]
    singleProduct(id:ID!):Product
}

`