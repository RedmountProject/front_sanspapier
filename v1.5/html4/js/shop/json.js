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
function displayProductsShelf(products){
    var sp = window.sanspapier.config;
    var shelf = "";
    for(var i=0; i<products.length; i++){
        var product = products[i];
        var product_details = product['product'][0];
        var elementPrice = parseFloat(product['price']).toFixed(2);
        
        var firstname = "";
        if(product_details['author_firstname']!==undefined)
            firstname = product_details['author_firstname'][0];
            
        shelf += '<div class="shelfElement_container" id="shelf_'+product_details['product_id']+'">\n\
                    <a href="#" class="bookSheetIdLink shelfElement_image"><img tooltip="'+product_details['product_id']+'" src="'+sp.images_url+product_details['publisher_id']+'/'+product_details['product_id']+'/'+product_details['product_id']+'_fc_E.jpg"/></a>\n\
                    <div class="shelfElement_price">'+elementPrice+' \u20ac</div>\n\
                    <div class="shelfElement_title">'+product_details['title']+'</div>\n\
                    <div class="shelfElement_author">'+firstname+" "+product_details['author_lastname'][0]+'</div>\n\
                    <div class="shelfElement_publisher">'+product_details['publisher_name']+'</div>\n\
                 </div>';
    }
    
    return shelf;
}



function createOrderPipeResults(result, country) {
    var sp = window.sanspapier.config;
    var returnElements = "";
    var elementPrice = checkPriceForCountry(result, country, null, true);
    var format = "";
    var firstname = "";
    var lastname = "";
    
    if(result['is_package'])
        format = result['package_description'];
    else
        format = result['format_name'][0].split('_')[1];
    
    if(result['author_firstname'])
        firstname = result['author_firstname'][0];
    
    if(result['author_lastname'])
        lastname = result['author_lastname'][0];
    
    returnElements = '<div class="cartElement_container" id="cart_'+result+'">\n\
                        <a href="#'+result['product_id']+'" style="float:right;" class="delete_cartElement" id="#cart_'+result['product_id']+'"><img src="http://sanspapier.com/images/icons/delete.png" /></a>\n\
                        <div class="cartElement_image"><img src="'+sp.images_url+result['publisher_id']+'/'+result['product_id']+'/'+result['product_id']+'_fc_E.jpg"/></div>\n\
                        <div class="cartElement_title">'+result['title']+'</div>\n\
                        <div class="cartElement_author">'+firstname+" "+lastname+'</div>\n\
                        <div class="cartElement_publisher">'+result['publisher_name']+'</div>\n\
                        <div class="cartElement_price">'+elementPrice['data']+' \u20ac</div>\n\
                        <div class="cartElement_format">'+format+'</div>\n\
                      </div>';
    
    return returnElements;
}

function createOrderPipeResultsError(result) {
    var sp = window.sanspapier.config;
    var returnElements = "";
    var format = "";
    var firstname = "";
    var lastname = "";
    var errorMsg = '<div class="errorInShopElt">Ce livre est temporairement indisponible, nous l\'avons supprimé automatiquement de votre panier. Veuillez nous excuser pour ce désagrément.</div>';
    
    if(result['is_package'])
        format = result['package_description'];
    else
        format = result['format_name'][0].split('_')[1];
    
    if(result['author_firstname'])
        firstname = result['author_firstname'][0];
    
    if(result['author_lastname'])
        lastname = result['author_lastname'][0];
    
    returnElements = '<div class="cartElement_container" id="cart_'+result+'">\n\
                        <div class="cartElement_image"><img src="'+sp.images_url+result['publisher_id']+'/'+result['product_id']+'/'+result['product_id']+'_fc_E.jpg"/></div>\n\
                        <div class="cartElement_title">'+result['title']+'</div>\n\
                        <div class="cartElement_author">'+firstname+" "+lastname+'</div>\n\
                        <div class="cartElement_publisher">'+result['publisher_name']+'</div>\n\
                        <div class="cartElement_format">'+format+'</div>\n\
                        '+errorMsg+'\n\
                      </div>';
    
    return returnElements;
}