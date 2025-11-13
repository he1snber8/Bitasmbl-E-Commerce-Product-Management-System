// Start Apollo Server with Express and PostgreSQL connection
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// require('./schema') and require('./resolvers') to be implemented next
// create app, applyMiddleware and listen on process.env.PORT || 4000
// run: npm run dev