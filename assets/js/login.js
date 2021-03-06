$( document ).ready(function() {

    $(document).on('click','.navbar-collapse',function(e) {
        if($(e.target).is('a') && ($(e.target).attr('class') != 'dropdown-toggle')) {
            $(this).collapse('hide');
        }
    });

    $('.menusel').click(function(e) {

        $('.nav li').removeClass('active');
        $(this).parent('li').addClass('active');

    });

    /* ==== save questionnaire ====*/

    $('.submit-registration').click(function(e) {

        e.preventDefault();

        var $frm = $('#question_form');
        var $frm_data = JSON.stringify($frm.serializeArray());

        //console.log($frm_data);

        var form_data = {
            frm_data: $frm_data,
            first_name: $("input[name=first_name]").val(),
            last_name: $("input[name=last_name]").val(),
            email: $("input[name=email]").val(),
            password: $("input[name=password]").val(),
            password_confirm: $("input[name=password_confirm]").val(),
            csrf_tl_token: $("input[name=csrf_tl_token]").val(),
            is_ajax: '1'
        };

        $.ajax( {
            url: "/auth/create_user",
            type: 'POST',
            data: form_data,
            success: function(msg) {

                if(msg != undefined) {
                    var $obj = jQuery.parseJSON(msg);

                    $("input[name=first_name]").parent().removeClass('has-error');
                    $("input[name=last_name]").parent().removeClass('has-error');
                    $("input[name=email]").parent().removeClass('has-error');
                    $("input[name=password]").parent().removeClass('has-error');
                    $("input[name=password_confirm]").parent().removeClass('has-error');

                    switch($obj.vresult){

                        case "success":

                            $("#register-error-message").addClass('hide');
                            window.location.replace("/dashboard");
                            break;

                        default:
                            $("input[name=csrf_tl_token]").val($obj.csrf_hash);

                           // console.log($obj.full_message);

                            // highlight fields that are incorrect

                            if ($obj.full_message.indexOf('First Name') >= 0)
                                $("input[name=first_name]").parent().addClass('has-error');

                            if ($obj.full_message.indexOf('Last Name') >= 0)
                                $("input[name=last_name]").parent().addClass('has-error');

                            if ($obj.full_message.indexOf('Email') >= 0)
                                $("input[name=email]").parent().addClass('has-error');

                            if ($obj.full_message.indexOf('valid email address') >= 0) {
                                $("input[name=email]").parent().addClass('has-error');
                                $obj.message = 'Email address is not valid.';
                            }
                            if ($obj.full_message.indexOf('Email Address field must contain a unique value') >= 0) {
                                $("input[name=email]").parent().addClass('has-error');
                                $obj.message = 'Email address already taken.';
                            }

                            if ($obj.full_message.indexOf('Password field') >= 0)
                                $("input[name=password]").parent().addClass('has-error');

                            if ($obj.full_message.indexOf('characters in length') >= 0) {
                                $("input[name=password]").parent().addClass('has-error');
                                $obj.message = 'Password must be at least 8 characters.';
                            }

                            if ($obj.full_message.indexOf('Password Confirmation') >= 0)
                                $("input[name=password_confirm]").parent().addClass('has-error');

                            if ($obj.full_message.indexOf('does not match the Password Confirmation') >= 0) {
                                $("input[name=password]").parent().addClass('has-error');
                                $("input[name=password_confirm]").parent().addClass('has-error');
                                $obj.message = 'Password fields must match.';
                            }

                            $("#register-error-message").html($obj.message);
                            $("#register-error-message").removeClass('hide');

                    }

                }

            }

        });

    });



    /* ==== login ====*/

$('#submit-login').click(function(e) {

    e.preventDefault();

    var identity = $('#login-email').val();
    var password = $('#login-password').val();

    var remember = $('#check-1').prop( "checked" );

    var form_data = {
        identity: identity,
        password: password,
        remember: remember,
        csrf_tl_token: $("input[name=csrf_tl_token]").val(),
        is_ajax: '1'
    };

    $.ajax( {
        url: "/auth/login",
        type: 'POST',
        data: form_data,
        success: function(msg) {

            if(msg != undefined) {
                var $obj = jQuery.parseJSON(msg);

                switch($obj.vresult){

                    case "success":

                        $("#login-error-message").addClass('hide');
                        window.location.replace("/dashboard");
                        break;

                    default:
                        if($obj.message == '')
                            $obj.message = "Username or Password Incorrect";

                        $("input[name=csrf_tl_token]").val($obj.csrf_hash);
                        $("#login-error-message").html($obj.message);
                        $("#login-error-message").removeClass('hide');


                }

            }

        }

    });

});

$('#submit-reset-password').click(function(e) {

    e.preventDefault();

    var $email = $('#forgot-email').val();

    var form_data = {
        email: $email,
        csrf_tl_token: $("input[name=csrf_tl_token]").val(),
        is_ajax: '1'
    };

    $.ajax( {
        url: "/auth/forgot_password",
        type: 'POST',
        data: form_data,
        success: function(msg) {

            if(msg != undefined) {
                var $obj = jQuery.parseJSON(msg);

                switch($obj.vresult){

                    case "success":

                        $("input[name=csrf_tl_token]").val($obj.csrf_hash);
                        $("#forgot-error-message").addClass('hide');
                        $("#forgot-success-message").removeClass('hide');
                        break;

                    default:
                        $("input[name=csrf_tl_token]").val($obj.csrf_hash);
                        $("#forgot-error-message").removeClass('hide');
                }

            }

        }

    });

});

$('#submit-set-password').click(function(e) {
    e.preventDefault();

    var $code = $("input[name=code]").val();
    var $user_id = $("input[name=user_id]").val();
    var $new = $('#new-password').val();
    var $new_confirm = $('#new-password-confirm').val();

    var form_data = {
        new : $new,
        user_id: $user_id,
        new_confirm : $new_confirm,
        csrf_tl_token: $("input[name=csrf_tl_token]").val(),
        is_ajax: '1'
    };

    $.ajax( {
        url: "/auth/reset_password/" + $code,
        type: 'POST',
        data: form_data,
        success: function(msg) {

            if(msg != undefined) {
                var $obj = jQuery.parseJSON(msg);

                switch($obj.vresult){

                    case "success":

                        $("input[name=csrf_tl_token]").val($obj.csrf_hash);
                        $("#reset-message-success").removeClass('hide');
                        $("#reset-message-fail").addClass('hide');
                        $("#reset-message-success").html($obj.message);
                        break;

                    default:
                        $("input[name=csrf_tl_token]").val($obj.csrf_hash);
                        $("#reset-message-success").addClass('hide');
                        $("#reset-message-fail").removeClass('hide');
                        $("#reset-message-fail").html($obj.message);
                }
            }
        }
    });
});

});
