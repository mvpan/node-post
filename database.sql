
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE description (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  brand VARCHAR(255),
  color VARCHAR(255),
  art VARCHAR(255),
  text TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);