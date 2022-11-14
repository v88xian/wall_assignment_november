'use strict';

import { validateFields } from "../helpers/form.helper";
import { encryptPassword } from "../helpers/user.helper";

import CommentModel from "../models/comment.model";
let commentModel = new CommentModel();

class CommentController{

    /**
     * DOCU: This function will trigger the registration of user
     * @param {*} req - Required first_name, last_name, email_address, password
     * @param {*} res 
     * @author Christian
     * Last Updated At: October 30, 2022
     */       
    create = async function (req, res){
        let response_data = { status: false, result: {}, error: null };

        try{
            if(!req?.session?.user?.id){
                throw Error("Session missing.");
            }


            let validated_fields_response = await validateFields(req.body, ["message_id", "comment"], []);

            if(validated_fields_response.status){
                response_data = await commentModel.createCommentRecord({user_id: req.session.user.id, message_id: validated_fields_response.result.message_id, comment: validated_fields_response.result.comment})
            }
            else{
                response_data.message = "Missing fields";
            }
        }
        catch(error){
            response_data.error = error;
        }
 
        res.json(response_data);
    }


    delete = async function (req, res){
        let response_data = { status: false, result: {}, error: null };

        try{
            if(!req?.session?.user?.id){
                throw Error("Session missing.");
            }


            let validated_fields_response = await validateFields(req.body, ["comment_id"], []);

            if(validated_fields_response.status){
                response_data = await commentModel.deleteCommentRecord(validated_fields_response.result.comment_id, req.session.user.id)
            }
            else{
                response_data.message = "Missing fields";
            }
        }
        catch(error){
            response_data.error = error;
        }
 
        res.json(response_data);
    }
}

export default (function Comment(){
    return new CommentController();
})();