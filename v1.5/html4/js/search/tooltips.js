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
var filter_tooltip = function() {
    var control_container = function(){
        
        var that = this;
        
        this.update = function() {
            that.price = window.sanspapier.filters.price;
            that.epub = window.sanspapier.filters.epub;
            that.pdf = window.sanspapier.filters.pdf;
            that.mobile = window.sanspapier.filters.mobile;
            that.drm = window.sanspapier.filters.drm;
        }
        
        this.setPrice = function(price) {
            that.price = price;
        }
        this.setEpub = function(epub) {
            that.epub = epub;
        } 
        this.setPdf = function(pdf) {
            that.pdf = pdf;
        } 
        this.setMobile = function(mobile) {
            that.mobile = mobile;
        }
        this.setDrm = function(drm) {
            that.drm = drm;
        }
        
        $("#go_filter").click(function(){            
            AjaxController.setFilters(that.price,that.epub,that.pdf,that.mobile,that.drm);
        })
        
    };
    
    var controller = new control_container ();
    
//    var price_slider = new horizontal_slider('price_slider','price_bar','price_feedback',controller.setPrice);
    var epubtoggle = new toggle('epub',controller.setEpub);
    var pdftoggle = new toggle('pdf',controller.setPdf);
//    var mobiletoggle = new toggle('mobile',controller.setMobile); 
    
//    var round_toggle = function(id,action){ 
//        this.id = id;
//        var state = true;
//        var that = this;
//        $('#'+this.id).click(function() {
//            if (!state){
//                $(this).css("background-color", '#000');
//                state = true;
//                action(1);
//                $('#drm_feedback').html("Avec et sans");
//            ///here appel ajax
//            }
//            else {
//                $(this).css("background-color", '#E2E2E2');
//                state = false;
//                action(0);
//                $('#drm_feedback').html("Sans");
//            //here appel ajax
//            }
//        });
//        
//        this.setValue = function(sessionValue) {
//            if (sessionValue == 1){
//                $('#'+that.id).css("background-color", '#000');
//                state = true;
//            }
//            else {
//                $('#'+that.id).css("background-color", '#E2E2E2');
//                state = false;
//            }
//        }
//        
//    } 
    
//    var drm_toggle = new round_toggle('drm',controller.setDrm);
    
    this.updateParameters = function() {
        controller.update();
//        price_slider.setValue(controller.price);
        epubtoggle.setValue(controller.epub);
        pdftoggle.setValue(controller.pdf);
//        mobiletoggle.setValue(controller.mobile);
//        drm_toggle.setValue(controller.drm); 
    };

}







//--------------            BOOKSHEET          ---------------------//


var booksheet_tooltip = function() {
    
    var targets = $(".bookSheetIdLink").each(function(){

        });
    
    var close_target = $("#booksheet .buy_button").each(function(){
        
        });
    
    $(document.body).qtip({
        content: {
            text: $('#modal_loading').clone()
        },
        position: {
            target: $(window),
            my: 'center',
            at: 'center'
        },
        show: {
            target: targets,
            event: 'click',
            modal: {
                on: true,
                blur: true
            }
        },
        hide: {
            target: close_target,
            event: 'click'
        },
        style: {
            classes: 'windows'
        },
        events: {
            show: function(event, api) { 
                
                window.sanspapier.myeasel.freezeCible(true);
                
                $('body').css("overflow", 'hidden');
                
                $(this).css({
                    'position':'absolute',
                    'z-index':60000                   //TODO
                })
                
                $(".tuto_open").css({
                    'z-index':10
                })
            },
            
            hide: function(event, api) {
                
                window.sanspapier.myeasel.freezeCible(false);
                
                $('body').css("overflow", 'visible');
                $(".tuto_open").css({
                    'z-index':27000
                })
            }
        }
    });
}

var update_bookSheet_targets = function() {
    var targets = $(".bookSheetIdLink").each(function(){
        $(this).unbind("click");
        $(this).click(function(){
            var id = ($(this).attr("id")).split("_")[1];
            var type = ($(this).attr("id")).split("_")[2];
            AjaxController.logAction('Booksheet_'+id+'_'+type);
            var split_value = window.location.hash.split('_');
            if(split_value[1]==id)
                updatePage();
        })
    });

    $(document.body).qtip('option','show.target',targets);
    $(document.body).qtip("render");
}


var update_booksheet_close_target = function(){
  
    $(".close_booksheet").click(function(){
        $(document.body).qtip('hide');
    })
}

