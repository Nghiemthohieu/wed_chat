const express =require("express");
const { regiseterUser, loginUser, findUser, getUsers } = require("../controllers/userController");

const route= express.Router();

route.post("/register", regiseterUser);
route.post("/login", loginUser);
route.get("/find/:UserId", findUser);
route.get("/", getUsers);

module.exports = route;
