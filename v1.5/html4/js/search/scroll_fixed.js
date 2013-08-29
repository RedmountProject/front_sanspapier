/*  Copyright (C) 2013 DELABY Benoit

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
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