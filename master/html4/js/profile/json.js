function displayProductsShelf(products, cde){
    
    var sp = window.sanspapier.config;
    var shelf = "";
    for(var key in products)
    {
        var product = products[key];
        var product_details = product['product'];
        var elementPrice = parseFloat(product['price']).toFixed(2);
        var formats_display = "";
        
        var firstname = "";
        if(product_details['author_firstname'] !== undefined)
            firstname = product_details['author_firstname'];
        
        var formats = new Array();
        var format_descr = new Array();
        
        for(var k=0; k<product['links'].length; k++)
        {
            formats.push(product['links'][k]);  
            format_descr.push(product['links'][k]['format_description']);
        }
        
        for(var j=0; j<formats.length; j++){
            formats_display += '<a href="'+formats[j]['url']+'" target="_blank" class="shelfElement_dwnldLink id="dwnldLink_'+product_details['product_id']+'_'+format_descr[j]+'">'+format_descr[j]+'</a>';            
        }
            
        shelf += '<div class="shelfElement_container" id="shelf_'+product_details['product_id']+'">\n\
                    <a href="#" class="bookSheetIdLink shelfElement_image"><img tooltip="'+product_details['product_id']+'" src="'+sp.images_url+product_details['publisher_id']+'/'+product_details['product_id']+'/'+product_details['product_id']+'_fc_E.jpg"/></a>\n\
                    <div class="shelfElement_price">'+elementPrice+' \u20ac</div>\n\
                    <div class="shelfElement_title">'+product_details['title']+'</div>\n\
                    <div class="shelfElement_author">'+firstname+" "+product_details['author_lastname']+' - '+product_details['publisher_name']+'</div>\n\
                    <div class="shelfElement_format">'+formats_display+'</div>\n\
                 </div>';
    }
    
    return shelf;
}