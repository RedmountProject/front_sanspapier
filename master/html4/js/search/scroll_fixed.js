(function($){
    
    $.fn.scrollFixed = function(params){        
        params = $.extend( {
            appearAfterDiv: 0, 
            hideBeforeDiv: 0,
            space:230,
            onglet:0
        }, params);
        var element = $(this);
        var space_element = $(params.space);
        var onglet_height = $(params.onglet).outerHeight(true); 
        var relative_height = $(params.appearAfterDiv).outerHeight(true);
        var distanceTop = 0;
        
        if(params.appearAfterDiv)
            distanceTop = element.offset().top   - relative_height + onglet_height;
        else
            distanceTop = element.offset().top;
        
        window.sanspapier.distanceTop = distanceTop;
        element.css({
            'position':'relative'
        });
 
        $(window).scroll(function(){
            if( $(window).scrollTop() > distanceTop) {
                element.css({               
                    'position':'fixed',
                    'top' :  $('#sp').outerHeight(true) - onglet_height
                });
                space_element.css({
                    'height' : element.outerHeight(true) 
                });
            }
            else {
                element.css({
                    'position':'relative',
                    'top' :  '0'
                });
                space_element.css({
                    'height' : '0'
                });
            }
        });			  
    };
//    
//    
//    $.fn.scrollFixedTutoElem = function(params){
//        var y = 0;
//        
//        params = $.extend( {
//            appearAfterDiv: 0, 
//            hideBeforeDiv: 0,
//            space:230,
//            onglet:0,
//            id: 0,
//            initialTop: 0
//        }, params);
//        var element = $(this);
//        var space_element = $(params.space);
//        
//        var onglet_height = $(params.onglet).outerHeight(true); 
//        
//        var id = params.id;
//        var initialTop = params.initialTop;
// 
//        $(window).scroll(function(){
//            
//            if( $(window).scrollTop() > window.sanspapier.distanceTop) {
//
//                if(id==4)
//                    var top = $('#sp').outerHeight(true) - onglet_height + (parseInt(initialTop.split('p')[0]) - window.sanspapier.distanceTop)/4;
//                if(id==5)
//                    var top = $('#sp').outerHeight(true) - onglet_height - (parseInt(initialTop.split('p')[0]) - window.sanspapier.distanceTop);
//                
//                element.css({               
//                    'position':'fixed',
//                    'top' :  top
//                });
//                
//                element.qtip('reposition');
//
//            }
//            else {
//                element.css({
//                    'position':'absolute',
//                    'top' :  initialTop
//                });
//
//                element.qtip('reposition');
//            }
//        });			  
//    };

    
    
})(jQuery);


var fixScrollBar = function(parent){
    
    $(parent).scrollFixed({
        appearAfterDiv:'#sp',
        space: '#space', 
        onglet: '#call_0'
    });
}

var fixScrollBarSecond = function(parent){
    $(parent).scrollFixed({
        appearAfterDiv:'#sp',
        space: '#space', 
        onglet: '#call_0'
    });
}
//
//
//var fixScrollTutoElem = function(parent, id, initialTop){
//    $(parent).scrollFixedTutoElem({
//        appearAfterDiv:'#sp',
//        space: '#space', 
//        onglet: '#call_0', 
//        id:id,
//        initialTop:initialTop
//    });
//}
