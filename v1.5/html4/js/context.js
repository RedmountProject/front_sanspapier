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
String.prototype.wordWrap = function(m, b, c){
    var i, j, l, s, r;
    if(m < 1)
        return this;
    for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
            || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
    return r.join("\n");
};

var context = function() {
    
    $("#logo").click(function() {
        var url = document.location.pathname.split("/");
        
        if(window.location.hash.indexOf("#!")==-1)
            window.location = window.sanspapier.config.front_url+"search.php#!main";
        else
            window.location = "#!main";
        
        if(url[url.length-1] == 'search.php')
        {
            
            callContent(0);
            $(".onglet").stop().animate({
                'height': '25px',
                'margin-top': '0px'
            }, 0);
            $("#call_0").animate({
                'height': '35px',
                'margin-top': '-10px'
            },100);
        }
            
    });
    
    $("#a_propos_footer").click(function(){
        window.location = window.sanspapier.config.front_url+"a_propos.php";
    });
    
    $("#contact_footer").click(function(){
        document.location.href = "mailto:benoit@sanspapier.com";
    });
    
    $("#blog_footer").click(function(){
        window.open('http://blog.sanspapier.com','_newtab'); 
    });
    
    $("#fb_footer").click(function(){
        window.open('http://www.facebook.com/pages/Sanspapiercom/322993334441560','_newtab'); 
    });
    
    $("#twt_footer").click(function(){
        window.open('https://twitter.com/Sanspap','_newtab'); 
    });
    
    $("#aide_en_ligne").click(function(){
        window.location = window.sanspapier.config.front_url+"aide_en_ligne.php";
    });    
    
    //GET SEARCH QUERY RESULT
    $("form:#search_action").submit(function() {
        var search_value = $("input:#search").val();
        var type_and_id = $("input:#search_hidden").val();
        $("input:#search_hidden").val('');
        
        if(type_and_id === ""){
            type_and_id = 2;
        }
        window.sanspapier.last_search_value = search_value;
        window.sanspapier.last_search_type = type_and_id;
        
        var encoded_value = "#!search_"+fixedEncodeURIComponent(search_value)+"_"+type_and_id;
        window.location = encoded_value;
    });
    
    $(".change_col").addClass("a_la_une");

    $("#scroll_fixed > .container_5 > .onglet").click(function(){
        $(".onglet").stop().animate({
            'height': '25px',
            'margin-top': '0px'
        }, 0);
        $(this).stop().animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
        
        var id = $(this).attr("id").split('_')[1];
        callContent(id);
        window.sanspapier.categories.lastCatDisplayed = id;
    })
}

// SHARED FUNCTIONS
function createCartResults(result, country) {
    var sp = window.sanspapier.config;
    var firstname = '';
    if(result['author_firstname']!==undefined)
        firstname = result['author_firstname'][0]+' ';
    else
        firstname="";
    
    var price = checkPriceForCountry(result, country, null, false);
    var encoded_value_cart = "#!booksheet_"+fixedEncodeURIComponent(result['product_id']);
    
    var format = "";
    
    if(result['is_package']==true){
        format = result['package_description'];
    }
    else
        format = result['format_name'][0].split('_')[1];
        
    var returnPanier = '<div class="cart_container">\n\
                            <div class="cartElement_container" id="cart_'+result['product_id']+'">\n\
                                <a href="'+encoded_value_cart+'" class="cartElement_image bookSheetIdLink" id="cartBooksheet_'+result['product_id']+'" title="Accéder à la fiche détaillée de ce livre"><img tooltip="'+result['product_id']+'" src="'+sp.images_url+result['publisher_id']+'/'+result['product_id']+'/'+result['product_id']+'_fc_E.jpg"/></a>\n\
                                <a href="'+encoded_value_cart+'" class="cartElement_title bookSheetIdLink" id="linkTitleBiblio_'+result['product_id']+'" tooltip="'+result['product_id']+'">'+result['title']+'</a>\n\
                                <div class="cartElement_author authorName">'+firstname+result['author_lastname'][0]+'</div>\n\
                                <div class="cartElement_publisher">'+result['publisher_name']+'</div>\n\
                                <div class="cartElement_formats">'+format+'</div>\n\
                                <div class="cartElement_price">'+price['data']+' \u20ac</div>\n\
                                <a href="#removedfromcart_'+result['product_id']+'" class="delete_cartElement" id="#cart_'+result['product_id']+'"><img src="http://sanspapier.com/images/icons/delete.png" /></a>\n\
                            </div>\n\
                        </div>';
    
    return returnPanier;
}

function fillCartDom(content) {
    $('#panier_display').html(content);
}

function fixedEncodeURIComponent (str) {
    str = str.replace(/[.\/|_]/g, '');
    return $.trim(encodeURIComponent(str).replace(/[!'()*]/g, escape));
}

function checkPriceForCountry(pDocument, pCountry, pDefaultCountry, pGetDefault) {
    var returnData = new Array();
    returnData['type'] = 'normalPrice';
    if('WO_EUR_TTC_c' in pDocument)
    {
        returnData['data'] = parseFloat(pDocument['WO_EUR_TTC_c']).toFixed(2);
        return returnData;
    }
    
    if(pCountry+'_EUR_TTC_c' in pDocument)
    {
        returnData['data'] = parseFloat(pDocument[pCountry+'_EUR_TTC_c']).toFixed(2);
        return returnData;
    }
    
    if(pGetDefault)
    {
        returnData['type'] = 'defaultPrice';
        returnData['data'] = parseFloat(pDocument[pDefaultCountry+'_EUR_TTC_c']).toFixed(2);
        return returnData;
    }
    returnData['type'] = 'noPrice';
    returnData['data'] =  -1;
    
    return returnData;
}