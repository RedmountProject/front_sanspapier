function categories() {
    
    $(".onglet").click(function(){
        $(".onglet").animate({
            'height': '25px',
            'margin-top': '0px'
        }, 0);
        $(this).animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
            
        var id = $(this).attr("id").split('_')[1];
            
        $("#content_slider").animate({
            'margin-left':-id*960+'px'
        }, 300)    
            
    })
}

function textLinks(){
    $("#callOngletDRM").click(function(){
        
        $("#content_slider").animate({
            'margin-left':-960+'px'
        }, 300);
        
        $(".onglet").animate({
            'height': '25px',
            'margin-top': '0px'
        }, 0);
        
        $("#call_1").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    })
    
    $("#callOngletFormats").click(function(){
        
        $("#content_slider").animate({
            'margin-left':-960*2+'px'
        }, 300);
        
        $(".onglet").animate({
            'height': '25px',
            'margin-top': '0px'
        }, 0);
        
        $("#call_2").animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    })
        
    
}