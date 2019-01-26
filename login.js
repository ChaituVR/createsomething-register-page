/* global $,GraphJS*/
$(document).ready(function(){
    
    $('.login_form').on('submit',function(e){
        e.preventDefault();
        var target = e.target;
        $("#kn-loading-spinner").css('display','block');
        $.ajax({
            url: 'https://api.knack.com/v1/applications/5c4ad9bf55ea24085312138e/session',
            type: 'post',
            data: {
                "email":target.email.value || '',
                "password":target.password.value || ''
            },
            
            dataType: 'json',
            success: function (data) {
                if(data.session.user.approval_status=="approved"){
                    var username = target.email.value.split("@");
                    username = username[0]+ username[1].length + username[1][0];
                    GraphJS.login(
                        username.replace(/[^a-z0-9_]+/gi,""),
                        target.password.value,
                        function(response) {
                            $(".kn-message-body").html('');
                            $("#kn-loading-spinner").css('display','none');
                            $('.login_form').css('display','none');
                            $('.kn-message').css('display','block');
                            $(".kn-message").removeClass('is-error').addClass("success");
                            $(".kn-message-body").append('<p>Success</p>');
                        }
                    );
                }
            },
            error: function(error){
                console.log(error)
                $("#kn-loading-spinner").css('display','none');
                $(".kn-message-body").html('');
                $(".kn-message").css('display','block')
                $(".kn-message").removeClass('success').addClass("is-error");
                var errorsList = JSON.parse(error.responseText).errors;
                console.log(errorsList)
                errorsList.forEach(function(a){
                    $(".kn-message-body").append('<p><strong>'+a.message+'</strong></p>');
                });
            }
        });
    });
})
