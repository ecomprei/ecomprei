
seller = function () {
    $(".payment-group-item-text").eq(1).text("Boleto");
    $(".payment-description").eq(0).text("você irá receber os boletos dos nossos parceiros (fornecedores) por e-mail e junto com a entrega da mercadoria.");
    $('#client-company-document').attr('required', 'required')
     }
  steps = function() {
   if(window.location.hash == '#/payment'){
     $(".payment-group-item-text").eq(1).text("Boleto");
     $(".payment-description").eq(0).text("você irá receber os boletos dos nossos parceiros (fornecedores) por e-mail e junto com a entrega da mercadoria.");
   }
 }

  append = function () {
    setTimeout(function () {
        if ($("body").hasClass("body-cart")) {
                vtexjs.checkout.getOrderForm().done(function (data) {
                var a = data.items;
                if (a.length >= 1 ) {
                    $('body.body-cart .cart-links-bottom').append('<a class="cart-links-continue" href="/">Continuar comprando</a>');
                }
            });
        }
    }, 500)

  }

 $(window).on('hashchange', function() {
   steps();
   append();
 });
 $(window).on('load', function() {
   steps();
   append();
 });

 $(document).ready(function() {
     seller();
 });

