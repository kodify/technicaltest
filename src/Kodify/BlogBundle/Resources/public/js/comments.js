$( document ).ready(function() {
    $('.comment-form').hide();
    $('.create-comment').on('click', function(){
        $('.comment-form').show();
    });

    //submit the comment by ajax using this form
    /*$('.create-form').submit(function($e){
        $e.preventDefault();
        var formSerialize = $(this).serializeArray();
        var url = $(this).attr('action');

        $.post(url, formSerialize, function(response){
            //your callback here
            console.log(response);

        },'JSON');

    });*/

});