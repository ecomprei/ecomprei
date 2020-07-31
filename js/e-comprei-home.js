SlickhomeBanner = function() {
    $('.fullbanner__slick').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true
    })
} 

namePacote = function() {

    setTimeout(function(){
        var text = $('.myo-seller-name').eq(0).text();    
        $('.f4.mb0.lh-copy').text("Pedido " + text); 
        }, 1500);
    
}

$(document).ready(function() {
    SlickhomeBanner();
    namePacote();
});