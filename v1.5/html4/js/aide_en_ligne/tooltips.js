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

var booksheet_tooltip = function() {
    
    var targets = $(".bookSheetIdLink").each(function(){
        $(this).click(function(){
            updatePage();
        });
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
                update_bookSheet_targets();
                $.fn.qtip.zindex = 15000;
                
                api.set('content.text', $('#modal_loading').clone());
                
                $('body').css("overflow", 'hidden');
                
            },
            hide: function(event, api) {
                $('body').css("overflow", 'visible');
            }
        }
    });    
}

var update_bookSheet_targets = function() {
    var targets = $(".bookSheetIdLink").each(function(){
        });
            
    $(document.body).qtip('option','show.target',targets);
    $(document.body).qtip("render");
    
}

var update_booksheet_close_target = function(){
    var close_target = $("#booksheet .buy_button").each(function(){
        
        });
    $(document.body).qtip('option','hide.target',close_target);
    $(document.body).qtip("render");
}


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
                        $('#cart').qtip("render");
                    }
                    else {
                        panier = "panier vide";
                        fillCartDom(panier);
                        this.set('content.text', $('#panier_display'));
                        $('#cart').qtip("render");
                    }         
                    cartElements = "";

                },

                error: function() {
                    console.log("ajax error");
                }
            }
        },
        show:{

            event: 'click'

        },

        hide: {
            event: 'mouseleave',
            fixed: true,
            delay: 400
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
                $.fn.qtip.zindex = 20000; 
            }
        }
    });


}


var deleteElementFromCart = function(that) {
    
    var its = that;
    
    $(".delete_cartElement").each(function(){
        var link_id = ($(this).attr("id")).split("_")[1];
        $.attr(this, 'tooltip', link_id);
        
        $(this).click(function(){
            
            $('#cart_'+link_id).animate({
                'height': '0px',
                'opacity':0
            },100,function(){
                AjaxController.removeElementFromCart(link_id, that);
            });
            
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
        $('#cartCount').html("");
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

var moreText = function(){
    $('.text').css({
        'overflow-y':'scroll'
    });
    $('.text').html(window.sanspapier.booksheet.fullText);
    
    addBlank('.text');
}


