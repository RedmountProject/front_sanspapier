
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

