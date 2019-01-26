/* global $,GraphJS*/
$(document).ready(function(){
    
    $('#main-register-form').on('submit',function(e){
        e.preventDefault();
        var target = e.target;
        $("#kn-loading-spinner").css('display','block');
        $('#main-register-form,.kn-form-confirmation').css('display','none');
        $.ajax({
            url: 'https://us-api.knack.com/v1/scenes/scene_7/views/view_14/profiles/object_5/records/ ',
            type: 'post',
            data: {
                "account_status":"active",
                "field_24":{"first":target.first.value,"last":target.last.value},
                "field_25":{"email":target.email.value},
                "field_26":{"password":target.password.value,"password_confirmation":target.password_confirmation.value},
                "crumbtrail":{},
                "url":"https://createsomething.io/cs-course/login#free-login/",
                "parent_url":"https://createsomething.io/cs-course/login#"
            },
            headers: {
                'X-Knack-Application-Id': '5c03eee0a8850d08a58c6499', 
                'X-Knack-REST-API-Key': 'renderer'
            },
            dataType: 'json',
            success: function (data) {
                var username = target.email.value.split("@");
                username = username[0]+ username[1].length + username[1][0];
                GraphJS.register(
                    username.replace(/[^a-z0-9_]+/gi,""),
                    target.email.value,
                    target.password.value,
                    function(response) {
                        $(".kn-message-body").html('');
                        $("#kn-loading-spinner").css('display','none');
                        $('#main-register-form').css('display','none');
                        $('.kn-form-confirmation').css('display','block');
                        $(".kn-message").removeClass('is-error').addClass("success");
                        $(".kn-message-body").append('<p>Your registration is complete! Click the back link to log in.</p>');
                    }
                );
                
            },
            error: function(error){
                $(".kn-message-body").html('');
                $("#kn-loading-spinner").css('display','none');
                $('#main-register-form,.kn-form-confirmation').css('display','block');
                $(".kn-message").removeClass('success').addClass("is-error");
                var errorsList = JSON.parse(error.responseText).errors;
                errorsList.forEach(function(a){
                    $(".kn-message-body").append('<p><strong>'+a.message+'</strong></p>');
                });
            }
        });
    });
})