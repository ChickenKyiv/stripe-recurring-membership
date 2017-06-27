$( document ).ready(function() {
	

	$(".btn-sign-up1").on('click', function(e){

		var value = $(this).data().plan;

		$('#plan').prop( 'value', value );

		// console.log( $('#plan').prop('value') );


		$('#payment-form').submit();
		return false;

	});



	$(".btn-sign-up2").on('click', function(e){

		var value = $(this).data().plan;

		$('#plan').prop( 'value', value );

		$('#payment-form').submit();
		return false;

	});

	

	



	




	

	


	// $('#payment-form').on('submit', function(e){

 //        //prevent Default functionality
 //        e.preventDefault();

 //        console.log('true');

        

	// })

});