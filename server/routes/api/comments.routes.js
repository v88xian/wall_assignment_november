'use strict';

import { Router } from "express";

import CommentController from "../../controllers/comments.controller";

const CommentRoute = Router();

CommentRoute.post("/create", CommentController.create)
CommentRoute.post("/delete", CommentController.delete)

CommentRoute.options("*", function(req, res, next){
    next();
});

module.exports = CommentRoute;