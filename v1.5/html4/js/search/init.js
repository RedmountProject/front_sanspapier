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
    
    'cible' : {
        'paper': null,
        'number_of_books': 16,
        'width': 960,
        'height' : 600,
        'centerX' : 480,
        'centerY' : 350,
        'ellipse_ratio' : 0.35,
        'main_ellipse_coef' : 470,
        'ellipse_fill' : '250 - #F9F8F0:0-#D9D8D0:100',
        'ellipse_stroke' : '#444',
        'backgroundcolor': 'transparent',
        'book_height': 115,
        'book_width' : 76,
        'book_zoomed_ratio' : 1.8 ,
        'book_fill' : '#444444',
        'book_stroke' : '#ECECEC',
        'book_margin' : 0,
        'white' : '#FFFFFF',
        'bookElements' : [],
        'imageElements': [],
        'loading_text' : 'Chargement des résultats ...',
        'set': null,
        'ellipseRef': null,
        'scapeRef': null,
        'mouse_sensibility': 0.005,
        'loaded' : false,
        'groups' : [],
        'turnable' : false,
        'cos' : [],
        'sin' : [],
        'pagination': null
    
    },
    
    'categories': {
        'alaune_selection_name' : [],
        'lastCatDisplayed' : null
    },
    
    'booksheet': {
        'nb_sameAuthor' : 0,
        'nb_otherEditors' : 0,
        'fullText': "",
        'textLength':1000
    },
    
    'defFormats': {
        'scrollTopDetect':65,
        'spaceHeight':210,
        'booksheetIMG':'A'
    },
    
    'filters': {
        'price':1000,
        'epub':1,
        'pdf':1,
        'mobile':1,
        'drm':1
    },
    
    'top': 0,
    'logged': false,
    'cartCount': 0,
    
    'firstResearch':true,
    'distanceTop': 0,
    
    'tutorial_OnOff': "false",
    
    'search_value': "",
    'last_search_value': ""
}

obcat(window.sanspapier, init_obj);

function init_after() {    
    resFormats();
    var header_filters = new filter_tooltip();
    
    AjaxController.is_logged();
    AjaxController.initAndGetFilters(header_filters);
    
    mytutorial.bindActivator();
    mytutorial.declareDomTutorialsElements();
    
    fixScrollBar("#scroll_fixed");  
    userForm();
    spread();
    
    $("#middle_search").example("Nom d'auteur, titre d'\u0153uvre, thème...");
    //GET SEARCH QUERY RESULT
    $("form:#middle_search_action").submit(function() {
        
        $('#space').css({
            'height':window.sanspapier.defFormats.spaceHeight
        });
        fixScrollBar("#scroll_fixed");
        $('#space').css({
            'height':'0'
        });
        var search_value = $("input:#middle_search").val();
        var type_and_id = $("input:#middle_search_hidden").val();
        $("input:#middle_search_hidden").val('');
        
        if(type_and_id === ""){
            type_and_id = 2;
        }
        
        window.sanspapier.last_search_value = search_value;
        window.sanspapier.last_search_type = type_and_id;

        
        var encoded_value = "#!search_"+fixedEncodeURIComponent(search_value)+"_"+type_and_id;
        window.location = encoded_value;
    
    });
    
    
    
    context();
    booksheet_tooltip();
    cart_tooltip();
    validateAddToCartQtip();
    refreshCart();
    gradienter('#grad', '.container_fiche', 12);
    
    updatePage(false);
    $.address.change(function(){
        updatePage(true);
    })
    
    if(isIE8OrLess())
    {
        var msg = "Bonjour, \n\nSanspapier.com n\'est pas encore optimisé pour la version d\'Internet Explorer que vous utilisez, vous risquez de rencontrer des problèmes de navigation. \nSi possible, utilisez Chrome, Firefox ou Internet Explorer 9. \n\nNous mettons tout en \u0153uvre pour corriger au plus vite ce dysfonctionnement.";
        alert(msg);
    }
}




