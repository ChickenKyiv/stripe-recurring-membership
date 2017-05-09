// var stripe   = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
// var elements = stripe.elements();


function setOutcome(result) {

  var successElement = document.querySelector('.success');
  var errorElement   = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
  } else if (result.error) {
    //@TODO check error mode
    errorElement.textContent = result.error.message;
    console.log( result );
    errorElement.classList.add('visible');
  }
}

var div_wrapper = document.getElementById('card-element');
if( div_wrapper !== null ){

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

  document.querySelector('form').addEventListener('submit', function(e) {

    e.preventDefault();
    var form = document.querySelector('form');
    var extraDetails = {
      name: form.querySelector('input[name=cardholder-name]').value,
    };

    stripe.createToken(card, extraDetails).then(setOutcome);

  });


  var form = document.getElementById('payment-form')



}





