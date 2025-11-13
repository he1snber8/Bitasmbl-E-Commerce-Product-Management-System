-- Create minimal tables
CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT NOT NULL, price NUMERIC(10,2), category_id INT REFERENCES categories(id));
CREATE TABLE orders (id SERIAL PRIMARY KEY, total NUMERIC(10,2));
CREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INT REFERENCES orders(id), product_id INT REFERENCES products(id), quantity INT);