var abortedSearch = function(type, bookInfos) {
    
    $("#middle_search_bar_container").hide();
    $("#cible").hide();
    var content = "";
    switch(type)
    {
        //No result at all
        case 0:
            content = "<div style='width: 550px; color: #666; font-size: 24px;'>Votre recherche :</div><div style='width: 550px; overflow-wrap: break-world;' id='value'>"+window.sanspapier.last_search_value.replace(/[^a-z0-9',-."éèêëâäàáïîôöùüûœøçłś /()]+/gi,'')+"</div><div style='width: 550px; color: #666; font-size: 24px;'>ne donne aucun résultat.</div>";
            break;
        //Booksheet without other result
        case 1:
            content = "<div style='width: 550px; color: #666; font-size: 24px;'>Votre requête</div><div style='width: 550px; overflow-wrap: break-world;' id='value'>"+window.sanspapier.last_search_value.replace(/[^a-z0-9',-."éèêëâäàáïîôöùüûœøçłś /()]+/gi,'')+"</div><div style='width: 550px; color: #666; font-size: 24px;'>ne donne actuellement aucun résultat dans la recherche sémantique.</div>";
            break;
        //Bibliographie without other result
        case 2:
            var author = '';
            if(bookInfos['author_firstname'] !== undefined)
                author += bookInfos['author_firstname'][0]+' ';
            
            author += bookInfos['author_lastname'][0];
            
            content = "<div style='width: 550px; color: #666; font-size: 24px;'>Les livres de</div><div style='width: 550px; overflow-wrap: break-world;' id='value'>"+author+"</div><div style='width: 550px; color: #666; font-size: 24px;'>ne sont pas encore disponibles dans la recherche sémantique.</div>";
            break;
        //Empty search value
        case 3:
            content = "<div style='width: 550px; color: #666; font-size: 24px;'>Une erreur est survenue pendant votre recherche,</div><div style='width: 550px; color: #666; font-size: 24px;'>merci de renouveler votre saisie.</div>";
            break;
        //Ajax error
        case 99:
            content = "<div style='width: 550px; color: #666; font-size: 24px;'>Une erreur est survenue pendant votre recherche,</div><div style='width: 550px; color: #666; font-size: 24px;'>merci de renouveler votre saisie.</div>";
            break;
        default:
            break;
    }   
    $('#noresult').html(content);
    $("#abortedSearch").show();
    
    mytutorial.check_dom_state();
}


function updatePage(hasUrlChanged)
{
    var split_value = window.location.hash.split('_');
    var value = decodeURIComponent(split_value[1]);
    var type = parseInt(decodeURIComponent(split_value[2]));   
    if(type < 2){
        var type_id = decodeURIComponent(split_value[3]);
        var searchable = parseInt(decodeURIComponent(split_value[4]));
        type +='_'+type_id+'_'+searchable;
    }
    
    window.sanspapier.search_value = value;
    
    if(window.sanspapier.categories.lastCatDisplayed == null)
        window.sanspapier.categories.lastCatDisplayed = 0;
    
    switch(split_value[0]){
        case "#!search":
            window.sanspapier.last_search_value = value;
            window.sanspapier.last_search_type = type;

            $('#search').SuggestSearch();
            $(document.body).qtip('hide');
            
            var text = '"'+value+'"';
            
            if(window.sanspapier.firstResearch == true){
                
                $('#space').css({
                    'height':window.sanspapier.defFormats.spaceHeight
                });
                fixScrollBar("#scroll_fixed");
                $('#space').css({
                    'height':'0'
                });
                
                
                $("#value").html(text);
                
                $("#slogan").animate({
                    'opacity':0
                },500, function(){
                    $("#slogan").hide(0);
                    $("#search_bar_top").show();
                    $("#search_bar_top").animate({
                        'opacity':'1'
                    },500);
                });
                
                $("#middle_search_bar_container").animate({
                    'opacity':0
                },0, function(){
                    $("#middle_search_bar_container").hide();
                    $("#cible").animate({
                        'opacity':'1'
                    },0);
                
                });
                AjaxController.logAction('SearchHome_'+value);
                AjaxController.search(value,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm, type);
            } else{
                AjaxController.logAction('SearchCible_'+value);
                AjaxController.search(value,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm, type);
            }
            if(!hasUrlChanged)
                AjaxController.columns(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
        
        case "#!booksheet":
            if($('#search').is(":visible")){
                $('#search').SuggestSearch();
            } else {
                $("#middle_search").SuggestSearch();
            }
            $(document.body).qtip('show');
            $(document.body).qtip('option', 'z-index', 30000);
            AjaxController.bookSheet(value);
            if(!hasUrlChanged)
                AjaxController.columns(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
        
        case "#!main":
            $(document.body).qtip('hide');
            $(document).attr('title', 'Sanspapier.com - Librairie numérique & Moteur de recommandation');
            if(!hasUrlChanged)
            {
                $("#middle_search").SuggestSearch();
                AjaxController.columns(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            }
            else
            {
                callContent(window.sanspapier.categories.lastCatDisplayed);
                hideNonSearchableBookInfos();
                hideColumn(4);
                mytutorial.release();
                $("#search_bar_top").animate({
                    'opacity':0
                },150, function(){
                    $("#search_bar_top").hide(0);
                    $("#slogan").show();
                    $("#slogan").animate({
                        'opacity':'1'
                    },150);
                });
                
                $("#cible").animate({
                    'opacity':0
                },100, function(){
                    $("#abortedSearch").hide();
                    $("#cible").hide(0);
                    $("#middle_search_bar_container").show();
                    $("#middle_search").autocomplete( "close" );
                    $("#middle_search_bar_container").animate({
                        'opacity':'1'
                    },100, function(){
                        if(window.sanspapier.firstResearch==false)
                            fixScrollBarSecond("#scroll_fixed");
                        
                        window.sanspapier.firstResearch = true;
                    });
                });
                $('html,body').animate({
                    scrollTop: 0
                },200);
            }
            
            break;
        case "#addedtocart":case "#removedfromcart":case "#chooseFormatFor":
            if($('input:#search').is(":visible")){
                $('input:#search').SuggestSearch();
            } else {
                $("input:#middle_search").SuggestSearch();
            }
            $(document.body).qtip('hide');
            if(!hasUrlChanged)
                AjaxController.columns(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
    }
//mytutorial.check_dom_state();
}

function resFormats()
{
    //Defines search zone height depending the client's windows height    
    if($(window).height() < 720)
    {
        $("#middle_search_bar_container").height(325);
        $("#subFilterContainer").height(165);
        $("#cible").css('margin-top', '5px');
        window.sanspapier.defFormats.scrollTopDetect = 25;
        window.sanspapier.defFormats.spaceHeight = 255;
        window.sanspapier.defFormats.booksheetIMG = 'Bbis';
        window.sanspapier.booksheet.textLength = 400;
        $('.container_fiche').css({
            'height':'470px',
            'width':'842px'
        });
        $('#ui-tooltip-1').css({
            'height':'470px',
            'width':'842px'
        });
        $('.image').css({
            'height':'360px',
            'width':'237px'
        });
        $('.text').css({
            'height':'240px'
        });
        $('#grad').css({
            'height':'240px'
        });
        $('.infos_achat').css({
            'width':'802px',
            'margin-top':'5px'
        });
        $('.sliders').css({
            'width':'802px',
            'margin-top':'0px'
        });
        $('.auteur_slider').css({
            'width':'395px',
            'height':'150px'
        });
        $('.editions_slider').css({
            'width':'395px',
            'height':'150px'
        });
        $('.format_slider').css({
            'width':'395px',
            'height':'150px'
        });
    }
}


jQuery.fn.SuggestSearch = function(){
    var that =  $(this).parent().find("#autocomplete-attach");
    this.autocomplete({ 
        minLength: 2,
        appendTo: that,
        source: 
        function(request, response) {           
        
        jQuery.ajax({
            url: window.sanspapier.config.solr_url,            
            dataType: 'jsonp',
            
            crossDomain: true,
            data: {
            'q': request.term,
            'group': 'true',
            'group.field': 'title'
            },
            
            
            jsonp: 'json.wrf',
            jsoncallback: '?',
            
            success: CallBack = function(data){
                
            
            var jsonData = $.parseJSON(JSON.stringify(data));
            
            var i = 0;
            var j = 0;
            var titles = new Array();
            var authors = new Array();
            var author_id;
            var author_statut;
            docs = jsonData.grouped.title.groups;
            
            jQuery.map(jsonData.highlighting, function( item, key) {
                
                if( item.title ){
                
                if(i === 0){
                titles.push({
                    'label' : "Titres suggérés",
                    'value' : 0
                    });
                i++;
                }
                var author_name = getAuthorFullName(key, jsonData) == '' ? '' : ' ('+getAuthorFullName(key, jsonData)+')' ;
                titles.push({
                    'label': item.title.toString()+author_name, 
                    'value': item.title.toString(),
                    'desc' : '0_'+key+'_'+getTitleSearchablestatut(key, jsonData)
                    });
                
                }
                
                if( item.author_lastname && !item.author_fullname){
                author_id = getAuthorIdFromLastName(item.author_lastname.toString(), jsonData);
                author_statut = getAuthorSearchablestatut(author_id, jsonData);
                var author_firstname = getAuthorFirstname(key, jsonData);
                if(!containsAuthor({
                    'label': author_firstname+' '+item.author_lastname.toString(), 
                    'value': author_firstname+' '+item.author_lastname.toString(),
                    'desc' : '1_'+author_id+'_'+author_statut
                    }, authors)){

                if(j === 0){
                authors.push( {
                    'label' : "Auteurs suggérés",
                    'value' : '1'
                    });
                j++;
                }

                authors.push({
                    'label': author_firstname+' '+item.author_lastname.toString(), 
                    'value': author_firstname+' '+item.author_lastname.toString(),
                    'desc' : '1_'+author_id+'_'+author_statut
                    })
                }
                } else if(item.author_fullname){
                author_id = getAuthorIdFromFullName(item.author_fullname.toString(), jsonData);
                author_statut = getAuthorSearchablestatut(author_id, jsonData);
                if(!containsAuthor({
                    'label': item.author_fullname.toString(), 
                    'value': item.author_fullname.toString(),
                    'desc' : '1_'+author_id+'_'+author_statut
                    }, authors)){

                if(j === 0){
                authors.push( {
                    'label' : "Auteurs suggérés",
                    'value' : 1
                    });
                j++;
                }

                authors.push({
                    'label': item.author_fullname.toString(), 
                    'value': item.author_fullname.toString(),
                    'desc' : '1_'+author_id+'_'+author_statut
                    })
                }
                }
                
                });
            
            returnedData = authors.concat(titles);       
            
            returnedData.push({
                'label': request.term,
                'value': request.term,
                'desc' : 2
                });
            
            response(returnedData);
            },
            
            error: function () {
            }                
            });
        
        
        },   
        
        open: function(){
            if($(this).parents('form:first').attr('id') === 'search_action')
            {
                $(this).autocomplete('widget').css('z-index', 10500);
                $('#sp').css('z-index', 700);
                $('#scroll_fixed').css('z-index', 699);
            }
            else
            {
                $(this).autocomplete('widget').css('z-index', 9000);
                $('#scroll_fixed').css('z-index', 8500);
            }
        },
        
        close: function(){
            $('#scroll_fixed').css('z-index', 10000);
            $('#sp').css('z-index', 9500);
        },
        
        select: function(event, ui){
            $(this).val(ui.item.value);

            var type = 2;
            if(ui.item.desc){
            type = ui.item.desc;
            $('#scroll_fixed').css('z-index', 10000);
        }
            
        var type_id_searchable = type;
        
        $('input:#'+this.getAttribute('id')+'_hidden').val(type_id_searchable);
        $('form:#'+this.getAttribute('id')+'_action').submit();

        },     
        messages: {
        noResults: null,
        results: function() {}
        }
        }).data("ui-autocomplete")._renderMenu = function( ul, items ) {
            
        jQuery.each( items, function( index, item ) {
            if(item.value === 0 ||  1 === item.value){
                ul.append("<li class='ui-autocomplete-category' >" + item.label + "</li>" );
            } else if(item.desc && item.desc === 2){
                ul.append("<li class='ui-autocomplete-category'>Recherche libre sur : <span id='freeSearch'>" + item.label + "</span></li>" );
                $("#freeSearch").click(function(){
                    $(this).parents('form:first').submit();
                });
            } else {
                return jQuery.ui.autocomplete.prototype._renderItemData(ul,item);
            }
        });
    };
};

function getTitleSearchablestatut(id){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        if(id == doc[0].product_id){
            return (doc[0].searchable.toString() == 'true') ? 1 : 0;
        
        }
    }
    return 0;    
}

function getAuthorSearchablestatut(id){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        author_ids = doc[0].author_id;
        for( author_id in author_ids){
            if( id == author_ids[author_id]){
                return (doc[0].author_searchable[author_id].toString() == 'true') ? 1 : 0;
            }
        }
    }
    return 0;    
}


function getAuthorFirstname(id){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        if(id == doc[0].product_id){            
            return doc[0].author_firstname[0].toString();
        
        }
    }
    return "";
}

function getAuthorFullName(id){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        if(id == doc[0].product_id){
            return doc[0].author_fullname.toString();
        }
    }
    return "";
}

function getAuthorIdFromLastName(lastname){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        lastnames = doc[0].author_lastname;
        for( name in lastnames){
            if(lastname == lastnames[name]){
                return doc[0].author_id[name].toString();
            }
        }
    }
    return "";
}

function getAuthorIdFromFullName(fullname){
    for( i = 0; i < docs.length; i++){
        doc = docs[i].doclist.docs;
        fullnames = doc[0].author_fullname;
        for( name in fullnames){
            if(fullname == fullnames[name]){
                return doc[0].author_id[name].toString();
            }
        }
    }
    return "";
}

function getInternetExplorerVersion() {
    
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function isIE8OrLess() {
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver < 9.0)
            return true;
    }
    return false;
}

function containsAuthor(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i]['label'] === obj['label']) {
            return true;
        }
    }
    return false;
}

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    },
    {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    },
    {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    },
    {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    },
    {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    },
    {		// for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    },
    {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    },
    {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    },
    { 		// for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }
    ],
    dataOS : [
    {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    },
    {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    },
    {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    },
    {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }
    ]

}
BrowserDetect.init();