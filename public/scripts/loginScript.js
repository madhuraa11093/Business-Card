function showError(error) {
        var message = "An error occurred";
        if (error.message) {
                message = error.message;
        } else if (error.errors) {
                var errors = error.errors;
                message = "";
                Object.keys(errors).forEach(function(k) {
                        message += k + ": " + errors[k] + "\n";
                });
        }

        alert(message);
}

redirectFn();

function redirectFn(){
    dpd.users.me(function(me) {
        //console.log(me.test);
        if(me) {
//         location.href = "/index_copy2.html";
            userFragment = me.userFragment;
            location.href = "/profile.html#" + userFragment;
        }
    });
}

$('#login-form').submit(function() {
    var usrname = $('#txtUname').val();
    var pwd = $('#txtPwd').val();
    //var usrFragment = "";

    dpd.users.login({username: usrname, password: pwd}, function(session, error) {
        if (error) {
          alert(error.message);
        } else {
            // console.log(session);
            redirectFn();
        }
    });


    return false;
});

