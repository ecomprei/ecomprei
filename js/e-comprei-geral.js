Login1s = function() {
    $('.account__title, .js-account-login, .anch').click(function (e) {
        $.ajax({
            type: 'GET',
            url: '/no-cache/profileSystem/getProfile',
            success: function (data) {
                if (data.IsUserDefined == false) {

                    e.preventDefault();
                    $('#login').click

                    setTimeout(() => {
                        $('#loginWithUserAndPasswordBtn').click();
                        $('.vtexIdUI.ng-scope.vtexIdUI-show-app').show();
                    }, 5000);

                } else {
                    window.location.href = "/account";
                };
            }
        });
        return false;
    });
}

function getNewsletter() {
    $(".js-newsletterButton").click(function (e) {
        e.preventDefault();

        var _json = {
            'email': $('.js-newsletterEmail').val()
        };

        var _email = $('.js-newsletterEmail').val();

        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json'
            },
            url: '/api/dataentities/NL/search?email=' + _email + '&_fields=id',
            type: 'GET',
            success: function success(response) {
                if (!response.length) {
                    $.ajax({
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json',
                            'REST-Range': 'resources=0-150'
                        },
                        data: JSON.stringify(_json),
                        type: 'PATCH',
                        url: '/api/dataentities/NL/documents/',
                        success: function success(data) {
                            alert('Email cadastrado com success');
                        },
                        error: function error(data) {
                            alert('error');
                        }
                    });
                } else {
                    alert('Email ja cadastrado!');
                }
            }
        });

        return false;
    });

}

Login3s = function() {
    $('#anch-login').click(function (e) {
        $.ajax({
            type: 'GET',
            url: '/no-cache/profileSystem/getProfile',
            success: function (data) {
                if (data.IsUserDefined == false) {

                    e.preventDefault();
                    vtexid.start({
                        returnUrl: "/account",
                        userEmail: '',
                        locale: 'pt-BR',
                        forceReload: false
                    })

                    setTimeout(() => {
                        $('#loginWithUserAndPasswordBtn').click();
                        $('.vtexIdUI.ng-scope.vtexIdUI-show-app').show();
                    }, 5000);

                } else {
                    window.location.href = "/account";
                };
            }
        });
        return false;
    });
}

getUserPostalCode = function(id){
    $.ajax({
        type: 'GET',
        url: '/no-cache/profileSystem/getProfile',
        success: function (data) {
            if (data.IsUserDefined == true) {
                vtexjs.checkout.getOrderForm().done(function(orderForm) {
                    const _cep = orderForm.shippingData.address.postalCode;
                    // console.log(_cep);
                    var $data = ({
                        "public":{
                           country: {
                               value: "BRA"
                           },
                           postalCode: {
                               value: _cep
                           }
                        }
                    })
                    var settings = {
                        "url": '/api/sessions',
                        "type": "POST",
                        "dataType": "json",
                        "headers": {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json'
                        },
                        "data": JSON.stringify($data)
                    };

                    $.ajax(settings).done(function(response) {
                        console.log(response)
                    });
                });
            }
        }
    });
}

cnpj = function() {
    $("#cep").hide();
    $("#razao_social").hide();
    $("#nome_fantasia").hide();
    $("#endereco").hide();
    $("#cidade").hide();
    $("#uf").hide();
    $("#bairro").hide();
    $("#telefone_fixo").hide();
    $("#cnae").hide();
    $("#complemento").hide();
    $("#celular").hide();
    $("#cnpj").change( function() {
        const cnpj = $('#cnpj').val().replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
        $.ajax({
            type: 'GET',
            url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            crossDomain: true,
            dataType: 'jsonp',
            success: function (data) {
              $("#cep").val(data.cep);
              $("#razao_social").val(data.nome);
              $("#nome_fantasia").val(data.fantasia);
              $("#endereco").val(data.logradouro +" "+ data.numero);
              $("#cidade").val(data.municipio);
              $("#uf").val(data.uf);
              $("#bairro").val(data.bairro);
              $("#telefone_fixo").val(data.telefone);

          }
      });
        $("#e-cnpj").addClass("is--active");
        $("#e-dados").addClass("is--active, is--activeunt");
        $("#cep").show();
        $("#razao_social").show();
        $("#nome_fantasia").show();
        $("#endereco").show();
        $("#cidade").show();
        $("#uf").show();
        $("#bairro").show();
        $("#telefone_fixo").show();
        $("#cnae").show();
        $("#complemento").show();
        $("#celular").show();
    })
}


const scrollToTop = (ev) => {
    var _button = $('.send-area.col-xs-12.col-sm-12 button');
    var _stopPoint = $('.institutional__wrapper');
    var _fadePoint = $('.institutional__wrapper');

    _button.click(function (event) {
        $('html, body').animate({
            scrollTop: $(_stopPoint).offset().top
        }, 1300);
    });
}

loadingButtonBuy = function () {
    $('body').on('click', '.js-product-add, .buy-button.buy-button-ref', function(){
        $('ol, .productRow--list, .priceB2b.js-priceB2b').addClass('is--blocked');

        setTimeout(function(){
            $('ol, .productRow--list, .priceB2b.js-priceB2b').removeClass('is--blocked');
        }, 2000)
    });
}

$(document).ready(function() {
    Login1s();
    Login3s();
    cnpj();
    scrollToTop();
    getUserPostalCode();
    getNewsletter();
    loadingButtonBuy();
});