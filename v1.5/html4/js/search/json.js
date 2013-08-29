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
// MOSAIQUE
function parseJsonForCategories(colResult, i, country, defaultCountry) {
    
    var sp = window.sanspapier.config;
    var column_content = "";
    for(var key in colResult)
    {
        var obj = colResult[key];
        var description = obj['description'];
        var regex = /(<([^>]+)>)/ig;
        description = description.replace(regex,"");
        
        if(description.length < 330)
            description = description.substr(0,340);
        else
            description = description.substr(0,340)+" (...)";
        
        var firstname = '';
        if(obj['author_firstname']!==undefined)
            firstname = obj['author_firstname'][0]+' ';
        
        var lastname = obj['author_lastname'][0];
        var author_searchable = obj['author_searchable'][0];
        var author_id = obj['author_id'][0];
        
        var author = firstname + lastname;
        
        var authorSlice = author;
        if(author.length > 40)
            authorSlice = author.slice(0,40)+"...";
        
        var formats = "";
        for(var k=0; k<obj['format_name'].length; k++)
        {
            if(k==obj['format_name'].length-1)
                formats+=obj['format_name'][k].split('_')[0];
            else
                formats+=obj['format_name'][k].split('_')[0]+", ";
        }
        
        var price = checkPriceForCountry(obj, country, defaultCountry, true);
        var encoded_value = "#!booksheet_"+fixedEncodeURIComponent(obj['product_id']);
        
        var contentInfos = "";  
        
        contentInfos += "<dl><dt>Format(s) :</dt><dd>"+formats+"</dd>";
        
        var publishingDate = "N.C.";
        if(obj['publishing_date'] !== undefined)
        {
            publishingDate = new Date(obj['publishing_date'].slice(0,10));
            publishingDate = ("0" + publishingDate.getDate()).slice(-2)+'/'+("0" + publishingDate.getMonth()).slice(-2)+'/'+publishingDate.getFullYear();
        }
        contentInfos += "<dt>Date de publication :</dt><dd>"+publishingDate+"</dd>";

        var isbn = "";
        if(obj['isbn'] != "" && obj['isbn'] != 0)
            isbn = obj['isbn'];
        else
            isbn = "N.C.";
        contentInfos += "<dt>EAN :</dt><dd>"+isbn+"</dd>";

        var pagesNb = "";
        if(obj['nb_pages'] != '' && obj['nb_pages'] > 10)
            pagesNb = obj['nb_pages'];
        else 
            pagesNb = "N.C."; 
        contentInfos += "<dt>Nombre de pages :</dt><dd>"+pagesNb+"</dd>";
        
        var fileSize = "";
        if(obj['file_size'] != 0 && obj['file_size'] != '')
            fileSize = String(parseInt(obj['file_size'])/1024).substr(0, 4) + " Mo";
        else
            fileSize = "N.C.";
        contentInfos += "<dt>Taille du fichier :</dt><dd>"+fileSize+"</dd></dl>";

        var title = obj['title'];
        var titleSlice = title;
        if(title.length>50)
            titleSlice = title.slice(0, 50)+"...";
        
        var publisher = obj['publisher_name'];
        var publisherSlice = publisher;
        if(publisher.length>20)
            publisherSlice = publisher.slice(0, 20)+"...";
        
        column_content += ('<div class="fiche_mosaique col_'+i+'" id="fiche_'+obj['product_id']+'__'+obj['publisher_id']+'">\n\
                                <a href="'+encoded_value+'" class="bookSheetIdLink imageMo" id="linkPic_'+obj['product_id']+'_mosaicImage" title="Accéder à la fiche détaillée de ce livre"><img tooltip="'+obj['product_id']+'" src="'+sp.images_url+obj['publisher_id']+'/'+obj['product_id']+'/'+obj['product_id']+'_fc_B.jpg"/></a>\n\
                                <div class="titre_auteur">\n\
                                    <a href="'+encoded_value+'" class="bookSheetIdLink titreMo" id="linkTitleMo_'+obj['product_id']+'_mosaicTitre" tooltip="'+obj['product_id']+'" title="Accéder à la fiche détaillée de '+title+'">'+titleSlice+'</a>\n\
                                    <div class="auteurMo authorName" author_id="'+author_id+'" author_searchable="'+author_searchable+'" title="Lancer une nouvelle recherche autour de '+author+'">'+authorSlice+'</div>\n\
                                    <div class="editeurMo" title="'+publisher+'">'+publisherSlice+'</div>\n\
                                </div>\n\
                                <div class="textMo">'+description+'</div>\n\
                                <div class="infosMo">'+contentInfos+'</div>\n\
                                <div class="info_content">\n\
                                    <a href="#chooseFormatFor_'+obj['product_id']+'" class="buy_buttonMo addToCart" id="buyMos_'+obj['product_id']+'_mosaic" title="Télécharger le livre"></a>\n\
                                    <a href="'+encoded_value+'" class="bookSheetIdLink info_buttonMo" id="link_'+obj['product_id']+'_mosaicButtonInfo" title="Accéder à la fiche détaillée de ce livre"></a>\n\
                                </div>\n\
                            </div>');
    }
    
    $('#lib_0 .column'+i).html(column_content);
}


