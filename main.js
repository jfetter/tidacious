
"use strict";
$(document).ready(init);


//set up a default
var locale = buildLocale();

function init () {


// upon clicking the button with the id of "getZip" 
// the function grabData will be executed
	$("#getLocation").on("click", grabData);

}


function grabData () {

	// the variable locale is set to the value that the function buildLocale returns
	// if parenthesis were not closed, then it would just exectue the function
	

// this part of the function sends an AJAX request (the ajax is silent)
// ... its hidden in the .get. Anyway, it plugs in the converted location info 
	$.get("http://api.wunderground.com/api/dad32a490467dc62/rawtide/q/"+ locale + ".json")
// if the request can be completed (ie the url that was fed in is valid and the site is up etc)
	 .done(function(data, status){
// show the location where data from the database that I just queried (weather underground) 
// is being pulled from.
// in the span to which I have assigned the id "myLocale"
 	var tideInfo = data.rawtide.tideInfo[0].tideSite;
			$("#myLocale").text(tideInfo);
// then send the data you get back to the local memory on your own computer
// this way you can access it offline too. 
			localStorage.data =  JSON.stringify(data);

			doSomethingWithData();
	})
	.fail(function(error){
		console.error(error);
	})
}

function buildLocale() {
	// this: "CA/san_Francisco" is the format that the url needs the 
	// location to be in in order to send a valid request, so this 
	// function converts the user input to the appropriate format. 
	var state = $("#getState").val().toUpperCase();
	var city = $("#getCity").val().toLowerCase().replace(/ /g, "_");
 	var cityState = state + "/" + city; 
 	console.log(cityState);
 	return cityState; 
}

//this function will be able to do something with the local storage
//like maybe set a default location for the next time you login or something
function showLocation(){
	var savedData = JSON.parse(localStorage.zip);
	
	return savedData;
}





