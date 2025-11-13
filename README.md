# Bitasmbl-E-Commerce-Product-Management-System — title

Description

A full-stack admin dashboard to manage e-commerce products, categories, and orders. The system provides create, read, update, and delete operations for products, organizes products into categories with filtering, stores product and order data persistently in PostgreSQL, exposes GraphQL APIs for the front-end, and delivers real-time updates to the React dashboard.

## Tech Stack

- API: GraphQL
- Back-End: Node.js
- Database: PostgreSQL
- Front-End: React

## Requirements

- Manage products with create, read, update, and delete operations
- Organize products into categories and allow filtering
- Store product and order data persistently
- Provide APIs for the front-end to fetch and modify data
- Display a responsive dashboard with product statistics

## Installation

Prerequisites:
- Node.js (14+)
- npm (or yarn)
- PostgreSQL (10+)
- Git

1. Clone the repository

   git clone https://github.com/he1snber8/Bitasmbl-E-Commerce-Product-Management-System.git
   cd Bitasmbl-E-Commerce-Product-Management-System

2. Server setup (Node.js + GraphQL + PostgreSQL)

   cd server

   # Copy example env and edit values
   cp .env.example .env

   # Edit .env and set at minimum:
   # DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
   # PORT=4000

   # Install dependencies
   npm install

   # Create the PostgreSQL database (example using psql):
   # Adjust connection parameters to match your PostgreSQL setup
   psql -U postgres -c "CREATE DATABASE ecom_prod_mgmt;"

   # Initialize database schema - a migrations folder or SQL script is included
   # This command runs the provided SQL migration file against DATABASE_URL
   psql "$DATABASE_URL" -f migrations/init.sql

   # Start the GraphQL server in development
   npm run dev

   # Production start (after build) typically:
   # npm run build
   # npm start

3. Client setup (React)

   cd ../client

   # Copy example env and edit values
   cp .env.example .env

   # Edit .env and set at minimum:
   # REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
   # (If using subscriptions via WebSocket, set REACT_APP_GRAPHQL_WS_URL=ws://localhost:4000/graphql)

   # Install dependencies
   npm install

   # Start the React development server
   npm start

After both servers are running:
- Open the dashboard at http://localhost:3000 (default React dev server port)
- GraphQL API will be available at the URL set in REACT_APP_GRAPHQL_URL (default http://localhost:4000/graphql)

## Usage

- Use the React admin dashboard to create, read, update, and delete products.
- Create and manage categories and filter products by category on the dashboard.
- View and manage orders stored in PostgreSQL from the Orders view.
- Dashboard provides product statistics (counts, low-stock warnings, recent orders).
- Real-time updates: when product or order changes occur, the front-end receives updates via GraphQL subscriptions / WebSocket so the dashboard reflects changes immediately.

## Implementation Steps

1. Repository layout
   - Create two top-level folders: /server (Node.js + GraphQL) and /client (React).
   - Add .env.example files to both subprojects describing required environment variables.

2. Database schema
   - Define SQL schema in /server/migrations/init.sql with tables such as:
     - categories(id PK, name, created_at)
     - products(id PK, name, description, price, stock, category_id FK, created_at, updated_at)
     - orders(id PK, customer_info JSON or columns, total_amount, status, created_at)
     - order_items(id PK, order_id FK, product_id FK, quantity, unit_price)
   - Provide indexes on foreign keys and fields used for filtering/search.

3. GraphQL schema design
   - Define types: Category, Product, Order, OrderItem, Query, Mutation, Subscription.
   - Example Queries: products(filter, pagination), product(id), categories(), orders(filter).
   - Example Mutations: createProduct(input), updateProduct(id, input), deleteProduct(id), createCategory(input), createOrder(input), updateOrderStatus(id, status).
   - Example Subscriptions: productUpdated, orderCreated, orderUpdated.

4. Node.js server
   - Set up a GraphQL server in /server that connects to PostgreSQL using a node Postgres client (pg) or an ORM/query builder of choice.
   - Implement resolvers for Queries, Mutations, and Subscriptions.
   - Ensure the GraphQL endpoint (e.g. /graphql) accepts queries and supports WebSocket connections for subscriptions.
   - Add validation and basic error handling for input.

5. Persistence and migrations
   - Keep SQL migration files in /server/migrations and provide a script or instructions to run them against DATABASE_URL.
   - Seed initial categories and test products if needed with a seed script.

6. React front-end
   - Build a responsive admin dashboard in /client using React.
   - Connect to the GraphQL API using a GraphQL client that supports subscriptions (configure REACT_APP_GRAPHQL_URL and REACT_APP_GRAPHQL_WS_URL).
   - Implement pages/components: Product List (with filtering by category and search), Product Editor (create/update), Category Management, Orders List/Details, Dashboard (statistics widgets: total products, low stock, recent orders).
   - Implement optimistic UI updates where appropriate and subscribe to real-time updates to refresh views.

7. Scripts and developer ergonomics
   - Provide npm scripts in both /server and /client for start, dev, build, and test.
   - Add a top-level README and run scripts to start both services for local development.

8. Security and configuration
   - Keep credentials and secrets out of source control; use .env and document required variables in .env.example.
   - Consider adding basic authentication/authorization for admin access (out of scope for the base implementation but document extension points).

9. Testing
   - Add basic integration tests for GraphQL resolvers and end-to-end tests for critical flows (create product, update stock, create order).

(Optional) ## API Endpoints

This project exposes a GraphQL API endpoint rather than REST endpoints. Typical API surface (GraphQL) you should implement:

- Endpoint URL
  - POST /graphql (for queries and mutations)
  - WS  /graphql (for subscriptions over WebSocket)

- Typical Queries
  - products(filter: ProductFilter, pagination: Pagination): [Product]
  - product(id: ID!): Product
  - categories: [Category]
  - orders(filter: OrderFilter, pagination: Pagination): [Order]

- Typical Mutations
  - createProduct(input: CreateProductInput!): Product
  - updateProduct(id: ID!, input: UpdateProductInput!): Product
  - deleteProduct(id: ID!): DeleteResponse
  - createCategory(input: CreateCategoryInput!): Category
  - createOrder(input: CreateOrderInput!): Order
  - updateOrderStatus(id: ID!, status: OrderStatus!): Order

- Typical Subscriptions
  - productUpdated: Product
  - orderCreated: Order
  - orderUpdated: Order

Notes and Links

- Repository (clone): https://github.com/he1snber8/Bitasmbl-E-Commerce-Product-Management-System
- Use the .env.example files as a reference for required environment variables in both server and client.

If you follow the installation steps above and implement the GraphQL schema and database migration SQL as outlined, you will be able to run the admin dashboard locally to manage products, categories, and orders with persistent storage and real-time front-end updates.