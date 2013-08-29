/*  Copyright (C) 2013 GAYON Matthieu

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
function loadCSS(url) {
    if (document.createStyleSheet)
    {
        document.createStyleSheet(url);
    }
    else {
        $('<link rel="stylesheet" type="text/css" href="' + url + '" />').appendTo('head'); 
    } 
}

function canvasDetection() {   
    return !!window.CanvasRenderingContext2D;
}

var feature = function() {
    
    var canvasHtml = '<canvas id="canvas" width="960" height="550"></canvas>';
    var hoverContent_css_rafael_url = "css/cible_hover.css";
    var hoverContent_css_easel_url = "css/cible_hover_easel.css";
    
    if (canvasDetection()) {

        $LAB
        .script("js/easeljs-0.5.0.min.js").wait()
        .script("js/tweenjs-0.3.0.min.js").wait()
        .script(filemtime("js/search/easel/book.js"))
        .script(filemtime("js/search/easel/book_container.js"))
        .script(filemtime("js/search/easel/cible_easel.V2.0.js"))
        .script(filemtime("js/search/ajax.js")).wait()
        .script(filemtime("js/search/init.js")).wait(function() {
            
            $('#cible_feature').html(canvasHtml); 
            $('#search_result').css({'display':'block','position':'absolute'});
            $('#result_pagination').css({'top':'-30px','margin-top':'0px'});
            loadCSS(hoverContent_css_easel_url);                     
            
            window.sanspapier.myeasel = new easel();   ////// drive the html5 cible!!!!
            
            window.sanspapier.myeasel.ajax = AjaxController;
            init_after();
        });        
    }
    else {
        $LAB
        .script(filemtime("js/search/raphael.js")).wait()
        .script(filemtime("js/search/cible.js")).wait()
        .script(filemtime("js/search/ajax.js")).wait()
        .script(filemtime("js/search/init.js")).wait(function() {
            loadCSS(hoverContent_css_rafael_url);
            rafael();
            init_after();
        });
    }
    
}();

