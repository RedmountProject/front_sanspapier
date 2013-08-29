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
var AjaxController = (function(){
    
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
                        AjaxController.getLoginForm(fillLoginForm);
                    }
                    else if(data['status']==true){
                        AjaxController.connected(connected);
                        $('#forgotPasswordForm').hide();
                        $('#registerForm').hide();
                    }
                },
                
                error: function(){
                }
            })
        },
        
        "connected": function(callback){
            var is_logged_url = data_url+'profile/ajax_is_logged.json';
            
            $.ajax({
                url: is_logged_url,
                dataType: 'json',
                
                complete: function(){
                    
                },
                
                success: function(data){
                    var user_name="";
                    if(data['pref']['firstname']==undefined && data['pref']['lastname']==undefined){
                        user_name = data['user'];
                    }
                    else
                        user_name = data['pref']['firstname']+" "+data['pref']['lastname'];
                    
                    callback('<div id="user_name">Bonjour '+user_name+'</div>'+'<span id="perso">Accéder à votre compte</span><br\><span id="logout">Se déconnecter</span>');
                },
                
                error: function(){
                    
                }
            })
        },
        
        //FORMS
        "getLoginForm": function(callback) {
            var login_url = data_url+"login";
            $.ajax({
                url: login_url,
                dataType: 'html',
                complete: function(){
                //completed();
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
        
        "getPasswordResetterForm": function(callback) {
            var passwordReset_url = data_url+"resetting/request";
            $.ajax({
                url: passwordReset_url,
                dataType: 'html',
                complete: function(){
                //completed();
                },
                success: function(data){
                    callback(data);
                },
                error: function(){
                    console.log("password resetter ajax_error");
                }
            });
        },
        
        "removeElementFromCart": function(id_product, that) {
            var front_url = window.sanspapier.config.front_url;
            var removeFromCart_url = data_url+"profile/cart/delete_from_cart_"+id_product+".json";
            var panier = "";
            var cartElements = "";
                
            var its = that;
            
            $.ajax({
                url: removeFromCart_url,
                dataType: 'json',
                
                complete: function(){
                    
                },
                success: function(data){
                    
                    $.ajax({
                        url: data_url+"profile/cart/get_cart.json",
                        dataType: 'json',
                        complete: function(){
                            
                        },
                        success: function(data){
                            
                            if(data['status']==true){
                                for(var i=0; i<data['data']['products'].length; i++) {
                                    cartElements = cartElements + createCartResults(data['data']['products'][i]);
                                }
                                
                                //panier = '<a href="#emptyCart" class="emptyCart">Vider le panier</a>'
                                panier = cartElements+'<div class="bottom_cart_container"><div class="total_price">Total: '+data['data']['total_price']+'\u20ac</div><a href="'+front_url+'shop.php" class="endCart" id="processCart">Valider la commande</a></div>';
                                fillCartDom(panier);
                                that.set('content.text', $('#panier_display'));
                                $('#cart').qtip("render");
                            }
                            else {
                                panier = "panier vide";
                                fillCartDom(panier);
                                that.set('content.text', $('#panier_display'));
                                $('#cart').qtip("render");
                            } 
                            
                            deleteElementFromCart(that);
                            
                        },
                        error: function(){
                            console.log("ajax_error");
                        }
                    })
                    
                    if(data['status']==true)
                        animateCart(data["numOfItems"]);
                },
                error: function(){
                    console.log("ajax_error");
                }
            })
        },
        
        "sendContact": function(subject, subject_name, text, mail, name) {
            $.ajax({
                url: data_url+"profile/contact/sendcontact|"+subject+"|"+subject_name+"|"+text+"|"+mail+"|"+name+".json",
                dataType: 'json',
                complete: function() {
                    
                },
                success: function() {
                    
                },
                error: function() {
                    console.log("ERROR in search::ajax::sendComments");
                }
            })
        }
        
    };
    
    return controller;
})();