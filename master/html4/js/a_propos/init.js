
window.onload = function() { 
    
    categories();
    textLinks();
    userForm();
    context();
    cart_tooltip();
    refreshCart();
    send_contact();
    AjaxController.resetCategoriesMarkers();
    
    $('html,body').animate({
            scrollTop: 0
        },0);
    
    if(window.location.hash.indexOf("#contact") != -1) {
        $("#a_propos_container #content_slider").animate({
            'margin-left':-3*960+'px'
        }, 0)
        $("#call_3").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    } else if(window.location.hash.indexOf("#cgv") != -1) {
        $("#a_propos_container #content_slider").animate({
            'margin-left':-1*960+'px'
        }, 0)
        $("#call_1").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    }
    else {
        $("#call_0").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    }
}
