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