//PREF CATEGORIES
function parseJsonForPrefCategories(colResult, columnId, lib_id, length, country, defaultCountry) {
    
    var sp = window.sanspapier.config;
    var column_content = "";
    if(length == "" || length > colResult.length)
        length = colResult.length;
    
    for(var j=0; j<length; j++) {
        
        var description = colResult[j]['description'];
        var regex = /(<([^>]+)>)/ig;
        description = description.replace(regex,"");
        
        if(description.length < 330)
            description = description.substr(0,340);
        else
            description = description.substr(0,340)+" (...)";
        
        var firstname = '';
        if(colResult[j]['author_firstname']!==undefined)
            firstname = colResult[j]['author_firstname'][0]+' ';
        
        var lastname = colResult[j]['author_lastname'][0];
        
        var author_searchable = colResult[j]['author_searchable'][0];
        var author_id = colResult[j]['author_id'][0];

        var author = firstname + lastname;
        var authorSlice = author;
        if(author.length > 40)
            authorSlice = author.slice(0,40)+"...";
        
        var formats = "";
        for(var k=0; k<colResult[j]['format_name'].length; k++)
        {
            if(k==colResult[j]['format_name'].length-1)
                formats+=colResult[j]['format_name'][k].split('_')[0];
            else
                formats+=colResult[j]['format_name'][k].split('_')[0]+", ";
        }
        
        var price = checkPriceForCountry(colResult[j], country, defaultCountry, true);
        
        var encoded_value = "#!booksheet_"+fixedEncodeURIComponent(colResult[j]['product_id']);
        
        var contentInfos = "";  
        
        contentInfos += "<dl><dt>Format(s) :</dt><dd>"+formats+"</dd>";
        
        var publishingDate = "N.C.";
        if(colResult[j]['publishing_date'] !== undefined)
        {
            publishingDate = new Date(colResult[j]['publishing_date'].slice(0,10));
            publishingDate = ("0" + publishingDate.getDate()).slice(-2)+'/'+("0" + publishingDate.getMonth()).slice(-2)+'/'+publishingDate.getFullYear();
        }
        contentInfos += "<dt>Date de publication :</dt><dd>"+publishingDate+"</dd>";

        var isbn = "";
        if(colResult[j]['isbn'] != "" && colResult[j]['isbn'] != 0)
            isbn = colResult[j]['isbn'];
        else
            isbn = "N.C.";
        contentInfos += "<dt>EAN :</dt><dd>"+isbn+"</dd>";

        var pagesNb = "";
        if(colResult[j]['nb_pages'] != '' && colResult[j]['nb_pages'] > 10)
            pagesNb = colResult[j]['nb_pages'];
        else 
            pagesNb = "N.C.";
        contentInfos += "<dt>Nombre de pages :</dt><dd>"+pagesNb+"</dd>";

        var fileSize = "";
        if(colResult[j]['file_size'] != 0 && colResult[j]['file_size'] != '')
            fileSize = String(parseInt(colResult[j]['file_size'])/1024).substr(0, 4) + " Mo";
        else
            fileSize = "N.C.";
        contentInfos += "<dt>Taille du fichier :</dt><dd>"+fileSize+"</dd></dl>";
        
        var title = colResult[j]['title'];
        var titleSlice = title;
        if(title.length>50)
            titleSlice = title.slice(0, 50)+"...";
        
        var publisher = colResult[j]['publisher_name'];
        var publisherSlice = publisher;
        if(publisher.length>20)
            publisherSlice = publisher.slice(0, 20)+"...";
        
        column_content += ('<div class="fiche_mosaique col_'+columnId+'" id="fiche_'+colResult[j]['product_id']+'__'+colResult[j]['publisher_id']+'">\n\
                                <a href="'+encoded_value+'" class="bookSheetIdLink imageMo" id="linkPic_'+colResult[j]['product_id']+'_mosaicPersoImage" title="Accéder à la fiche détaillée de ce livre"><img tooltip="'+colResult[j]['product_id']+'" src="'+sp.images_url+colResult[j]['publisher_id']+'/'+colResult[j]['product_id']+'/'+colResult[j]['product_id']+'_fc_B.jpg"/></a>\n\
                                <div class="titre_auteur">\n\
                                    <a href="'+encoded_value+'" class="bookSheetIdLink titreMo" id="linkTitleMo_'+colResult[j]['product_id']+'_mosaicPersoTitre" tooltip="'+colResult[j]['product_id']+'" title="Accéder à la fiche détaillée de '+title+'">'+titleSlice+'</a>\n\
                                    <div class="auteurMo authorName" author_id="'+author_id+'" author_searchable="'+author_searchable+'" title="Lancer une nouvelle recherche autour de '+author+'">'+authorSlice+'</div>\n\
                                    <div class="editeurMo" title="'+publisher+'">'+publisherSlice+'</div>\n\
                                </div>\n\
                                <div class="textMo">'+description+'</div>\n\
                                <div class="infosMo">'+contentInfos+'</div>\n\
                                <div class="info_content">\n\
                                    <div class="infos_achatMo">\n\
                                        <div class="prixMo">'+price['data']+" \u20ac"+'</div>\n\
                                    <!--<div class="formatsMo">'+formats+'</div>-->\n\
                                    </div>\n\
                                    <a href="#chooseFormatFor_'+colResult[j]['product_id']+'" class="buy_buttonMo addToCart" id="buyMos_'+colResult[j]['product_id']+'_mosaicPerso" title="Ajouter ce livre au panier"></a>\n\
                                    <a href="'+encoded_value+'" class="bookSheetIdLink info_buttonMo" id="link_'+colResult[j]['product_id']+'_mosaicPersoButtonInfo" title="Accéder à la fiche détaillée de ce livre"></a>\n\
                                </div>\n\
                            </div>');
    }
    
    $('#lib_'+lib_id+' .column'+columnId).html(column_content);
}



