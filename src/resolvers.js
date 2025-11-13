// Minimal resolvers skeleton
const db = require('./db');
const pubsub = require('./pubsub');
module.exports = {
  Query: { products: async (_, { categoryId }) => { /* db.query(...) */ } },
  Mutation: { createProduct: async (_, args) => { /* insert, pubsub.publish('PRODUCT_UPDATED', { productUpdated: ... }) */ } },
  Subscription: { productUpdated: { subscribe: () => pubsub.asyncIterator(['PRODUCT_UPDATED']) } }
};