$(document).ready(function(){

	$('#customizedallowanceForm').submit(function(event){
		event.preventDefault();

		// formData will store all the form field's values in a JSON object
		var formData = {};

		// Gets the Customized Token Fields
		formData.owner = $("input[name='owner']").val();
		formData.spender = $("input[name='spender']").val();

		//console.log("Printing the formData");
		//console.log(formData);

		// Post request to save custom token details
		$.ajax({
			type: "POST",
			url: "/customToken/allowance",
			data: formData,
			success: function(res){
				console.log(res);
				alert("Allowed" + res);
				window.location.href = window.location.protocol + '/tokenOperations';
			},
			error: function (err){
				alert("Something went wrong while submitting the request");
				window.location.href = window.location.protocol ;

			}
		}); //end of ajax call
	}); // end of $('#customizedTokenForm').submit(function(event)
}); //end of document.ready
