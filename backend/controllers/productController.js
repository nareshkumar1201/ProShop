import asyncHandler from "../middleware/asyncHandler.js";
import ProductsData from "../models/productModel.js";
const getProduct = asyncHandler(async (req, res, next) => {
  const products = await ProductsData.find({});
  return res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res, next) => {
  const product = await ProductsData.findById(req.params.id);

  if (product) {
    return res.status(200).json(product);
  }
  res.status(404);
  throw new Error("Resource Not Found");
});

export { getProduct, getProductById };
