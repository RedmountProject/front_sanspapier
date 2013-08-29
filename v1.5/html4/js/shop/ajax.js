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
        
        "resetCategoriesMarkers" : function() {
            var logout = data_url+'profile/filters/resetCategoriesMarkers.json';
            
            $.ajax({
                url: logout,
                dataType: "json",
                
                complete: function(){
                },
                
                success: function(){
                },
                
                error: function(){
                    console.log("resetCategoriesMarkers error");
                }
            })
        },
        
        "logOut" : function() {
            var logout = data_url+'profile/ajax_logout.json';
            
            $.ajax({
                url: logout,
                dataType: "json",
                
                complete: function(){
                },
                
                success: function(){
                },
                
                error: function(){
                    console.log("logout error");
                }
            })
        },
        
        "is_logged": function(){
            var is_logged_url = data_url+'profile/ajax_is_logged.json'; 
            
            $.ajax({
                url: is_logged_url,
                dataType: 'json',
                
                complete: function(){
                },
                
                success: function(data){
                    if(data['status']==false) {
                        userForm();
                        
                        $('#mon_compte').qtip('show');
                        
                    }
                    else if(data['status']==true){
                        window.location = window.sanspapier.config.front_url+"profile.php";
                    }
                },
                
                error: function(){
                }
            })
        },
        
        
        "init_is_logged" : function() {
            var dataToDecode = '';
            var isFromFriendSite = window.location.toString();
            if(isFromFriendSite.indexOf('?') != -1) {
                dataToDecode = isFromFriendSite.split('\?')[1];
            }
            
            var isLogged_url = data_url+'profile/ajax_is_logged.json';
            
            $.ajax({
                url: isLogged_url,
                dataType: 'json',
                
                complete: function(){

                },
                
                success: function(data){
                    isFromExternal = 0;
                    if(dataToDecode != '') {
                        isFromExternal = 1;
                        AjaxController.setCartFromExternalWebsite(dataToDecode);
                        console.log('found:'+isFromExternal);
                    }
                    if(data['status'] == false) {
                        
                        $("#id").animate({
                            'opacity':1,
                            color: "white"
                        });
                        $('#shop_cartDisplay').css({
                            'display':'none'
                        })
                        console.log('before call:'+isFromExternal);
                        AjaxController.getLoginForm(fillLoginForm);
                        AjaxController.getRegisterForm(fillRegisterForm);
                    }
                    else if(data['status']==true) {
                        AjaxController.isComplete();
                    }
                        
                },
                
                error: function(){
                    console.log("is logged ajax_error");
                }
            });
        },
        
        "getLoginForm": function(callback) {
            var login_url = data_url+"login";
            $.ajax({
                url: login_url,
                dataType: 'html',
                complete: function(){

                },
                success: function(data){
                    callback(data);
                },
                error: function(){
                    console.log("login form ajax_error");
                }
            });
        },
        
        "getRegisterForm": function(callback) {
            var register_url = data_url+"register";
            $.ajax({
                url: register_url,
                dataType: 'html',
                complete: function(){
                
                },
                success: function(data){
                    callback(data);
                },
                error: function(){
                    console.log("register form ajax_error");
                }
            });
        },
        
        "setCartFromExternalWebsite" : function(pData) {
            var getCartUrl = data_url+'profile/cart/set_cart_from_external_website.json';
            $.ajax({
                url: getCartUrl,
                type: 'post',
                cache: false,
                data: {
                    data: pData
                },
                
                complete: function(){
                    
                },
                
                success: function() {
                    
                },
                
                error: function(xhr, textStatus, error){
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                }
            })
        },
        
        "isComplete" : function() {
            var isComplete_url = data_url+'profile/preferences/is_complete.json';
            $.ajax({
                url: isComplete_url,
                dataType:"json",
                
                complete: function(){
                    
                },
                
                success: function(data) {
                    if(data['status']==false){
                        AjaxController.getPreferencesForm(fillPrefForm);
                        
                        $("#id").animate({
                            'opacity':1,
                            color: "white"
                        });
                    }
                    else {
                        $('#shop_cartDisplay').css({
                            'display':'block'
                        })
                        
                        $("#form").hide(0);
                        
                        $("#id").animate({
                            'opacity':1,
                            color: "green"
                        }, 200);
                        $("#selec").animate({
                            'opacity':1,
                            color: "white"
                        });
                        
                        
                        AjaxController.cart_display("");
                        $("#total_price").show();
                        
                    }
                },
                
                error: function(){ 
                    
                }
            })
        },
        
        "getPasswordResetterForm": function(callback) {
            var passwordReset_url = data_url+"resetting/request";
            $.ajax({
                url: passwordReset_url,
                dataType: 'html',
                complete: function(){
                
                },
                success: function(data){
                    callback(data);
                },
                error: function(){
                    console.log("password resetter ajax_error");
                }
            });
        },
        
        "prefIsComplete": function() {
            var prefIsComplete_url = data_url+'profile/preferences/is_complete.json';
            $.ajax({
                url: prefIsComplete_url,
                dataType: 'json',
                
                complete: function() {

                },
                
                success: function() {
                    $("#form").hide(100);
                        
                    $("#id").animate({
                        'opacity':1,
                        color: "green"
                    }, 200);
                    $("#selec").animate({
                        'opacity':1,
                        color: "white"
                    });
                    
                    AjaxController.cart_display("");
                    $("#total_price").show();
                },
                
                error: function() {
                }
                
            });
        },
        
        "getPreferencesForm": function(callback) {
            var prefForm_url = data_url+'profile/preferences/form';
            $.ajax({
                url: prefForm_url,
                dataType: "html",
                
                complete: function(){
                    
                },
                
                success: function(data){
                    callback(data);
                },
                
                error: function(){
                    console.log("pref from ajax_error");
                }
            });
        },
        
        "cart_display": function(message) {
            var cartDisplay_url = data_url+'profile/cart/get_cart_shop.json';
            $.ajax({
                url: cartDisplay_url,
                dataType: 'json',

                complete: function(){
                    deleteElementFromCart();
                    endSelec();
                },
                success: function(data){
                    $("#selec_step").show();
                    $('#total_price').show();
                    var cartElements = "";
                    var i = 0;
                    var total = 0;
                    var pId = 0;
                    if(data['status'] == 'ok'){
                        for(i=0; i<data['data']['products'].length; i++) {
                            cartElements = cartElements + createOrderPipeResults(data['data']['products'][i], data['data']['country'], false);
                        }
                    
                        $('#shop_cartDisplay').html(message+'<br />'+cartElements);
                        total = parseFloat(data['data']['total_price']).toFixed(2);
                        
                        $('#_price').html(total+" \u20ac");
                    }
                    else if(data['status'] == 'warning') {
                        for(i=0; i<data['data']['products'].length; i++) {
                            var foundError = false;
                            pId = data['data']['products'][i]['product_id'];
                            for(var j = 0; j < data['errors'].length; j++) {
                                if(data['errors'][j] == pId)
                                    foundError = true;
                            }
                            
                            if(foundError)
                            {
                                cartElements = cartElements + createOrderPipeResultsError(data['data']['products'][i]);
                            }
                            else
                                cartElements = cartElements + createOrderPipeResults(data['data']['products'][i], data['data']['country']);
                        }
                    
                        $('#shop_cartDisplay').html(message+'<br />'+cartElements);
                        total = parseFloat(data['data']['total_price']).toFixed(2);
                        
                        $('#_price').html(total+" \u20ac");
                    }
                    else {
                        $('#shop_cartDisplay').html('<p style="font-weight:bold; font-size:18px; margin:10px;">panier vide</p>');
                        $('#total_price').hide(100);
                    }
                },
                            
                error: function(){
                    console.log("ajax_error");
                }     
            });
        },
        
        "preRemoveElementFromCart": function(id_product) {
            var remove_url = data_url+'profile/cart/delete_from_cart_'+id_product+'.json';
            
            $.ajax({
                url: remove_url,
                dataType: 'json',
                
                complete: function(){
                    
                },
                
                success: function(){
                },
                
                error: function(){
                    
                }
            })
        },
        
        "removeElementFromCart": function(id_product) {
            var remove_url = data_url+'profile/cart/delete_from_cart_'+id_product+'.json';
            
            $.ajax({
                url: remove_url,
                dataType: 'json',
                
                complete: function(){
                    
                },
                
                success: function(data){
                    AjaxController.cart_display("");
                },
                
                error: function(){
                    
                }
            })
        },
        
        "decideBuyProcess": function() {
            $("#end_button").unbind("click");
            var host = $(location).attr('host');
            var urstr = host;
            var encoded_urstr = encodeURIComponent(urstr);
            var decideProcess = data_url+'shop/secure/decide_buy_process.json/'+encoded_urstr;
            
            $.ajax({
                url: decideProcess,
                dataType:'json',
                
                complete: function(){
                    
                },
                
                success: function(data){
                    if(data['type']==1)
                    {
                        $("#selec_step").hide();
                        $("#selec").animate({
                            'opacity':1,
                            color: "green"
                        }, 200);
                        $("#pay").animate({
                            'opacity':1,
                            color: "white"
                        });
                        var completeData = '<div style="width:100%; text-align:center; margin-bottom:20px; margin-top:40px;">Choisissez votre moyen de paiement ci-dessous.<br />Vous serez ensuite redirigé(e) vers la page de paiement sécurisée de notre partenaire bancaire, la Société Générale :</div>'+data['data'];
                        $("#payment_step").html(completeData);
                        $("#payment_step").show();
                        $("#payment_step").animate({
                            'opacity':1
                        }, 300);
                        endSelec();
                    }
                    if(data['type']==2)
                        AjaxController.download(data['data']);
                },
                
                error: function(){
                    
                }
            })
        },
        
        "emptyCart": function(that) {
            var clearCart_url = data_url+"profile/cart/clear_cart.json";
            
            var its = that;
            
            $.ajax({
                url: clearCart_url,
                dataType: 'json',
                complete: function(){
                    
                },
                success: function(){

                },
                error: function(){
                    console.log("ajax_error");
                }
            })
        },
        
        "download": function(status){
            var achats_url = data_url+'profile/getProductsShelfByOperation.json';
            var sp = window.sanspapier.html;
            $.ajax({
                url:achats_url,
                dataType:'json',
                
                complete: function(){
                    
                    $("#id").animate({
                        'opacity':1,
                        color: "green"
                    },200, function(){
                        $("#selec").animate({
                            'opacity':1,
                            color: "green"
                        }, 200, function(){
                            $("#pay").animate({
                                'opacity':1,
                                color: "green"
                            }, 200, function(){
                                if(status==3){
                                    $("#download").animate({
                                        'opacity':1,
                                        color: "green"
                                    }, 200);
                                }
                                
                                if(status==2){
                                    $("#download").animate({
                                        'opacity':1,
                                        color: "white"
                                    }, 200);
                                }
                            });
                        });
                    });
                    
                    
                    $("#download_step").html(sp.achats_html);
                    $('#total_price').hide();
                    $("#form").hide();
                    $("#selec_step").hide();
                    $("#payment_step").hide();
                    $("#shop_cartDisplay").hide();
                    $("#download_step").show(300);
                    AjaxController.emptyCart();
                    
                    genPDF();
                },
                
                success: function(data){
                    
                    $("#payment_step").animate({
                        'opacity':1
                    }, 300);
                    
                    if(status==3){
                        //TODO virer l'envoi de mail (déplacé dans transactionController)
                        AjaxController.sendConfirmationMail(data['dilicom_transaction_id']);
                    
                        if(data['products'].length!=0){
                            sp.achats_html = '<div class="dilicom_order_number">Commande n\&deg; '+data['dilicom_transaction_id']+'</div><p>Nous vous remercions pour votre commande, vous pouvez dès à présent télécharger vos livres depuis votre <a href="profile.php#achats" style="text-decoration:underline;">espace personnel</a>.</p>';
                            sp.achats_html += displayProductsShelf(data['products']);
                            sp.achats_html += '<div class="shelfElement_total_price">Prix total : '+parseFloat(data['total_price']).toFixed(2)+' \u20ac</div>';
                            sp.achats_html += '<a href="#generatePDF" class="generatePDF" id="generatePDF_'+data['dilicom_transaction_id']+'">Imprimer votre facture au format PDF</a>';
                        }
                        
                        else {
                            sp.achats_html = "<p>Retour à la page d'accueil</p>";
                        }
                    }
                    else{
                        sp.achats_html = "<p style='color: green;'>La transaction s'est déroulée avec succès.</p><p style='color: red'>Cependant nous ne sommes pas parvenus à récupérer vos livres numériques auprès de notre distributeur. Nous vous invitons à nous contacter via notre <a href='a_propos.php#contact' style='text-decoration:underline;'>formulaire de contact</a> et de nous laisser vos coordonnées afin que nous puissions vous faire parvenir les liens de téléchargement le plus rapidement possible. Veuillez nous excuser pour ce désagrément.</p>";
                        //TODO virer l'envoi de mail (déplacé dans transactionController)
                        AjaxController.sendErrorMail(data['id_op']);
                    }
                    endSelec();
                },
                
                error: function(){
                    console.log("AJAX ERROR : GET PRODUCTSHELF")
                }
            })
        },
        
        "sendConfirmationMail": function(orderId){
            var sendmail_url = data_url+"profile/order_confirmation/sendConfirmationMail_"+orderId+".html"
            
            $.ajax({
                url: sendmail_url,
                dataType: 'html',
                
                complete: function(){
                    
                },
                
                success: function(){
                    
                },
                
                error: function(){
                    console.log("AJAX ERROR SEND CONFIRMATION MAIL")
                }
            })
        },
        
        "sendErrorMail" : function(orderId){
            var sendErrorMail_url = data_url+"profile/order_confirmation/sendErrorMail_"+orderId+".html"
            
            $.ajax({
                url: sendErrorMail_url,
                dataType: 'html',
                
                complete: function(){
                    
                },
                
                success: function(){
                    
                },
                
                error: function(){
                    console.log("AJAX ERROR SEND ERROR MAIL")
                }
            })
            
        },
        
        "getOperationStatus": function() {
            var return_url = data_url+'shop/secure/checkId.json';
            
            $.ajax({
                url:return_url,
                dataType: 'json',
                complete: function(){
                    
                },
                
                success: function(op_status){
                    switch(op_status){
                        case 3: //ALL GOOD
                            console.log("ALL GOOD !!");
                            AjaxController.download(op_status);
                            break;
                        
                        case 2: //DILICOM ERROR
                            console.log("DILICOM ERROR !!");
                            AjaxController.download(op_status);
                            break;
                        
                        case 1: //PAYMENT ERROR
                            console.log("PAYMENT ERROR !!");
                            AjaxController.cart_display("<p style='color: #AA0000'>Paiement refusé</p>");
                            break;
                            
                        case 99:
                            console.log("NO PAYMENT YET");
                            AjaxController.init_is_logged();
                            break;
                        
                        case -1:
                            console.log("NO PAYMENT YET");
                            AjaxController.init_is_logged();
                            break;
                    }
                    
                    
                },
                
                error: function(){
                    console.log("AJAX ERROR : OPERATION STATUS")
                }
            })
        }
        
    }; 
    
    return controller;
})();