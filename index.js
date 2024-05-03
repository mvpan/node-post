const express = require("express");
const productRouter = require("./routes/product.route");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/api", productRouter);

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
