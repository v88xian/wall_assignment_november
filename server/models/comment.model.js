import QueryModel from "./database/query.model";
import { format as mysqlFormat } from "mysql";
import { response } from "express";


let queryModel = new QueryModel();


class CommentModel{

    constructor(){}


    createCommentRecord = async (comment_data) => {
        let response_data = {status: false, result: {}, error: null};

        try{
            let create_comment_query = mysqlFormat(`INSERT INTO comments SET ?, created_at = NOW(), updated_at = NOW()`, [comment_data]);
            let create_comment_response = await queryModel.executeQuery(create_comment_query);

            response_data.status = !!create_comment_response.insertId;
            response_data.result = {...comment_data, id: create_comment_response.insertId};
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteCommentRecord = async (comment_id, user_id) => {
        let response_data = {status: false, result: {}, error: null};

        try{
            let delete_comment_query = mysqlFormat(`DELETE FROM comments WHERE id =? AND user_id=?`, [comment_id, user_id]);
            let delete_comment_response = await queryModel.executeQuery(delete_comment_query);

            response_data.status = !!delete_comment_response.affectedRows;
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

export default CommentModel;