// BOOKSHEET
function parseJsonForBookSheet(jsonFile, divId) {
    
    createBookSheet(divId, jsonFile['result'], jsonFile['sameAuthor'], jsonFile['otherEditors'], jsonFile['country'], jsonFile['defaultCountry']);
}

function createBookSheet(parent, result, sameAuthorIds, otherEditorsIds, country, defaultCountry) {
        
    var sp = window.sanspapier.config;
    var path = ' #'+parent+" .container_fiche";
    var firstname = '';
    if(result[0]['author_firstname']!==undefined)
        firstname = result[0]['author_firstname'][0]+' ';
    
    if(result[0]['author_id']!==undefined)
        var author_id = result[0]['author_id'][0];
    
    if(result[0]['author_searchable']!==undefined)
        var author_searchable = result[0]['author_searchable'][0];
    
    
    var text = result[0]['description'];
    var regex = /(<\/?(a|span|ul|li|div)>)/ig;
    text = text.replace(regex,"");
    window.sanspapier.booksheet.fullText = text;
    if(text.length > window.sanspapier.booksheet.textLength){
        text = text.slice(0, window.sanspapier.booksheet.textLength)+" (...)";
        text += '<br><div class="moreText">(afficher la suite)</div>';
    }
    
    $(path+" .image").html('<img src="'+sp.images_url+result[0]['publisher_id']+'/'+result[0]['product_id']+'/'+result[0]['product_id']+'_fc_'+window.sanspapier.defFormats.booksheetIMG+'.jpg" >');
    $(path+" .titres").html('<h1>'+result[0]['title']+'</h1><h2 class="authorName"  author_id="'+author_id+'" author_searchable="'+author_searchable+'" title="Lancer une nouvelle recherche autour de cet auteur">'+firstname+result[0]['author_lastname'][0]+'</h2>'+'<h3>'+result[0]['publisher_name']+'</h3>');
    $(path+" .publisher_logo").html('<a href="http://www.ebooksgratuits.com" target="_blank"><img src="'+sp.publisher_images_url+result[0]['publisher_id']+'.png" ></a>');
    $(path+" .text").html(text);
    
    var formatContent = '<span class="labelChooseFormatBooksheet">Choisissez le format de fichier voulu : </span>';
    formatContent += "<select name='selectFormats' class='selectFormats' id='formatSlider_"+result[0]['product_id']+"'>";
    var optionValue = result[0]['format_id'];
    if(typeof(result[0]['related_products'])!="undefined")
        var related_product = result[0]['related_products'];
    
    var optionText = new Array();
    
    if(result[0]['is_package'] == true)
    {
        optionText[0] = "Multi-formats";
        formatContent += "<option value='"+optionValue+"__"+result[0]['product_id']+"'>Multi-formats</option>";
    }
    else
    {
        for(var k = 0; k < optionValue.length; k++)
        {
            optionText[k] = result[0]['format_name'][k].split('_')[1];
            if(typeof(related_product)!="undefined" && k>0)
                formatContent += "<option value='"+optionValue[k]+"__"+related_product[k-1]+"'>"+optionText[k]+"</option>";
            else
                formatContent += "<option value='"+optionValue[k]+"__"+result[0]['product_id']+"'>"+optionText[k]+"</option>";
        }
    }
    formatContent += "</select>";
    
    var contentInfos = "";  
    
    var publishingDate = "N.C.";
    if(result[0]['publishing_date'] !== undefined)
    {
        publishingDate = new Date(result[0]['publishing_date'].slice(0,10));
        publishingDate = ("0" + publishingDate.getDate()).slice(-2)+'/'+("0" + publishingDate.getMonth()).slice(-2)+'/'+publishingDate.getFullYear();
    }
    contentInfos += '<div class="extraitBookContainer"></div>';
    contentInfos += "<dl><dt>Date de publication :</dt><dd>"+publishingDate+"</dd>";
    
    var isbn = "";
    if(result[0]['isbn'] != "" && result[0]['isbn'] != 0)
        isbn = result[0]['isbn'];
    else
        isbn = "N.C.";
    //contentInfos += "<dt>EAN :</dt><dd>"+isbn+"</dd>";
    
    var pagesNb = "";
    if(result[0]['nb_pages'] != '' && result[0]['nb_pages'] > 10)
        pagesNb = result[0]['nb_pages'];
    else 
        pagesNb = "N.C."; 
    contentInfos += "<dt>Nombre de pages :</dt><dd>"+pagesNb+"</dd>";
    
    var fileSize = "";
    if(result[0]['file_size'] != 0 && result[0]['file_size'] != '')
        fileSize = String(parseInt(result[0]['file_size'])/1024).substr(0, 4) + " Mo";
    else
        fileSize = "N.C.";
    contentInfos += "<dt>Taille du fichier :</dt><dd>"+fileSize+"</dd></dl>";
    
    $(path+" .infos").html(contentInfos);
    var price = checkPriceForCountry(result[0], country, defaultCountry, true);
    
    switch(price['type'])
    {
        case 'normalPrice':
            $(path+" .formats").html(formatContent);
            $(path+" .prix").html('');
            $(path+" .buy_button").html('<a href="http://www.sanspapier.com/books/600/'+result[0]['product_id']+'.'+result[0]['format_name'][0].split('_')[0]+'" class="choose_format_button" id="buyBookSheet_'+result[0]['product_id']+'"></a>');
            break;
        case 'defaultPrice':
            $(path+" .formats").html('');
            $(path+" .prix").html('');
            $(path+" .buy_button").html('');
            $(path+" #formats_slider").html("<div style='font-size:14px;color:#FF0000;font-weight:bold;width:90%;text-align:center;padding:15px;padding-top:40px;line-height:20px;'>Nous sommes désolés, ce livre n'est pas disponible à l'achat depuis votre pays.</div>");
            break;
        case 'noPrice':
            $(path+" .formats").html('');
            $(path+" .prix").html('');
            $(path+" .buy_button").html('');
            $(path+" #formats_slider").html("<div style='font-size:14px;color:#FF0000;font-weight:bold;width:90%;text-align:center;padding:15px;padding-top:40px;line-height:20px;'>Nous sommes désolés, ce livre n'est pas disponible à l'achat depuis votre pays.</div>");
            break;
    }
    
    if(result[0]['extract_url'] !== undefined) {
        $(path+" .extraitBookContainer").html('<a href="'+result[0]['extract_url']+'" target="_blank"><div class="extraitBook">Lire un extrait en ligne</div></a>');
    }
        
        
    //SLIDER AUTHOR
    var li_author="";
    
    for(var i=0; i<sameAuthorIds.length; i++) {
        var encoded_value_authors = "#!booksheet_"+fixedEncodeURIComponent(sameAuthorIds[i]['product_id']);
        li_author += ('<li id="authorSlider_'+sameAuthorIds[i]['product_id']+'" title="'+sameAuthorIds[i]['title']+' : accéder à la fiche détaillée du livre"><a style="width:100px;" href="'+encoded_value_authors+'" class="bookSheetIdLink" id="slider_'+sameAuthorIds[i]['product_id']+'"><img tooltip="'+sameAuthorIds[i]['product_id']+'" src="'+sp.images_url+sameAuthorIds[i]['publisher_id']+'/'+sameAuthorIds[i]['product_id']+'/'+sameAuthorIds[i]['product_id']+'_fc_D.jpg" class="imgMiniBookSheet" /></a></li>');
    }
    
    $("#authors_slider").html("<ul>"+li_author+"</ul>");
    $("#sameAuthor_title").html("Du même auteur ("+sameAuthorIds.length+")")
    
    //SLIDER EDITORS
    var li_editor="";
    
    for(i=0; i<otherEditorsIds.length; i++) {
        var encoded_value_ed = "#!booksheet_"+fixedEncodeURIComponent(otherEditorsIds[i]['product_id']);
        li_editor+=('<li id="editorsSlider_'+otherEditorsIds[i]['product_id']+'" title="'+otherEditorsIds[i]['title']+' (éditions '+otherEditorsIds[i]['publisher_name']+') : accéder à la fiche détaillée du livre"><a style="width:100px;" href="'+encoded_value_ed+'" class="bookSheetIdLink" id="slider_'+otherEditorsIds[i]['product_id']+'"><img tooltip="'+otherEditorsIds[i]['product_id']+'" src="'+sp.images_url+otherEditorsIds[i]['publisher_id']+'/'+otherEditorsIds[i]['product_id']+'/'+otherEditorsIds[i]['product_id']+'_fc_D.jpg" class="imgMiniBookSheet" /></li>');
    }
    
    $("#editors_slider").html("<ul>"+li_editor+"</ul>");
    $("#sameEd_title").html("Dans d'autres éditions ("+otherEditorsIds.length+")");
}

