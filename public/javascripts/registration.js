$( document ).ready(function() {
	console.log('123');
	//case 1: user fill only 4 text fields(existing email, )+1 hidden field(domain name)
	// and we send ajax call and store this values(and stripe.customer_id)
	// on this case we'll assign a free plan to user. So later, we'll be able filter only 'free' users,
	// so admin will be able to send a follow-up emails and drive users to finish registration


	// $("input[name='password_confirm']").focusout(function(e){

	// 	alert('focus out- really!');
	// 	// $('#payment-form').find()

	// 	//domain name
	// 	var domain         = $('#payment-form > #inputDomain').val();

	// 	//existing email
 //        var existing_email = $('#payment-form > #inputEmail').val();

	// 	//password
	// 	var password       = $('#payment-form > #inputPassword').val();

	// 	//confirm_password
	// 	var password_confirm = $(' #payment-form > #inputPasswordCheck').val();

	// 	var data = {
	// 		domain          : domain
	// 		existing_email  : existing_email
	// 		password        : password
	// 		password_confirm: password_confirm
	// 	}
	// 	// send request to /signupshort


	// 	$.ajax({
	// 	    type: "POST",
	// 	    url : "/signupshort",
	// 	    data: data,
	// 	    // dataType: 'html'
	// 	})
 //        .done(function () {
 //            console.log("request succeeded");
 //            // alert("login success");
 //        });

	// });


	//case 2: when user pick a subscription plan - we'll submit form again.
	// we know that this was registered. so we don't need to fire an error, when user with same email
	// But! we need to compare user with registered email before and user must have a free plan.
	// if user pick same email, but payed before for 3,12 month - we need to fire an error/notification.


	$("input[type='submit']").on('click', function(e){

		console.log( $(this).prop() );



	});

	$('#payment-form').on('submit', function(e){

        //prevent Default functionality
        e.preventDefault();

	})

});