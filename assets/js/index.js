$(document).ready(function(){
    $("body").on("submit", "#registration_form", submitRegistrationForm)
             .on("submit", "#login_form", submitLoginForm)
             .on("submit", "#post_message_form", submitPostMessageForm)
             .on("submit", "#comment_form", submitCommentForm)
             .on("submit", "#delete_message_form", submitDeleteMessageForm)
             .on("submit", "#delete_comment_form", submitDeleteCommentForm)
             .on("click", ".comment_submit", prepareCommentForm)
             .on("click", ".delete_message", prepareDeleteMessageForm)
             .on("click", ".delete_comment", prepareDeleteCommentForm)


});

function prepareDeleteCommentForm(e){

    $("#delete_comment_form").find("#comment_id_input").val( $(this).closest(".comment_item").attr("data-comment-item") );

    $("#delete_comment_form").trigger("submit");

    return false;
}

function prepareDeleteMessageForm(e){

    $("#delete_message_form").find("#message_id_input").val( $(this).closest(".message_item").attr("data-message-item") );

    $("#delete_message_form").trigger("submit");

    return false;
}

function prepareCommentForm(e){

    $("#comment_form").find("#message_id_input").val( $(this).closest(".message_item").attr("data-message-item") );
    $("#comment_form").find("#comment_input").val( $(this).siblings(".textarea_comment").val() );

    $("#comment_form").trigger("submit");

    return false;
}

function submitDeleteCommentForm(e){
    e.preventDefault();

    let dlete_comment_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(dlete_comment_form).attr("data-is-processing", 1)

        $.post(dlete_comment_form.attr('action'), dlete_comment_form.serialize(), function(data){
            $(dlete_comment_form).attr("data-is-processing", 0)
            if(data.status){

                window.location.href =  "/home";

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}

function submitDeleteMessageForm(e){
    e.preventDefault();

    let dlete_message_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(dlete_message_form).attr("data-is-processing", 1)

        $.post(dlete_message_form.attr('action'), dlete_message_form.serialize(), function(data){
            $(dlete_message_form).attr("data-is-processing", 0)
            if(data.status){

                window.location.href =  "/home";

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}

function submitCommentForm(e){
    e.preventDefault();

    let comment_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(comment_form).attr("data-is-processing", 1)

        $.post(comment_form.attr('action'), comment_form.serialize(), function(data){
            $(comment_form).attr("data-is-processing", 0)
            if(data.status){

                window.location.href =  "/home";

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}

function submitPostMessageForm(e){
    e.preventDefault();

    let post_message_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(post_message_form).attr("data-is-processing", 1)

        $.post(post_message_form.attr('action'), post_message_form.serialize(), function(data){
            $(post_message_form).attr("data-is-processing", 0)
            if(data.status){

                window.location.href =  "/home";

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}

function submitLoginForm(e){
    e.preventDefault();

    let login_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(login_form).attr("data-is-processing", 1)

        $.post(login_form.attr('action'), login_form.serialize(), function(data){
            $(login_form).attr("data-is-processing", 0)
            if(data.status){

                window.location.href =  "/home";

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}

function submitRegistrationForm(e){
    e.preventDefault();

    let reg_form = $(this);
    let is_processing = $(this).attr("data-is-processing");

    if(parseInt(is_processing) === 0){
        $(reg_form).attr("data-is-processing", 1)

        $.post(reg_form.attr('action'), reg_form.serialize(), function(data){
            if(data.status){
                $(reg_form).attr("data-is-processing", 0)

                alert("Successfully registered")

            }
            else{
                alert(data.message);
            }

        }, "json");
    }

    return false;
}