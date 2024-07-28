import bcrypt from "bcryptjs";

const users = [
  {
    isAdmin: true,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: "admin user",
  },
  {
    name: "john",
    password: bcrypt.hashSync("123456", 10),
    email: "jhon@gmail.com",
    isAdmin: false,
  },
  {
    name: "ravi",
    password: bcrypt.hashSync("123456", 10),
    email: "ravi@gmail.com",
    isAdmin: false,
  },
];

export default users;
