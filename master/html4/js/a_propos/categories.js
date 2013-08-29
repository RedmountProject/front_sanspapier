function categories() {
    //    $(".onglet").hover(function () {
    //            $(this).animate({
    //                'height': '30px',
    //                'margin-top': '-5px'
    //            },0);
    //        },
    //        function(){
    //            $(this).animate({
    //                'height': '25px',
    //                'margin-top': '0px'
    //            }, 50);
    //        });
        
        
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
    $("#callOngletCGV").click(function(){
        
        $("#content_slider").animate({
            'margin-left':-960+'px'
        }, 300) 
    })
    
    $("#callOngletPresse").click(function(){
        
        $("#content_slider").animate({
            'margin-left':-960*2+'px'
        }, 300) 
    })
        
    
}