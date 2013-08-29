/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var init_obj = {
    
}

obcat(window.sanspapier, init_obj);
window.onload = function(){
    categories();
    textLinks();
    userForm();
    context();
    cart_tooltip();
    refreshCart();
    AjaxController.resetCategoriesMarkers();
    
    if(window.location.hash.indexOf("#formats")!=-1){
        $("#aide_container #content_slider").animate({
            'margin-left':-2*960+'px'
        }, 0)  
        
        $('html,body').animate({
            scrollTop: 0
        },0);
        
        $("#call_2").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
                    
    }
    else if(window.location.hash.indexOf("#drm")!=-1){
        $("#aide_container #content_slider").animate({
            'margin-left':-1*960+'px'
        }, 0)  
        
        $('html,body').animate({
            scrollTop: 0
        },0);
        
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