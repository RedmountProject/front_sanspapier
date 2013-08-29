(function($){
    $.fn.scrollFixed = function(params){
        var y = 0;
        
        params = $.extend( {
            appearAfterDiv: 0, 
            hideBeforeDiv: 0,
            space:0
        }, params);
        var element = $(this);
        var space_element = $(params.space);
        
        var relative_height = $(params.appearAfterDiv).offset().top + $(params.appearAfterDiv).outerHeight(true);
        var absolute_height = element.offset().top

        if(params.appearAfterDiv)
            var distanceTop = element.offset().top - 21  - $(params.appearAfterDiv).outerHeight(false) - element.outerHeight(false);
        else
            var distanceTop = element.offset().top;

        
        element.css({
                    'position':'relative'
                });
 
        $(window).scroll(function(){
            if( $(window).scrollTop() > distanceTop) {
                element.css({               
                    'position':'fixed',
                    'top' :  relative_height
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
})(jQuery);


var fixScrollBar = function(){
	$("#scroll_fixed").scrollFixed({appearAfterDiv:'#filtres',space: '#space'});
}