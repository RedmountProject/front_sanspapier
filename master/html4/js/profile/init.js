var conf = {
  'mes_prefs': "",
  'infos_html' : "",
  'mdp_html' : "",
  'achats_html' : ""
}   

function init_after() {
    // add to the conf
    obcat(window.sanspapier.config, conf);

    $("#return").click(function(){
    window.location = window.sanspapier.config.front_url+"search.php";
    });

    AjaxController.is_logged();
    AjaxController.mes_achats();
    AjaxController.resetCategoriesMarkers();

    categories();
    context();

    cart_tooltip();
    refreshCart();

    userForm();

    if(window.location.hash.indexOf("#achats") != -1){

        $("#overflowContainer #content_slider").animate({
            'margin-left':-1*960+'px'
        }, 0)  

        $("#call_1").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    }
    else{
        $("#call_0").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    }
}
