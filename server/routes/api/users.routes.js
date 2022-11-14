'use strict';

import { Router } from "express";

import UserController from "../../controllers/users.controller";

const UserRoute = Router();

UserRoute.post("/register", UserController.register)
UserRoute.post("/login", UserController.login)
UserRoute.get("/logout", UserController.logout)

UserRoute.options("*", function(req, res, next){
    next();
});

module.exports = UserRoute;