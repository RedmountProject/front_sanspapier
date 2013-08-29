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
var AjaxController = (function() {  
    
    var data_url = window.sanspapier.config.data_url;
    
    var controller = {
        
        
        //RETRURN RESULTS FROM RESEARCH (RESULT + BIBLIO)
        "search": function(pSearch_value,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm, type) {

            if(pSearch_value === null || pSearch_value === ""){
                console.log("ERROR in search::ajax::search");
                hideColumn(4);
                callContent(window.sanspapier.categories.lastCatDisplayed);
                        
                abortedSearch(3, '');
                mytutorial.bind_tuto_recherche();
                mytutorial.check_dom_state();
                throw "Malform search value";
            }
            $("#abortedSearch").hide();
            $("#cible").hide();
            $("#empty").show();
            window.sanspapier.search_value = pSearch_value;
            window.sanspapier.search_type = type;

            
            var search_url = data_url+'books/search.json/'+fixedEncodeURIComponent(pSearch_value)+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm+'|'+type;
            
            $.ajax({
                url: search_url,
                dataType: 'json',

                complete: function() {
                    $("#search").attr({
                        value : pSearch_value
                    });
                    
                    if(canvasDetection()) {
                        window.sanspapier.myeasel.result_callback();  
                    } else {
                        result_callback();//// show again rafael books 
                    }
                     
                    
                    $("#search").blur();
                    
                    author_search("#search_result");
                    zindexTargetBooks();
                    update_bookSheet_targets();
                    update_addToCart_targets('#cible');
                    
                    window.sanspapier.firstResearch = false;
                },
                
                success: function(data) {
                    $("#empty").hide();
                    $('html,body').animate({
                        scrollTop: 0
                    },300);
                    if(data != -1) {
                        $(document).attr('title', 'Résultats de votre recherche "'+pSearch_value+'" - Sanspapier.com');
                        $("#cible").show();
                        switch(data[2]) {
                            case "booksheet":
                                callContent(window.sanspapier.categories.lastCatDisplayed);
                                hideColumn(4);
                                abortedSearch(1, '');
                                displayNonSearchableBookInfos(data[2],data[0][0]);
                                break;
                            case "booksheet_target":
                                createTargetResults('search_result', data[1], data[3], data[4]);
                                gradienter('.hover_description', '.hover_content', 12);
                                displayNonSearchableBookInfos(data[2],data[0][0]);
                                callContent(window.sanspapier.categories.lastCatDisplayed);
                                hideColumn(4);
                                break;
                            case "target":
                                createTargetResults('search_result', data[0], data[1], data[3], data[4]);
                                gradienter('.hover_description', '.hover_content', 12);
                                callContent(window.sanspapier.categories.lastCatDisplayed);
                                hideColumn(4);
                                hideNonSearchableBookInfos();
                                break;
                            default:
                                
                                hideNonSearchableBookInfos();
                                if(data[2] != "Bibliographie_alone")
                                {
                                    
                                    createTargetResults('search_result', data[0], data[1], data[3], data[4]);
                                    gradienter('.hover_description', '.hover_content', 12);
                                }
                                else if(data[2] == "Bibliographie_alone")
                                {
                                    data[2] = "Bibliographie";
                                    abortedSearch(2, data[1][0]);
                                }
                                
                                $("#call_4").html('<p>'+data[2]+'</p>');
                                $("#call_4").css({
                                    'opacity':1,
                                    'display':'block'
                                });

                                createBiblioResults('lib_4', data[1], 16, data[1], data[3], data[4]);
                                
                                var title = "";
                                if(data[2] == 'Bibliographie' || data[2] == 'Genre' || data[2] == 'Editeur') {
                                    if(data[1][0]['column_name'] !== undefined){
                                        title = data[1][0]['column_name'];
                                    }
                                }
                                
                                changeCat(title, data[2]);
                                callContent(4);
                                author_search("#lib_4");
                                update_addToCart_targets('#lib_4');
                                
                                break;
                        }
                    }
                    else {
                        hideColumn(4);
                        callContent(window.sanspapier.categories.lastCatDisplayed);
                        
                        abortedSearch(0, '');
                    }
                    mytutorial.bind_tuto_recherche();
                    mytutorial.check_dom_state();
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::search");
                    hideColumn(4);
                    callContent(window.sanspapier.categories.lastCatDisplayed);
                        
                    abortedSearch(99, '');
                    mytutorial.bind_tuto_recherche();
                    mytutorial.check_dom_state();
                }
                        
            });
        },
        
        //RETURN AND DISPLAY DATA FOR BOOK SHEET
        "bookSheet": function(book_id) {
            var sheet_url = data_url+"books/sheet_"+book_id+".json";
            $.ajax({
                url: sheet_url,
                dataType: 'json',

                complete: function() {
                                                            
                    $(document.body).qtip('option', 'content.text', $('#booksheet').clone());
                    new spSlider('editions_slider',500,100,window.sanspapier.booksheet.nb_otherEditors);
                    new spSlider('auteur_slider',500,100,window.sanspapier.booksheet.nb_sameAuthor);
                    update_booksheet_sliders();
                    init_format(book_id);
                    update_formats(book_id);
                    update_chooseFormat_targets("#booksheet");
                    update_booksheet_close_target();
                    
                    $('.moreText').click(function() {
                        moreText();
                    });
                    
                    author_search("#booksheet");
                    $('.windows_hover').qtip('hide');
                    $('#cart').qtip('hide');
                },
                
                success: function(data) {
                    $(document).attr('title', 'Ebook "'+data['result'][0]['title']+'" - Sanspapier.com');
                    window.sanspapier.booksheet.nb_sameAuthor = data['sameAuthor'].length;
                    window.sanspapier.booksheet.nb_otherEditors = data['otherEditors'].length;
                    parseJsonForBookSheet(data, 'booksheet');
                    
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::bookSheet");
                }
            });
        },
        
        "bypassCustomALaUneCalling": function(filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var bypassCustomALaUneCalling_url = data_url+'profile/filters/bypassCustomALaUneCalling.json/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: bypassCustomALaUneCalling_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(callSolr) {
                    if(callSolr)
                        AjaxController.columns(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::bypassCustomALaUneCalling");
                }
            })
        },

        
        //RETURN AND DISPLAY DATA FOR CATEGORIES 
        "columns": function(number_of_columns,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var spUneCatName = window.sanspapier.categories.alaune_selection_name;
            var columns_url = data_url+'books/columns.json/'+number_of_columns+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: columns_url,
                dataType: 'json',
                complete: function() {
                    update_addToCart_targets('#lib_0');
                    
                    $("#lib_0").animate({
                        'margin-left' : "0px"
                    },100);
                    $("#title_0").animate({
                        'margin-left' : "0px"
                    },100);
                    
                    for(var i=1;i<=number_of_columns;i++) {
                        $("#lib_0 .column"+i).animate({
                            'width' : '172px'
                        },100);
                            
                        $("#title_0 .column"+i).animate({
                            'width' : '172px'
                        },100);
                    }
                    
                    author_search("#lib_0");
                    update_bookSheet_targets();
                    
                    mytutorial.bind_tuto_recherche();
                },
            
                success: function(data) {
                    if(data['status'] == true) {
                        var selection_name = '';
                        var eltTitleHidden = null;
                        var eltTitleLi = null;
                        var eltTitleSpan = null;
                        for(var i=0; i<number_of_columns; i++) {
                            spUneCatName.splice(i,1,data['data'][i][0]);
                            selection_name = data['data'][i][0];
                            eltTitleLi = $('#title_0 .column'+(i+1));
                            eltTitleSpan = $('#title_0 .column'+(i+1)+' span');
                            eltTitleHidden = $('#titleCol'+(i+1)+'Hidden');
                            eltTitleHidden.html(selection_name+'');
                            if(eltTitleHidden.width() > 172) {
                                eltTitleLi.css({'line-height':'16px'});
                            }
                            eltTitleSpan.html(selection_name+'');
                            if(data['data'][i][1] != "") {
                                parseJsonForCategories(data['data'][i][1], i+1, data['country'], data['defaultCountry']);
                            }
                            else
                                $('#lib_0 .column'+(i+1)).html('<div style="text-align: center;margin-top:10px;">Aucun résultat</div>');
                        }
                    }
                    else if(data['status'] == false) {
                        for(i=0; i<number_of_columns; i++) {
                            $('#lib_0 .column'+(i+1)).html("");
                        }
                    }
                },
            
                error: function() {
                    console.log("ERROR in search::ajax::columns");
                }
            });
        },

        "customDisplay": function() {
            var customDisplay_url = data_url+'books/customDisplay.json';
            
            $.ajax({
                url: customDisplay_url,
                dataType: "json",
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    if(data['publishers'] !=0) {
                        $("#call_1").css({
                            'display':'block'
                        })
                    }
                    if(data['genres'] !=0) {
                        $("#call_2").css({
                            'display':'block'
                        })
                    }
                    if(data['searches'] !=0 ) {
                        $("#call_3").css({
                            'display':'block'
                        })
                    }
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::customDisplay")
                }
            })
        },
        
        "bypassCustomPublishersCalling": function(filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var bypassCustomPublishersCalling_url = data_url+'profile/filters/bypassCustomPublishersCalling.json/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: bypassCustomPublishersCalling_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    if(data==true)
                        AjaxController.customPublishers(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::bypassCustomPublishersCalling")
                }
            })
        },
        
        "customPublishers": function(number_of_columns,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var customEd_url = data_url+'books/customEd.json/'+number_of_columns+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: customEd_url,
                dataType: "json",
                
                complete: function() {
                    update_addToCart_targets('#lib_1');
                    
                    $("#lib_1").css({
                        'margin-left' : "0px"
                    });
                    $("#title_1").css({
                        'margin-left' : "0px"
                    });
                    
                    author_search("#lib_1");
                    
                    for(var i=1;i<=number_of_columns;i++) {
                        $(".column"+i).each(function() {
                            $(this).animate({
                                'width' : '172px'
                            },0);
                        })
                    }
                    
                    update_bookSheet_targets();
                },
                
                success: function(data) {  
                    if(data['publishers']) {
                        for(var i=0; i<data['publishers'].length; i++) {
                            var publishers = data['publishers'][i];
                            if(publishers != "") {
                                var publishers_names = publishers[0];
                                $('#title_1 .column'+(i+1)+' span').html(publishers_names+'');
                                parseJsonForPrefCategories(publishers[1], i+1, 1, 16, data['country'], data['defaultCountry']);
                            }
                            else
                                $('#lib_1 .column'+(i+1)).html('<div style="text-align: center;margin-top:10px;">Aucun résultat</div>');
                        }
                    }   
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::customPublishers");
                }
            })
        },
        
        "bypassCustomGenresCalling": function(filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var bypassCustomGenresCalling_url = data_url+'profile/filters/bypassCustomGenresCalling.json/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: bypassCustomGenresCalling_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    if(data==true)
                        AjaxController.customGenres(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::bypassCustomGenresCalling");
                }
            })
        },

        
        "customGenres": function(number_of_columns,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var customGenres_url = data_url+'books/customGenres.json/'+number_of_columns+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: customGenres_url,
                dataType: "json",
                
                complete: function() {
                    update_addToCart_targets('#lib_2');
                    
                    $("#lib_2").css({
                        'margin-left' : "0px"
                    });
                    $("#title_2").css({
                        'margin-left' : "0px"
                    });
                    
                    author_search("#lib_2");
                    
                    for(var i=1;i<=number_of_columns;i++) {
                        $(".column"+i).each(function() {
                            $(this).animate({
                                'width' : '172px'
                            },0);
                        })
                    }
                    update_bookSheet_targets();
                },
                
                success: function(data) {
                    
                    if(data['genres']) {
                        for(var i=0; i<data['genres'].length; i++) {
                            var genres = data['genres'][i];
                        
                            if(genres!="") {
                                var genres_names = genres[0];
                                $('#title_2 .column'+(i+1)+' span').html(genres_names+'');
                            
                                parseJsonForPrefCategories(genres[1], i+1, 2, 16, data['country'], data['defaultCountry']);
                            }
                            else
                                $('#lib_2 .column'+(i+1)).html('<div style="text-align: center;margin-top:10px;">Aucun résultat</div>');
                        }
                    }                   
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::customGenres");
                }
            })
        },
        
        "bypassCustomKeywordsCalling": function(filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var bypassCustomKeywordsCalling_url = data_url+'profile/filters/bypassCustomKeywordsCalling.json/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: bypassCustomKeywordsCalling_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    if(data==true)
                        AjaxController.customKeywords(5,window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::bypassCustomKeywordsCalling");
                }
            })
        },
        
        "customKeywords": function(number_of_columns,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var customKeywords_url = data_url+'books/customKeywords.json/'+number_of_columns+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: customKeywords_url,
                dataType: "json",
                
                complete: function() {
                    
                    $("#lib_3").css({
                        'margin-left' : "0px"
                    });
                    $("#title_3").css({
                        'margin-left' : "0px"
                    });
                    
                    for(var i=1;i<=number_of_columns;i++) {
                        $("#lib_3 .column"+i).each(function() {
                            $(this).animate({
                                'width' : '172px'
                            },0);
                        })
                    }
                },
                
                success: function(data) {
                    var keywordsArr = data['searches'];
                    for(var i=0; i<keywordsArr.length; i++) {
                        AjaxController.keywordsPrefSearch(i,keywordsArr[i], filter_price, filter_epub, filter_pdf, filter_mobile, filter_drm);
                        
                        var keyword_name = keywordsArr[i];
                        $('#title_3 .column'+(i+1)+' span').html(keyword_name+'');
                    }
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::customKeywords");
                }
            })
        },
        
        "keywordsPrefSearch": function(i,search_value,filter_price,filter_epub,filter_pdf,filter_mobile,filter_drm) {
            var keywordsPrefSearch_url = data_url+'books/KeywordSearch.json/'+search_value+'/'+filter_price+'|'+filter_epub+'|'+filter_pdf+'|'+filter_mobile+'|'+filter_drm;
            
            $.ajax({
                url: keywordsPrefSearch_url,
                dataType: 'json',
                
                complete: function() {
                    update_addToCart_targets('#lib_3');
                    author_search("#lib_3");
                    update_bookSheet_targets();
                },
                
                success: function(data) {
                    if(data['documents'] != "No Result") {
                        if(data['documents'].length == 1)
                            parseJsonForPrefCategories(data['documents'], i+1, 3, 16, data['country'], data['defaultCountry']);
                        else
                            parseJsonForPrefCategories(data['documents'], i+1, 3, "", data['country'], data['defaultCountry']);
                    }
                    else
                        $('#lib_3 .column'+(i+1)).html('<div style="text-align: center;margin-top:10px;">Aucun résultat</div>');
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::keywordsPrefSearch");
                }
            })
        },
        
        "logOut" : function() {
            var logout = data_url+'profile/ajax_logout.json';
            
            $.ajax({
                url: logout,
                dataType: "json",
                
                complete: function() {
                },
                
                success: function() {
                    refreshCart();
                    for(var i=1; i<4; i++) {
                        $("#call_"+i).css({
                            'display':'none'
                        })
                    }
                    callContent(0);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::logOut");
                }
            })
        },
        
        "is_logged": function() {
            var is_logged_url = data_url+'profile/ajax_is_logged.json';
            
            $.ajax({
                url: is_logged_url,
                dataType: 'json',
                
                complete: function() {

                },
                
                success: function(data) {
                    if(data['status']==false) {
                        AjaxController.getLoginForm(fillLoginForm);
                    }
                    else if(data['status']==true) {
                        AjaxController.logAction('MonCompte_Loggé');
                        AjaxController.connected(connected);
                        $('#forgotPasswordZone').hide();
                        $('#registerZone').hide();
                    }
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::is_logged");
                }
            })
        },
        
        "connected": function(callback) {
            var is_logged_url = data_url+'profile/ajax_is_logged.json';
            
            $.ajax({
                url: is_logged_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    AjaxController.customDisplay();
                    var user_name="";
                    if(data['pref']['firstname']==undefined && data['pref']['lastname']==undefined)
                        user_name = data['user'];
                    else
                        user_name = data['pref']['firstname']+" "+data['pref']['lastname'];
                    
                    callback('<div id="user_name">Bonjour '+user_name+'</div>'+'<span id="perso">Accéder à votre compte</span><br\><span id="logout">Se déconnecter</span>');
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::connected");
                }
            })
        },
        
        //FORMS
        "getLoginForm": function(callback) {
            var login_url = data_url+"login";
            $.ajax({
                url: login_url,
                dataType: 'html',
                complete: function() {
                },
                success: function(data) {
                    callback(data);
                    
                },
                error: function() {
                    console.log("ERROR in search::ajax::customDisplay");
                }
            });
        },
        
        "getRegisterForm": function(callback) {
            var register_url = data_url+"register";           
            $.ajax({
                url: register_url,
                dataType: 'html',
                complete: function() {
                    
                },
                success: function(data) {
                    callback(data);
                },
                error: function() {
                    console.log("ERROR in search::ajax::getRegisterForm");
                }
            });
        },
        
        "getPasswordResetterForm": function(callback) {
            var passwordReset_url = data_url+"resetting/request";
            $.ajax({
                url: passwordReset_url,
                dataType: 'html',
                complete: function() {
                },
                success: function(data) {
                    callback(data);
                },
                error: function() {
                    console.log("ERROR in search::ajax::getPasswordResetterForm");
                }
            });
        },
        
        "getFormats": function(product_id, that) {
            var getFormats_url = data_url+"books/get_formats_"+product_id+".json";
            
            $.ajax({
                url:getFormats_url,
                dataType:'json',
                
                complete: function() {
                    add_to_cart();
                    createCartQtip($(that));
                    $(that).qtip("show");
                },
                
                success: function(data) {
                    parseJsonForGetFormatsResult(data);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::getFormats");
                }
            })
        },
        
        "addToCart": function(id_product) {
            var addToCart_url = data_url+"profile/cart/add_to_cart_"+id_product+".json";
            
            $.ajax({
                url: addToCart_url,
                dataType: 'json',
                complete: function() {
                    $("#booksheet").qtip('hide');
                },
                
                success: function(data) {
                    if(data['status']==true) {
                        $("#validateAddToCartQtip").qtip('option', 'content.text', "Votre livre a bien été ajouté au panier");
                        $("#validateAddToCartQtip").stop().qtip('show');
                        animateCart(data["numOfItems"]);
                    }
                    else {
                        $("#validateAddToCartQtip").qtip('option', 'content.text', "Ce livre est déjà  dans votre panier.");
                        $("#validateAddToCartQtip").stop().qtip('show');
                    }
                },
                
                error: function(xhr, textStatus, error){
                    console.log("ERROR in search::ajax::addToCart");
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                }
            })
        },
        
        "emptyCart": function(that) {
            var clearCart_url = data_url+"profile/cart/clear_cart.json";
            var its = that;
            
            $.ajax({
                url: clearCart_url,
                dataType: 'json',
                complete: function() {
                    
                },
                
                success: function() {
                    var panier = "panier vide";
                    fillCartDom(panier);
                    its.set('content.text', $('#panier_display')); 
                    $('#cart').qtip("render");
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::emptyCart");
                }
            })
        },
        
        "removeElementFromCart": function(id_product, that) {
            var front_url = window.sanspapier.config.front_url;
            var removeFromCart_url = data_url+"profile/cart/delete_from_cart_"+id_product+".json";
            var panier = "";
            var cartElements = "";
            
            $.ajax({
                url: removeFromCart_url,
                dataType: 'json',
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    $.ajax({
                        url: data_url+"profile/cart/get_cart.json",
                        dataType: 'json',
                        
                        complete: function() {
                            
                        },
                        
                        success: function(data) {
                            
                            if(data['status'] == true) {
                                for(var i=0; i<data['data']['products'].length; i++) {
                                    cartElements = cartElements + createCartResults(data['data']['products'][i], data['data']['country']);
                                }
                                panier = cartElements+'<div class="bottom_cart_container"><div class="total_price">Total: '+data['data']['total_price']+'\u20ac</div><a href="'+front_url+'shop.php" class="endCart" id="processCart">Valider la commande</a></div>';
                                fillCartDom(panier);
                                that.set('content.text', $('#panier_display'));
                                
                                if(data['data']['products'].length<5){
                                    $("#panier_display").css({
                                        'overflow-y': 'hidden'
                                    })
                                }
                                
                                $('#cart').qtip("render");
                            }
                            else {
                                panier = "Panier vide";
                                fillCartDom(panier);
                                that.set('content.text', $('#panier_display'));
                                $('#cart').qtip("render");
                            } 
                            deleteElementFromCart(that);
                        },
                        
                        error: function() {
                            console.log("ERROR in search::ajax::removeElementFromCart::success");
                        }
                    })
                    animateCart(data["numOfItems"]);
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::removeElementFromCart");
                }
            })
        },
        
        "setFilters": function(setPrice, setEpub, setPdf, setMobile, setDRM) {
            var setFilters_url = data_url+"profile/filters/setFilters_"+setPrice+"_"+setEpub+"_"+setPdf+"_"+setMobile+"_"+setDRM+".json";
            
            $.ajax({
                url: setFilters_url,
                
                complete: function() {
                    if(window.sanspapier.firstResearch==false){
                        AjaxController.search(window.sanspapier.last_search_value, setPrice,setEpub,setPdf,setMobile,setDRM,window.sanspapier.last_search_type);
                    }
            
                    callContent(window.sanspapier.categories.lastCatDisplayed);
                },
                
                success: function() {
                    AjaxController.logAction('Filters_'+setPrice+"_"+setEpub+"_"+setPdf+"_"+setMobile+"_"+setDRM);
                    window.sanspapier.filters.price = setPrice;
                    window.sanspapier.filters.epub = setEpub;
                    window.sanspapier.filters.pdf = setPdf;
                    window.sanspapier.filters.mobile = setMobile;
                    window.sanspapier.filters.drm = setDRM;
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::setFilters");
                }
            })
        },
        
        "getFilters": function() {
            var setFilters_url = data_url+"profile/filters/getFilters.json";
            
            $.ajax({
                url: setFilters_url,
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    
                    window.sanspapier.filters.price = data['price'];
                    window.sanspapier.filters.epub = data['epub'];
                    window.sanspapier.filters.pdf = data['pdf'];
                    window.sanspapier.filters.mobile = data['mobile'];
                    window.sanspapier.filters.drm = data['drm'];
                    return data;
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::getFilters");
                }
            })
        },
        
        "initAndGetFilters": function(filter) {
            var initAndGetFiltersAction_url = data_url+"profile/filters/initAndGetFilters.json"
            
            $.ajax({
                url: initAndGetFiltersAction_url,
                
                complete: function() {
                    
                },
                
                success: function(data) {
                    window.sanspapier.filters.price = data[0]['price'];
                    window.sanspapier.filters.epub = data[0]['epub'];
                    window.sanspapier.filters.pdf = data[0]['pdf'];
                    window.sanspapier.filters.mobile = data[0]['mobile'];
                    window.sanspapier.filters.drm = data[0]['drm'];
                    
                    window.sanspapier.categories.lastCatDisplayed = 0;
                    callContent(0);
                    mytutorial.state = convertStringToBoolean(data[2]);
                    mytutorial.update_tuto_button();
                    mytutorial.check_dom_state();
                    
                    $("#call_0").animate({
                        'height': '35px',
                        'margin-top': '-10px'
                    },100);
                    
                    filter.updateParameters();
                    
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::initAndGetFilters");
                }
            })
        },
        
        "saveLastCustomId": function(catId) {
            var saveLastCustomId_url = data_url+"profile/filters/saveLastCustomId.json/"+catId;
            
            $.ajax({
                url:saveLastCustomId_url,
                
                complete: function() {

                },
                
                success: function() {
                    
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::saveLastCustomId");
                }
            })
        },
        
        "onOffTuto": function(on_off) {
            var onOffTuto_url = data_url+"profile/filters/onOffTuto_"+on_off+".json";
            
            $.ajax({
                url: onOffTuto_url,
                
                complete: function() {
                    
                },
                
                success: function() {
                    if(on_off == 'false')
                        AjaxController.logAction('TutoOff');
                    else
                        AjaxController.logAction('TutoOn');
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::onOffTuto");
                }
            })
        },
        
        "logAction": function(actionType) {
            var logAction_url = data_url+"profile/filters/logAction_"+actionType+".json";
            
            $.ajax({
                url: logAction_url,
                
                complete: function() {
                    
                },
                
                success: function() {
                    
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::logAction");
                }
            })
        }
    };
    return controller;
})();


function convertStringToBoolean(string) {
    if (string == "false") result = false;
    else result = true
    return result;
}