// HOVER SHEETS

function createTargetResults(parent, result, country, defaultCountry) {
    var path = $('#'+parent);
    var hover_containers = "";
    var beginIndex = 0;
    if(result[0]['product_id'] == 999999) {
        beginIndex = 1;
        hover_containers += createNoPivotResult(result[0]);
    }
    for (var i=beginIndex; i<result.length; i++) {
        var encoded_value_hover = "#!booksheet_"+fixedEncodeURIComponent(result[i]['product_id']);
        var description = result[i]['description'];
        var regex = /(<([^>]+)>)/ig;
        description = description.replace(regex,"");
        description = description.substr(0,180)+'... <a href="'+encoded_value_hover+'" class="bookSheetIdLink suite_description" id="hoverInfoPlus_'+result[i]['product_id']+'">(suite)</a>';
        
        var formats = "";
        var firstname = "";
        var lastname = "";
        var price = checkPriceForCountry(result[i], country, defaultCountry, true);
        
        if(result[i]['author_firstname'] !== undefined)
            firstname = result[i]['author_firstname'][0]+' ';
        
        if(result[i]['author_searchable'] !== undefined)
            var author_searchable = result[i]['author_searchable'][0];
        
        if(result[i]['author_id'] !== undefined)
            var author_id = result[i]['author_id'][0];
        
        if(result[i]['author_lastname'] !== undefined)
            lastname = result[i]['author_lastname'][0];
        
        for(var k=0; k<result[i]['format_name'].length; k++)
        {
            if(k==result[i]['format_name'].length-1)
                formats+=result[i]['format_name'][k].split('_')[1];
            else
                formats+=result[i]['format_name'][k].split('_')[1]+", ";
        }
        
        hover_containers += '<div id="target_'+result[i]['product_id']+'_'+result[i]['publisher_id']+'" class="hover_content" style="display : none; cursor:default;">\n\
                                <div class="hover_titre_auteur">\n\
                                    <a href="'+encoded_value_hover+'" class="bookSheetIdLink hover_title" id="linkTitleTarget_'+result[i]['product_id']+'_target" tooltip="'+result[i]['product_id']+'" title="Accéder à la fiche détaillée de ce livre">'+result[i]['title']+'</a>\n\
                                    <div class="hover_auteur authorName"  author_id="'+author_id+'" author_searchable="'+author_searchable+'" title="Lancer une nouvelle recherche autour de cet auteur">'+firstname+lastname+'</div>\n\
                                    <div class="hover_publisher">'+result[i]['publisher_name']+'</div>\n\
                                </div>\n\
                                <div class="hover_description">'+description+'</div>\n\
                                <div class="hover_infos_achat">\n\
                                    <div class="hover_formats">'+formats+'</div>\n\
                                </div>\n\
                                <div class="hover_buttons">\n\
                                    <a href="#chooseFormatFor_'+result[i]['product_id']+'" class="buy_buttonMo addToCart" id="buyTarget_'+result[i]['product_id']+'_target" title="Télécharger le livre"></a>\n\
                                    <a href="'+encoded_value_hover+'" class="bookSheetIdLink info_buttonMo" id="hoverInfo_'+result[i]['product_id']+'_target" title="Accéder à la fiche détaillée de ce livre"></a>\n\
                                </div>\n\
                            </div>\n\
                            <div id="advertiseDrag_'+result[i]['product_id']+'" class="advertiseDrag" style="display:none;">Déplacez-moi au centre de la table pour renouveller la recommandation !</div>';
    }
    
    $(path).html(hover_containers);
}

