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
