$( document ).ready(function() {
    
	// var stripe   = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  // console.log( stripe );
  // console.log( stripe.elements() );
	
  var card = elements.create('card', {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '15px',

        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    }
  });
  card.mount('#card-element');


  card.on('change', function(event) {
    setOutcome(event);
  });



  $('#payment-form').submit(function(e){

    e.preventDefault();
    var form = this;
    var extraDetails = {
        name: form.find('input[name=cardholder-name]').prop(),
    };
    console.log( extraDetails );

    stripe.createToken(card, extraDetails).then(setOutcome);        

  });


});





function setOutcome(result) {


  // var successElement = document.querySelector('.success');
  var successElement = $('.success');

  // var errorElement = document.querySelector('.error');
  var errorElement   = $('.error');

  successElement.removeClass('visible');
  errorElement.removeClass('visible');

  // successElement.classList.remove('visible');
  // errorElement.classList.remove('visible');

    console.log( result );

    var url  = '/signup2'; 
    var data = {
      result: result
    };

    var data = {
      error: result.error
    };
    
    var data = {
      result: token
    };
    
    // add ajax post and display info in error flash messages
    // $.ajax({
    //     type: "POST",
    //     url : "/signupshort",
    //     data: data,
    //     // dataType: 'html'
    // })
    // .done(function () {
    //     console.log("request succeeded");
    //     // alert("login success");
    // });

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges

    console.log( result.token.id );

    successElement.find('.token').html( result.token.id );
    // successElement.querySelector('.token').textContent = result.token.id;
    // successElement.classList.add('visible');
    successElement.addClass('visible');

  } else if (result.error) {

    console.log( result.error );
    console.log( result.error.message );

  	errorElement.html( result.error.message );
    // errorElement.textContent = result.error.message;
    console.log( result );
    errorElement.addClass('visible');
    // errorElement.classList.add('visible');

  }
}






// document.querySelector('form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   var form = document.querySelector('form');
//   var extraDetails = {
//     name: form.querySelector('input[name=cardholder-name]').value,
//   };
//   stripe.createToken(card, extraDetails).then(setOutcome);
// });


// var form = document.getElementById('payment-form')

// var form = $('#payment-form');