function createNoPivotResult(pProduct) {
    var noPivotContent = '<div id="target_'+pProduct['product_id']+'_'+pProduct['product_id']+'" class="hover_content hover_content_noPivot" style="display : none; cursor:default;">\n\
                            <div class="hover_description_noPivot"><div class="header_description_noPivot"><img src="images/icons/ampoule.png"><div class="title_description_noPivot">La recommandation sanspapier.com</div></div><div class="body_description_noPivot">Déplacez les livres au centre de la table pour découvrir leur univers et visualiser la recommandation proposée !</div></div>\n\
                        </div>\n\
                        <div id="advertiseDrag_'+pProduct['product_id']+'" class="advertiseDrag" style="display:none;">Déplacez-moi au centre de la table pour renouveller la recommandation !</div>';
    return noPivotContent;
}


// BIBLIO SHEETS

function createBiblioResults(parent, result, length, country, defaultCountry){
    var sp = window.sanspapier.config;

    var path = $('#'+parent+" .grid_3");
    var biblio_containers = "";
    
    if(length== "" || length>result.length)
        length = result.length;

    for(var j=0; j<length; j++) {
                
        var description = result[j]['description'];
        var regex = /(<([^>]+)>)/ig;
        description = description.replace(regex,"");

        var firstname = '';
        if(result[j]['author_firstname']!==undefined)
            firstname = result[j]['author_firstname'][0]+' ';
        
        if(result[j]['author_searchable']!==undefined)
            var author_searchable = result[j]['author_searchable'][0];
        
        if(result[j]['author_id']!==undefined)
            var author_id = result[j]['author_id'][0];

        var formats = "";
        for(var k=0; k<result[j]['format_name'].length; k++)
        {
            if(k==result[j]['format_name'].length-1)
                formats+=result[j]['format_name'][k].split('_')[1];
            else
                formats+=result[j]['format_name'][k].split('_')[1]+", ";
        }
        
        var price = checkPriceForCountry(result[j], country, defaultCountry, true);

        var encoded_value_biblio = "#!booksheet_"+fixedEncodeURIComponent(result[j]['product_id']);

        var contentInfos = "";  

        contentInfos += "<dl><dt>Format(s) :</dt><dd>"+formats+"</dd>";

        var publishingDate = "N.C.";

        if(result[j]['publishing_date'] !== undefined)
        {
            publishingDate = parseEEEdate(result[j]['publishing_date']);
        }
        contentInfos += "<dt>Date de publication :</dt><dd>"+publishingDate+"</dd>";

        var isbn = "";
        if(result[j]['isbn'] != "" && result[j]['isbn'] != 0)
            isbn = result[j]['isbn'];
        else
            isbn = "N.C.";
        contentInfos += "<dt>EAN :</dt><dd>"+isbn+"</dd>";

        var pagesNb = "";
        if(result[j]['nb_pages'] != '' && result[j]['nb_pages'] > 10)
            pagesNb = result[j]['nb_pages'];
        else 
            pagesNb = "N.C."; 
        contentInfos += "<dt>Nombre de pages :</dt><dd>"+pagesNb+"</dd>";

        var fileSize = "";
        if(result[j]['file_size'] != 0 && result[j]['file_size'] != '')
            fileSize = String(parseInt(result[j]['file_size'])/1024).substr(0, 4) + " Mo";
        else
            fileSize = "N.C.";
        contentInfos += "<dt>Taille du fichier :</dt><dd>"+fileSize+"</dd></dl>";

        biblio_containers += ('<div id="biblio_'+result[j]['product_id']+'" class="biblio_sheet">\n\
                                        <a href="'+encoded_value_biblio+'" class="bookSheetIdLink biblio_image" id="linkPic_'+result[j]['product_id']+'" title="Accéder à la fiche détaillée de ce livre"><img tooltip="'+result[j]['product_id']+'" src="'+sp.images_url+result[j]['publisher_id']+'/'+result[j]['product_id']+'/'+result[j]['product_id']+'_fc_Bbis.jpg" /></a>\n\
                                        <div class="biblio_titre_auteur">\n\
                                            <a href="'+encoded_value_biblio+'" class="biblio_titre bookSheetIdLink" id="linkTitleBiblio_'+result[j]['product_id']+'" tooltip="'+result[j]['product_id']+'" title="Accéder à la fiche détaillée de ce livre">'+result[j]['title']+'</a>\n\
                                            <div class="biblio_auteur authorName"  author_id="'+author_id+'" author_searchable="'+author_searchable+'" title="Lancer une nouvelle recherche autour de cet auteur">'+firstname+" "+result[j]['author_lastname'][0]+'</div>\n\
                                            <div class="biblio_editeur">'+result[j]['publisher_name']+'</div>\n\
                                        </div>\n\
                                        <div class="biblio_text">'+description+'</div>\n\
                                        <div class="biblio_infos">'+contentInfos+'</div>\n\
                                        <div class="biblio_info_content">\n\
                                            <div class="infos_achatMo">\n\
                                                <div class="prixMo">'+price['data']+" \u20ac"+'</div>\n\
                                            <!--<div class="formatsMo">'+formats+'</div>-->\n\
                                            </div>\n\
                                            <a href="#chooseFormatFor_'+result[j]['product_id']+'" class="buy_buttonMo addToCart" id="buyMos_'+result[j]['product_id']+'" ></a>\n\
                                            <a href="'+encoded_value_biblio+'" class="bookSheetIdLink info_buttonMo" id="link_'+result[j]['product_id']+'" title="Accéder à la fiche détaillée de ce livre"></a>\n\
                                        </div>\n\
                                    </div>');
    }
    
    $(path).html(biblio_containers);
}


