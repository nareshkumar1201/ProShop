import express from "express";
import connectDB from "./config/db.js";
import ProductsData from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();

connectDB(); // connecting to mongodb

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("API is running ");
});

app.get("/api/products", (req, res, next) => {
  res.json(ProductsData);
});

app.get("/api/products/:id", (req, res, next) => {
  const product = ProductsData.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => {
  console.log("app listing to port 5000");
});
