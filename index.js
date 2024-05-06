const express = require("express");
const productRouter = require("./routes/product.route");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); // Указываем разрешенный источник
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Указываем разрешенные методы запросов
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Указываем разрешенные заголовки
  next();
});
app.use(express.static(path.resolve(__dirname, "img")));
app.use(express.json());

app.use("/api", productRouter);

app.listen(PORT, () => console.log("ok"));
