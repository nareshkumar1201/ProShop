import dotenv from "dotenv";

import Product from "./models/productModel.js";
import Users from "./models/usersModel.js";
import Orders from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
// import colors from "colors";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Orders.deleteMany();
    await Users.deleteMany();
    await Product.deleteMany();

    const users_in_db = await Users.insertMany(users);

    const adminUser = users_in_db[0]._id;

    const productsCreated = products.map((product) => {
      return { ...product, User: adminUser };
    });

    await Product.insertMany(productsCreated);

    console.log("Data inserted...!");
    process.exit();
  } catch (error) {
    console.log(`error importing data : ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Orders.deleteMany();
    await Users.deleteMany();
    await Product.deleteMany();
    console.log("Destroyed Data");
  } catch (error) {
    console.log(`error destroying data : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