var update_booksheet_sliders = function(){
    //Init z-index values for sliders -
    $("#booksheet .auteur_slider").css({
        'z-index':50000
    });
    $("#booksheet .editions_slider").css({
        'z-index':40000
    });
    
    $("#booksheet #sameAuthor_title").css({
        'background': '#444',
        'color': '#FFF'
    });
    $("#booksheet #sameEd_title").css({
        'background': '#BBB',
        'color': '#444'
    });
    
    $("#booksheet .auteur_slider").click(function(){
        $(this).css({
            'z-index':50000
        });
        $("#booksheet .editions_slider").css({
            'z-index':40000
        });
        
        $("#booksheet #sameAuthor_title").css({
            'background': '#444',
            'color': '#FFF'
            
        });
        $("#booksheet #sameEd_title").css({
            'background': '#BBB',
            'color': '#444'
        });
    });
    
    $("#booksheet .editions_slider").click(function(){
        $(this).css({
            'z-index':50000
        });
        $("#booksheet .auteur_slider").css({
            'z-index':40000
        });
        
        $("#booksheet #sameAuthor_title").css({
            'background': '#BBB',
            'color': '#444'
        });
        $("#booksheet #sameEd_title").css({
            'background': '#444',
            'color': '#FFF'
        });
    });
}




var init_format = function(book_id){
    
    var optionValue = $("#booksheet #formatSlider_"+book_id).val();
    if(typeof(optionValue) != 'undefined') {
        var title = "";
        var formats_description = "";
        var protection_description = "";
        var formatsArr = new Array();

        if(optionValue.indexOf(',')!=-1){
            formatsArr = optionValue.split(',');
            title += "Multi-Formats incluant ";
        }

        else{
            formatsArr.push(optionValue);
            var product_id = optionValue.split('__')[1];
            var formatTexte = $("#booksheetFormats_"+optionValue.split('_')[0]+" .booksheetFormatsTitle").html();
            $("#booksheet .container_fiche .buy_button").html('<a href="http://www.sanspapier.com/books/600/'+product_id+'/'+product_id+'.'+formatTexte.toLowerCase()+'" target="_blank" class="choose_format_button" id="buyBookSheet_'+product_id+'"></a>');
        }


        var same_protection = 0;

        for(var i=0; i<formatsArr.length; i++){

            var format = formatsArr[i].split('_')[0];
            var protection = formatsArr[i].split('_')[1];
            if(protection==4 || protection==5 || protection==6)
                protection = 2;

            if(formatsArr.length==1 || i==formatsArr.length-1)
                title += $("#booksheetFormats_"+format+" .booksheetFormatsTitle").html() + " " + $("#booksheetFormats__"+protection+" .booksheetFormatsTitle").html();
            else
                title += $("#booksheetFormats_"+format+" .booksheetFormatsTitle").html() + " " + $("#booksheetFormats__"+protection+" .booksheetFormatsTitle").html()+", ";


            formats_description += "<div class='format_data'>"+$("#booksheetFormats_"+format+" .booksheetFormatsContent").html()+"</div>";

            if(protection!=same_protection)
                protection_description += "<div class='format_data'>"+$("#booksheetFormats__"+protection+" .booksheetFormatsContent").html()+"</div>";

            same_protection = protection;
        }

        var data = '<div class="format_title">'+title+'</div>' + formats_description + protection_description;

        var path3 = ".format_slider #formats_slider";
        $(path3).html(data);
    }
}

var update_formats = function(book_id){
                
    var currentValue = 0;
        
    $("#booksheet #formatSlider_"+book_id).change(function(){
        var optionValue = $(this).val();
        
        if (currentValue != optionValue) {
            currentValue = optionValue;
            var title = "";
            var formats_description = "";
            var protection_description = "";
            var formatsArr = new Array();
        
            if(optionValue.indexOf(',')!=-1){
                formatsArr = optionValue.split(',');
                title += "Multi-Formats incluant ";
            }
            
            else{
                formatsArr.push(optionValue);
                var product_id = optionValue.split('__')[1];
                var formatTexte = $("#booksheetFormats_"+optionValue.split('_')[0]+" .booksheetFormatsTitle").html();
                $("#booksheet .container_fiche .buy_button").html('<a href="http://www.sanspapier.com/books/600/'+product_id+'/'+product_id+'.'+formatTexte.toLowerCase()+'" target="_blank" class="choose_format_button" id="buyBookSheet_'+product_id+'"></a>');
            }
        
        
            var same_protection = 0;
        
            for(var i=0; i<formatsArr.length; i++){
            
                var format = formatsArr[i].split('_')[0];
                var protection = formatsArr[i].split('_')[1];
                if(protection==4 || protection==5 || protection==6)
                    protection = 2;
            
                if(formatsArr.length==1 || i==formatsArr.length-1)
                    title += $("#booksheetFormats_"+format+" .booksheetFormatsTitle").html() + " " + $("#booksheetFormats__"+protection+" .booksheetFormatsTitle").html();
                else
                    title += $("#booksheetFormats_"+format+" .booksheetFormatsTitle").html() + " " + $("#booksheetFormats__"+protection+" .booksheetFormatsTitle").html()+", ";
            
            
                formats_description += "<div class='format_data'>"+$("#booksheetFormats_"+format+" .booksheetFormatsContent").html()+"</div>";
            
                if(protection!=same_protection)
                    protection_description += "<div class='format_data'>"+$("#booksheetFormats__"+protection+" .booksheetFormatsContent").html()+"</div>";
            
                same_protection = protection;
            }
        
            var data = '<div class="format_title">'+title+'</div>' + formats_description + protection_description;
        
            var path3 = ".format_slider #formats_slider";
            $(path3).html(data);
        
            update_chooseFormat_targets("#booksheet");
        }
    });
}