function parseJsonForGetFormatsResult(data){
    
    var sp = window.sanspapier.config;
    var document = data['document'];
    var i = 0;
    var parent = "#choose_format_display";
    
    $(parent+" #choose_format_image").html('<img src="'+sp.images_url+document['publisher_id']+'/'+document['product_id']+'/'+document['product_id']+'_fc_B.jpg"/>');
    var formatsHtml = "";
    
    var price = checkPriceForCountry(document, data['country'], data['defaultCountry'], false);
    switch(price['type'])
    {
        case 'normalPrice':
            if(document['is_package'] == false){
                var formatTexte = document['format_name'][0].split('_')[0];
                //Main product
                formatsHtml += '<div class="choose_format_oneFormat">'+document['format_name'][0].split('_')[1].split('(')[0]+'<a href="http://www.sanspapier.com/books/600/'+document['product_id']+'/'+document['product_id']+'.'+formatTexte.toLowerCase()+'" target="_blank" class="choose_format_button" id="buyChooseFormat_'+document['product_id']+'"></a>'+'</div>';
                //Related product(s)
                if(document['related_products'])
                {
                    for(i=1; i <= document['related_products'].length; i++){
                        formatTexte = document['format_name'][i].split('_')[0];
                        formatsHtml += '<div class="choose_format_oneFormat">'+document['format_name'][i].split('_')[1].split('(')[0]+'<a href="http://www.sanspapier.com/books/600/'+document['related_products'][i-1]+'/'+document['related_products'][i-1]+'.'+formatTexte.toLowerCase()+'" target="_blank" class="choose_format_button" id="buyChooseFormat_'+document['related_products'][i-1]+'"></a>'+'</div>';
                    }
                }
            }
            else{
                formatsHtml += '<div class="choose_format_multipleFormat">Multi-Formats incluant';

                for(i=0; i<document['format_name'].length; i++){
                    if(i == document['format_name'].length-1)
                        formatsHtml += " "+document['format_name'][i].split('_')[1].split('(')[0]+"<br/></div>";
                    else
                        formatsHtml += " "+document['format_name'][i].split('_')[1].split('(')[0]+",";
                }

                formatsHtml += '<a href="#addedtocart_'+document['product_id']+'" class="choose_format_button" id="buyChooseFormat_'+document['product_id']+'"></a>';
            }
            break;
        case 'defaultPrice':
            formatsHtml = "<div style='font-size:14px;color:#FF0000;font-weight:bold;width:90%;text-align:center;padding:15px;padding-top:40px;line-height:20px;'>Nous sommes désolés, ce livre n'est pas disponible à l'achat depuis votre pays.</div>";
            break;
        case 'noPrice':
            formatsHtml = "<div style='font-size:14px;color:#FF0000;font-weight:bold;width:90%;text-align:center;padding:15px;padding-top:40px;line-height:20px;'>Nous sommes désolés, ce livre n'est pas disponible à l'achat depuis votre pays.</div>";
            break;
        default:
            formatsHtml = "<div style='font-size:14px;color:#FF0000;font-weight:bold;width:90%;text-align:center;padding:15px;padding-top:40px;line-height:20px;'>Nous sommes désolés, ce livre n'est pas disponible à l'achat depuis votre pays.</div>";
            break;
    }
    $(parent).css('cursor:default');
    $(parent+" #choose_format_formats").html(formatsHtml);
}
