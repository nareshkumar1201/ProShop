import express from "express";
import connectDB from "./config/db.js";
import ProductsData from "./data/products.js";
import dotenv from "dotenv";
import productsRoutes from "./routes/productsRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

connectDB(); // connecting to mongodb

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("API is running ");
});

app.use("/api/products", productsRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listing to port: ${PORT}`);
});
