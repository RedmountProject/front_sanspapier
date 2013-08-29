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