//--------------            CART          ---------------------//

var cart_tooltip = function() {
    
    //add_to_cart();
        
    var data_url = window.sanspapier.config.data_url;
    var front_url = window.sanspapier.config.front_url;
    var cartElements = "";
    
    $('#cart').qtip({
        
        content: {
            text: 'Chargement...', // The text to use while the AJAX request is loading
            ajax: {
                url: data_url+'profile/cart/get_cart.json', // URL to the local file
                type: 'GET', // POST or GET
                dataType: 'json',
                once: false,

                complete: function() {
                    update_bookSheet_targets();
                    deleteElementFromCart(this);
                },
                
                success: function(data) {
                    
                    var panier = ""
                    if(data['status']==true){
                        for(var i=0; i<data['data']['products'].length; i++) {
                            cartElements += createCartResults(data['data']['products'][i], data['data']['country']);
                        }
                        
                        panier = cartElements+'<div class="bottom_cart_container"><div class="total_price">Total: '+data['data']['total_price']+' \u20ac</div><a href="'+front_url+'shop.php" class="endCart" id="processCart">Valider la commande</a></div>';
                        fillCartDom(panier);
                        this.set('content.text', $('#panier_display'));
                        
                        if(data['data']['products'].length>4){
                            $("#panier_display").css({
                                'overflow-y': 'scroll'
                            })
                        }
                        else{
                            $("#panier_display").css({
                                'overflow-y': 'hidden'
                            })
                        }
                        
                        $('#cart').qtip("render");
                        author_search("#panier_display");
                    }
                    else {
                        panier = "Panier vide";
                        fillCartDom(panier);
                        this.set('content.text', $('#panier_display'));
                        $('#cart').qtip("render");
                    }         
                    cartElements = "";
                },
                        
                error: function() {
                    console.log("ERROR in cart qtip");
                }
            }
        },
        show:{
            
            event: 'click'
            
        },
        
        hide: {
            event: 'mouseleave click',
            fixed: true,
            delay: 200
        },
        position: {
            target: $('#cart'),
            at: "bottom right",
            my: "top right",
            adjust: {
                x:18
            }
        },
        
        style: {
                
            classes: 'windows' ,
            tip: {
                corner: false
            }
        },
        events: { 
            show: function(e, api) { 
                
                window.sanspapier.myeasel.freezeCible(true);
                
                //api.set('content.text',"loading...")
                $.fn.qtip.zindex = 20000;
                
            },
            hide: function(e, api) {
                window.sanspapier.myeasel.freezeCible(false);
            }  
        }
    });


}


var deleteElementFromCart = function(that) {    
    $(".delete_cartElement").each(function(){
        var link_id = ($(this).attr("id")).split("_")[1];        
        $.attr(this, 'tooltip', link_id);
        
        $(this).click(function(){
            $('#cart_'+link_id).animate({
                'height': '0px',
                'opacity':0
            },40,function(){
                AjaxController.removeElementFromCart(link_id, that);
            });
        });
    });
}


var add_to_cart = function() {
    $(".choose_format_button").click(function(){
//        var product_id = ($(this).attr("id")).split("_")[1];
//        AjaxController.logAction('AddToCart_'+product_id);
//        AjaxController.addToCart(product_id);
    });
    
}

var choose_format = function() {
    
    $(".addToCart").click(function(){
        
        var target = $(this);
        createCartQtip(target);
        
    });
}

var update_chooseFormat_targets = function(parent){
    $(parent+" .choose_format_button").click(function(){
        var product_id = $(this).attr("id").split('_')[1];
        //$(document.body).qtip('hide');
        AjaxController.logAction('AddToCart_'+product_id+'_Booksheet');
        //AjaxController.addToCart(product_id);
    });
}

