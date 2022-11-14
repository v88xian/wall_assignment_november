import QueryModel from "./database/query.model";
import { format as mysqlFormat } from "mysql";
import { response } from "express";


let queryModel = new QueryModel();


class MessageModel{

    constructor(){}

    fetchAllMessages = async () => {
        let response_data = {status: false, result: {}, error: null};

        try{
            let fetch_message_query = mysqlFormat(`

                SELECT JSON_ARRAYAGG(message_object) AS messages
                FROM (
                    SELECT 
                        messages.id AS message_id,
                        JSON_OBJECT(
                            "message_id", messages.id,
                            "message_author_id", user_id,
                            "message_author_name", CONCAT(users.first_name, " ", users.last_name),
                            "comments", IFNULL(comment_object, JSON_ARRAY()),
                            "content", message,
                            "message_created_at", messages.created_at
                        ) AS message_object
                    
                    FROM messages
                    LEFT JOIN (
                        
                        SELECT message_id,
                            JSON_ARRAYAGG(JSON_OBJECT(
                                "comment_id", comments.id,
                                "message_id", message_id,
                                "comment_author_id", user_id,
                                "comment_author_name", CONCAT(users.first_name, " ", users.last_name),
                                "content", comment,
                                "comment_created_at", comments.created_at
                            )) AS comment_object
                        FROM comments
                        INNER JOIN users ON users.id = comments.user_id
                        GROUP BY message_id
                        
                    ) AS derived_comments ON derived_comments.message_id = messages.id
                    INNER JOIN users ON users.id = messages.user_id
                    GROUP BY messages.id
                    ORDER BY messages.id DESC
                ) AS derived_messages
            `, []);
            let [fetch_message_response] = await queryModel.executeQuery(fetch_message_query);

            response_data.status = true;
            response_data.result = (fetch_message_response?.messages) ? JSON.parse(fetch_message_response.messages) : [];
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;  
    }


    createMessageRecord = async (message_data) => {
        let response_data = {status: false, result: {}, error: null};

        try{
            let create_message_query = mysqlFormat(`INSERT INTO messages SET ?, created_at = NOW(), updated_at = NOW()`, [message_data]);
            let create_message_response = await queryModel.executeQuery(create_message_query);

            response_data.status = !!create_message_response.insertId;
            response_data.result = {...message_data, id: create_message_response.insertId};
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteMessageRecord = async (message_id, user_id) => {
        let response_data = {status: false, result: {}, error: null};

        try{
            let delete_message_query = mysqlFormat(`DELETE FROM messages WHERE id =? AND user_id=?`, [message_id, user_id]);
            let delete_message_response = await queryModel.executeQuery(delete_message_query);

            response_data.status = !!delete_message_response.affectedRows;
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

export default MessageModel;