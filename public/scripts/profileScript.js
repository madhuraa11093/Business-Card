/* Created and modified by Vishal */

$(document).ready(function() {
	//code to fetch hash from url
	var fragmentVal = "";
	
	//check if hash(fragment) exists or not
	if(location.hash){
		fragmentVal = location.hash.substr(1); // eliminate the # sign 
		console.log(fragmentVal);
	}
	else{
		alert("Invalid url: user fragment missing");
	}

	//check if a user is logged in
	dpd.users.me(function(me) {
	    if(!me){
	        console.log("User not signed in");
	        $("#btnLogout").hide();
	    }
	    else{
	        console.log(me);
	    }
	});

	//setting query variable that would be used as a parameter to retrieve user profile pic in the next function.
	// usr is a property in the imgfileupload which is assigned dynamically through the submit button on signup page
	var query = {"usr":fragmentVal};  
	
	//code to rertrieve the user profile pic and displaying in the associated img container
	dpd.imgfileupload.get(query, function(result, err) {
                console.log(result);
                console.log(result[result.length - 1].filename);
                $('#profilePic').attr('src', 'http://localhost:2403/upload/' + result[result.length - 1].filename);
    });

	//populate user details
	var usrquery = {"userFragment": fragmentVal};
	
	dpd.users.get(usrquery, function (result) {
	  console.log(result);

	  $('#profileName').text(result[0].firstname + " " + result[0].lastname); //assigning the Profile Name
	  $('#profilePhone').text(result[0].contactno); //assigning the Contact number
	  $('#profileEmail').text(result[0].email);		//assigning the email
	  $('#profileAbout').text(result[0].aboutme);	//assigning aboutme text
	  $('#linkedin').attr('href',result[0].liurl);	//assigning the LinkedIn and FB url to icons
	  $('#facebook').attr('href',result[0].fburl);
	});

	//code to logout
	$('#btnLogout').click(function() {
          dpd.users.logout(function(res, err) {
            location.href = "/";
          });
        });
	
});