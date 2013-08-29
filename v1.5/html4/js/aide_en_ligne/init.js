/*  Copyright (C) 2013 DELABY Benoit
    Copyright (C) 2013 GOGUELIN Thomas

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