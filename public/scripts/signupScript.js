$(document).ready(function() {

  var file = []; //array to hold image file

  /*$('#signup_form').bootstrapValidator({
    // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      first_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please enter your First Name'
          }
        }
      },
      last_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please enter your Last Name'
          }
        }
      },
      username: {
        validators: {
          stringLength: {
            min: 8,
          },
          notEmpty: {
            message: 'Please enter your Username'
          }
        }
      },
      password: {
        validators: {
          stringLength: {
            min: 8,
          },
          notEmpty: {
            message: 'Please enter your Password'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Please enter your Email Address'
          },
          emailAddress: {
            message: 'Please enter a valid Email Address'
          }
        }
      },
      contact_no: {
        validators: {
          stringLength: {
            min: 10,
            max: 10,
          },
          notEmpty: {
            message: 'Please enter your Contact No.'
          }

        }
      },
      department: {
        validators: {
          notEmpty: {
            message: 'Please choose your Profession'
          }
        }
      },
      about_me: {
        validators: {
          stringLength: {
            min: 10,
            max: 1000,
          },
          notEmpty: {
            message: 'Please provide your details'
          }

        }
      },
    },
    function(e){
      e.preventDefault();
      alert("HEEEEEE");
    }
  })*/


//$(document).ready(function() {
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function(event, label) {
    var input = $(this).parents('.input-group'),
      log = label;

      if (input.length) {
        input.val(log);
      } else {
        if (log) alert(log);
      }
  });

  

  $("#imgInp").change(function() {
    readURL(this);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#img-upload').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }


//********************* DO NOT MODIFY CODE IN BELOW SECTION. CONTAINS IMAGE UPLOAD AND USER ADDITION CODE **************************
  
  //function to add user to the users collection on button click
  $('#signup_form').submit(function(event) {
    //$('#btnsubmit').closest('form').submit(function(event) {
    
    event.preventDefault();
    //first store form values in variables
    
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var profession = $('#profession option:selected').val();
    var user_name = $('#user_name').val();
    var user_password = $('#user_password').val();
    var email = $('#email').val();
    var contact_no = $('#contact_no').val();
    var about_me = $('#about_me').val();
    var fb_link = $('#fb_url').val();
    var li_link = $('#li_url').val();

    var imgFile = $('#imgInp')[0].files[0];
    file.push(imgFile);
    console.log(file);

    // Image upload code
      var fd = new FormData(); //FormData object to store uplpoaded image
      fd.append("uploadedFile", file[0]);

      var xhr = new XMLHttpRequest();

      //Dynamically assigning a usr property in the imgfileupload collection(in deployd)
        xhr.open('POST', 'http://localhost:2403/imgfileupload?usr=' + user_name); //associates the image to a unique fragment value
        xhr.onload = function() {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (this.status < 300) {
                console.log("Image Uploaded");
            } else {
          alert(response.message);
            }
        };
        xhr.onerror = function(err) {
            alert("Error: ", err);
        }
    
        xhr.send(fd);

        

    //code to add the data to the user collection
    dpd.users.post({
      username: user_name,
      password: user_password,
      firstname: first_name,
      lastname: last_name,
      profession: profession,
      email: email,
      contactno: contact_no,
      aboutme: about_me,
      userFragment: user_name,
      fburl: fb_link,
      liurl: li_link
    }, function(user, err) {
      if (err) {
        // An error could be either the err.message property, or err.errors.title, so we account for either case
        alert(err.message || (err.errors && err.errors.title));
        return;
      }

      alert("User Created");
      //redirect user to login page
      location.href = "/login.html";
      
    });
                        //   return false;
                        // }
    
  });

// ***************************************** END OF SECTION **************************************************************
  
//});
});

  function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
      alert('File size exceeds 2 MB');
      $(file).val(''); //for clearing with Jquery
    } else {

    }
  }


