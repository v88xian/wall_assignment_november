'use strict';

import MessageModel from "../models/message.model";
let messageModel = new MessageModel();

class ViewController{
    #req;
    #res;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    isAuthorizedUser = async () => {

        if(!this.#req?.session?.user?.id){
            throw Error("SEssion not found");
        }

    }

    index = async () => {
        try{
            if(this.#req?.session?.user?.id){
                this.#res.redirect("/home");
            }
            else{

                this.#res.render("index.ejs");
            }
        }
        catch(error){
            this.#res.redirect("/");
        }
    }

    home = async () => {
        try{
            await this.isAuthorizedUser();

            let {result: all_messages} = await messageModel.fetchAllMessages()



            this.#res.render("home.ejs", {
                CURRENT_USER: {
                    id: this.#req?.session?.user?.id,
                    first_name: this.#req?.session?.user?.first_name,
                    last_name: this.#req?.session?.user?.last_name
                },
                DATA: {
                    messages: all_messages
                }
            });
        }
        catch(error){
            this.#res.redirect("/");
        }
    }

}

export default ViewController;