function createCartQtip(target){
    $(target).qtip({
        content: $('#choose_format_display').html(),
            
        show:{ 
            target: target,
            event:'click',
            modal: {
                on: true,
                blur: true
            }
        },
        hide:{
            event: false
        },
        position:{
            target: $(window),
            my: 'center',
            at: 'center'
        },
        style:{
            classes: 'windows',
            'width':'350px'
        },
        events:{
            show: function(e, api) { 
                var that = this;
                
                window.sanspapier.myeasel.freezeCible(true);
                
                add_to_cart();
                $('body').css("overflow", 'hidden');
                    
                $(this).css({
                    'position':'absolute',
                    'zindex':30000                     //TODO
                })
                    
                $(".choose_format_button").click(function(){
                    //$(target).qtip("hide");
                })
                
                $(".tuto_open").css({
                    'z-index':10
                })
                $(".tuto_open").qtip("hide");
                $(".targetImgBook").qtip("hide");
                
                $(".choose_format_close").click(function(){
                    $(that).qtip('hide');
                })
            },
                
            hide: function(e, api){
                
                window.sanspapier.myeasel.freezeCible(false);
                
                $('body').css("overflow", 'visible');
                $(target).qtip('destroy');
                
                $(".tuto_open").css({
                    'z-index':27000
                })
            }
        }
    })  
}

var update_addToCart_targets = function(parent){
    $(parent+" .addToCart").each(function(){
        var product_id = ($(this).attr("id")).split("_")[1];
        var type = $(this).attr("id").split('_')[2];
        $.attr(this, 'tooltip', product_id);
        
        $(this).click(function(){
            AjaxController.logAction('ChooseFormat_'+product_id+'_'+type);
            AjaxController.getFormats(product_id, this);
        });
    });
}   

var animateCart = function(nbItems){
    $('#cart').animate({
        opacity:0
    }, 50, function() {
        $('#cart').animate({
            opacity:0.7
        }, 100);
    });
            
    $('#cartCount').animate({
        opacity:0
    }, 50, function() {
        $('#cartCount').animate({
            opacity:1
        }, 100);
    });
    
    if(nbItems==0)
    {
        $('#cartCount').html("");
    }
    else
        $('#cartCount').html('('+nbItems+')');
      
}

var refreshCart = function(){
    var data_url = window.sanspapier.config.data_url;
    $.ajax({
        url: data_url+"profile/cart/count_cart.json",
        dataType: 'json',
        complete: function(){
                            
        },
        success: function(data){
            if(data==0)
                $('#cartCount').html("");
            else
                $('#cartCount').html('('+data+')');
        },
        error: function(){
            console.log("ajax_error");
        }
    })
}

var validateAddToCartQtip = function(){
    var target = $("#validateAddToCartQtip");
    
    $("#validateAddToCartQtip").qtip({
        content: "Votre livre a bien été ajouté au panier",
        
        position: {
            target: target,
            my: 'top center',
            at: 'center',
            adjust:{
                y:15
            }
        },
        show: {
            event: false
        },
        hide: {
            
        },
        style: {
            classes: 'windowsValidateAddToCart',
            'padding': '5px'
        },
        events: {
            show: function(event, api) {
                $.fn.qtip.zindex = 100000;
                setTimeout(api.hide, 3000); 
            }
        }
    })
}



//--------------            AUTHOR SEARCH          ---------------------//



var author_search = function(parent){
    
    $(parent+" .authorName").each(function(){
        
        var author_searchable = this.getAttribute('author_searchable');
        var author_id = this.getAttribute('author_id');
        
        var search_value = $(this).html();
        
        search_value = fixedEncodeURIComponent(search_value);
        
        var advanced_search_value = search_value;
        
        advanced_search_value += "_1_"+author_id;
        
        advanced_search_value +=  ( author_searchable ==  'true' ) ? '_1' : '_0';
        
        $(this).click(function(){
            author_research(search_value, advanced_search_value );
        });   
    });
}

var author_research = function(search_value, advanced_search_value ){
    var encoded_value = "#!search_"+advanced_search_value;
    window.location = encoded_value;
    window.sanspapier.last_search_value = search_value;
    
    if(window.sanspapier.firstResearch==true){
        $('#space').css({
            'height':window.sanspapier.defFormats.spaceHeight
        });
        fixScrollBar("#scroll_fixed");
        $('#space').css({
            'height':'0'
        });
    }        
    
            
    if($('#cible').css('display')=='none'){
                
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
        },500, function(){
            //$('#cible').show();
            $("#middle_search_bar_container").hide();
            $("#cible").animate({
                'opacity':'1'
            },500);
            
        });
    }
}



//--------------            DIVERS          ---------------------//


var moreText = function(){
    $('.text').css({
        'overflow-y':'scroll'
    });
    $('.text').html(window.sanspapier.booksheet.fullText);
    
    addBlank('.text');
}


var zindexTargetBooks = function(){

    $(".targetImgBook").each(function(){
        $(this).hover(function(){
            if($(window).scrollTop()<window.sanspapier.defFormats.scrollTopDetect){
                
                $("#cible").css({
                    'z-index':20000
                })

            }
        }, function(){
            $("#cible").css({
                'z-index':300
            })
                    
        });

    });
}
