import UserRoutes from "../routes/api/users.routes";
import MessageRoutes from "../routes/api/messages.routes";
import CommentRoutes from "../routes/api/comments.routes";

let APIRoute = (App) => {

    App.use("/users/", UserRoutes);
    App.use("/messages/", MessageRoutes);
    App.use("/comments/", CommentRoutes);

}

module.exports = APIRoute;