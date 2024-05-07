
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
  mater VARCHAR(255),
  color VARCHAR(255),
  art VARCHAR(255),
  text TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  img_urls TEXT[], 
  FOREIGN KEY (product_id) REFERENCES products(id)
);

UPDATE categories SET name = 'Верхняя одежда' WHERE id = 1;
ALTER TABLE product_images DROP COLUMN img_urls;
ALTER TABLE product_images 
ADD img_urls TEXT[];
SELECT 
    p.id,
    p.name,
    p.price,
    d.brand,
    d.color,
    d.art,
    d.text,
    ARRAY_AGG(pi.img_url) AS img_urls
FROM 
    products p
LEFT JOIN 
    description d ON p.id = d.product_id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id
WHERE 
    p.id = 1 -- Замените 1 на конкретный идентификатор товара
GROUP BY 
    p.id, p.name, p.price, d.brand, d.color, d.art, d.text;


SELECT p.id, p.name, p.price, d.brand, d.color, d.art, d.text, pi1.img_url as img_url1, pi2.img_url as img_url2
FROM products p
INNER JOIN categories c ON p.category_id = c.id
LEFT JOIN description d ON p.id = d.product_id
LEFT JOIN (
  SELECT product_id, img_url
  FROM product_images
  WHERE id = 1
) pi1 ON p.id = pi1.product_id
LEFT JOIN (
  SELECT product_id, img_url
  FROM product_images
  WHERE id = 2
) pi2 ON p.id = pi2.product_id;

SELECT 
    p.id, 
    p.name, 
    p.price, 
    d.brand,
    d.color,
    d.art,
    d.text,
    pi.img_url
FROM 
    products p
INNER JOIN 
    categories c ON p.category_id = c.id
LEFT JOIN 
    description d ON p.id = d.product_id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id;

UPDATE product_images
SET img_urls = ARRAY [
        '1.jpg',
        '2.jpg',
        '3.jpg'
    ]
WHERE product_id = 2;
