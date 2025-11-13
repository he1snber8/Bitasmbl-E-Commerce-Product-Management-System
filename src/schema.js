// Example typeDefs skeleton
const { gql } = require('apollo-server-express');
module.exports = gql`
  type Product { id: ID!, name: String!, price: Float!, categoryId: ID }
  type Category { id: ID!, name: String! }
  type Order { id: ID!, total: Float!, items: [Product!]! }
  type Query { products(categoryId: ID): [Product!]! }
  type Mutation { createProduct(name: String!, price: Float!, categoryId: ID): Product }
  type Subscription { productUpdated: Product }
`;