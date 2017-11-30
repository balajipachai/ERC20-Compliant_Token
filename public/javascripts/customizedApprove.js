$(document).ready(function(){

	$('#customizedApproveForm').submit(function(event){
		event.preventDefault();

		// formData will store all the form field's values in a JSON object
		var formData = {};

		// Gets the Customized Token Fields
		formData.spender = $("input[name='spender']").val();
		formData.value = $("input[name='value']").val();

		//console.log("Printing the formData");
		//console.log(formData);

		// Post request to save custom token details
		$.ajax({
			type: "POST",
			url: "/customToken/approve",
			data: formData,
			success: function(res){
				alert("Approved");
				window.location.href = window.location.protocol + '/tokenOperations';
			},
			error: function (err){
				alert("Something went wrong while submitting the request");
				window.location.href = window.location.protocol ;

			}
		}); //end of ajax call
	}); // end of $('#customizedTokenForm').submit(function(event)
}); //end of document.ready
