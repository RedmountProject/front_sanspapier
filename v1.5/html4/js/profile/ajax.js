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
    var sp = window.sanspapier.config;
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

        "is_logged": function() {
    
            $.ajax({
                url: data_url+"profile/ajax_is_logged.json",
                dataType: 'json',

                complete: function(){
            
                },

                success: function(data){
                    if(data['status']==false){
                        window.location = window.sanspapier.config.front_url+"search.php";
                        alert("Connectez-vous afin de pouvoir accéder à votre espace personnel. Cliquez sur 'Mon compte'.");
                    }
                    
                    else{
                        $("#mes_achats").show(500);
                        $("#infos_perso").show(500, function(){
                            AjaxController.infos_perso(false);
                        });
                        $("#mes_prefs").show(500, function(){
                            AjaxController.getPrefsForm();
                        })
                    }
                },
                            
                error: function(){
                    console.log("ajax_error");
                }
            });
        },
                
        "logOut" : function() {
            var logout = data_url+'profile/ajax_logout.json';
            
            $.ajax({
                url: logout,
                dataType: "json",
                
                complete: function() {
                },
                
                success: function() {
                    window.location = window.sanspapier.config.front_url+"search.php";
                    
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::logOut");
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
                    var user_name="";
                    if(data['pref']['firstname']==undefined && data['pref']['lastname']==undefined)
                        user_name = data['user'];
                    else
                        user_name = data['pref']['firstname']+" "+data['pref']['lastname'];
                    
                    callback('<div id="user_name">Bonjour '+user_name+'</div><br\><span id="logout">Se déconnecter</span>');
                },
                
                error: function() {
                    console.log("ERROR in search::ajax::connected");
                }
            })
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
        
        "createAcount": function(callback) {
            
            $.ajax({
                url: data_url+"register",
                dataType:'html',
                
                complete: function(){
                    
                },
                
                success: function(data){
                    callback(data);
                },
                
                error: function(){
                    
                }
            })
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
                
                },
                success: function(data){
                    callback(data);
                },
                error: function(){
                    console.log("password resetter ajax_error");
                }
            });
        },
        
        "infos_perso": function(isReduced) { 
            $.ajax({
                
                url: data_url+"profile/preferences/form",
                dataType: 'html',

                complete: function(){
                    AjaxController.modif_mdp();
                },

                success: function(data){
                    sp.infos_html = '<h1>Mes informations personnelles</h1>'+data;
                },
                
                error: function(){
                    console.log("ERROR in profile::ajax::infos_perso");
                }
            });
        },
        
        "modif_mdp": function() {
    
            $.ajax({
                url: data_url+"profile/change_password/",
                dataType: 'html',

                complete: function(){
                    $("#infos_perso").html(sp.infos_html + sp.mdp_html);
                },

                success: function(data){
                    sp.mdp_html = data;
                },
                            
                error: function(){
                    console.log("ERROR in profile::ajax::modif_mdp");
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

                },
                
                error: function() {
                    console.log("ERROR in profile::ajax::prefIsComplete");
                }
                
            });
        },
        
        "mes_achats": function(){
            var achats_url = data_url+'profile/getTotalProductsShelf.json';
            $.ajax({
                url:achats_url,
                dataType:'json',
                
                complete: function(){
                    $("#mes_achats").html(sp.achats_html);
                    genPDF();
                    reduce_order();
                },
                
                success: function(data){

                    if(data['orders'].length != 0){
                        var orders = data['orders'];
                        sp.achats_html = '<h1>Mes achats</h1>';
                        
                        for(var i=0; i< orders.length; i++){
                            var order = orders[i];
                            
                            var datetime = order['order_date'].split('T');
                            var date = datetime[0];
                            var time = datetime[1].split('+')[0];
                            
                            sp.achats_html += '<div class="order_container" id="orderCont_'+order['dilicom_transaction_id']+
                            '"><div class="dilicom_order_number" id="orderNum_'+order['dilicom_transaction_id']+
                            '">Commande n\&deg; : '+order['dilicom_transaction_id']+' en date du '+date+' à '+ time +'</div>';
                            if(order['products']) {   
                                sp.achats_html += displayProductsShelf(order['products'], order['dilicom_transaction_id']);
                            }
                            sp.achats_html += '<div class="shelfElement_total_price">Prix total : '+parseFloat(order['total_price']).toFixed(2)+' \u20ac</div>';
                            sp.achats_html += '<a href="#generatePDF" class="generatePDF" id="generatePDF_'+
                            order['dilicom_transaction_id']+'">Téléchargez votre facture au format PDF</a></div>';
                        }                        
                    }
                    else{
                        sp.achats_html = '<h1>Mes achats</h1><p style="margin: 10px;">Aucune commande enregistrée</p>';
                    }
                        
                },
                
                error: function(){
                    
                }
            })
        },
        
        //RETURN AND DISPLAY DATA FOR BOOK SHEET
        "bookSheet": function(book_id) {
            var sheet_url = data_url+"books/sheet_"+book_id+".json";
            $.ajax({
                url: sheet_url,
                dataType: 'json',

                complete: function(){
                    
                    $(document.body).qtip('option', 'content.text', $('#booksheet').clone());
                    var edition_slider = new spSlider('editions_slider',500,100,window.sanspapier.booksheet.nb_otherEditors);
                    var auteur_slider = new spSlider('auteur_slider',500,100,window.sanspapier.booksheet.nb_sameAuthor);
                    
                    add_to_cart();
                    update_bookSheet_targets();
                },
                
                success: function(data){
                    parseJsonForBookSheet(data, 'booksheet');
                    
                    window.sanspapier.booksheet.nb_sameAuthor = data['sameAuthor'].length-1;
                    window.sanspapier.booksheet.nb_otherEditors = data['otherEditors'].length-1;
                    
                },
                
                error: function(){
                    console.log("booksheet ajax_error");
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
        
        
        
        "getPrefsForm": function(callback){
            var pref_url = data_url+"profile/preferences/customization_form";
            $.ajax({
                url: pref_url,
                dataType: 'html',

                complete: function(){
                    
                },
                
                success: function(data){
                    $("#mes_prefs").html('<h1>Mes Préférences</h1>'+data);
                },
                
                error: function(){
                    
                }
                        
            });
        },
        
        "generatePDF": function(order_id){
            var gen_pdf_url = data_url+"profile/order_confirmation/generatePDF_"+order_id+".php";

            $.ajax({
                url: gen_pdf_url,
                dataType: 'html',
                
                complete: function(){
                    
                },
                
                success: function(data){
                    window.open(
                        gen_pdf_url,
                        '_blank' 
                        );
                            
                },
                
                error: function(){
                    console.log("GENERATE PDF AJAX ERROR");
                }
            })
            
        }
        
    }
    
    return controller;
    
})();
