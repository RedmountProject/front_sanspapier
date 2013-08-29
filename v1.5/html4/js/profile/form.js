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
var fillLoginForm = function(html){
    //showHandlers();
    $('#infos_perso').html('<p style="font-size:20px; text-decoration: underline; margin-bottom: 20px; padding:5px;">Identifiez-vous</p>'+html);
    
    $('#infos_perso').append('<div id="forgottenPasswordZone"><span id="registerFormLabel">Mot-de-passe oublié ?</span><span id="forgotPasswordForm">Cliquez ici!</span></div>');
    $('#infos_perso').append('<div id="registerZone"><span id="registerFormLabel">Vous n\'avez pas de compte? </span><span id="registerForm">Cliquez ici!</span></div>');
    $('#registerForm').click( function(){
        AjaxController.getRegisterForm(fillRegisterForm);
    });
    $('#forgotPasswordForm').click( function(){
        AjaxController.getPasswordResetterForm(fillForgotPasswordForm);
    });
}

var fillRegisterForm = function(html){
    $('#infos_perso').html(html);
    $('#infos_perso').append('<div><span id="loginForm">s\'identifier</span></div>');
    $('#loginForm').click( function(){
        AjaxController.getLoginForm(fillLoginForm);
    });
}

var fillForgotPasswordForm = function(html){
    $('#infos_perso').html(html);
    $('#infos_perso').append('<div><span id="loginForm">s\'identifier</span></div>');
    $('#loginForm').click( function(){
        AjaxController.getLoginForm(fillLoginForm);
    });
}


var fillCustomForm = function(html){
    $("#mes_prefs").html(html);
    AjaxController.getPrefsForm(callback)
}

var connected = function(html){
    $("#form").html(html);
    
    $("#logout").click(function(){
        AjaxController.logOut();
        $('#form').html('<p style="font-size:16px; font-weight: bold; position:relative; float: right; margin:10px;">Déconnecté</p>');
    });
                    
    $("#perso").click(function(){
        window.location = window.sanspapier.config.front_url+"profile.php";
    });
}


var userForm = function() {
    
    $('#mon_compte').click( function() {
        AjaxController.connected(connected);
    });
    
    $('#mon_compte').qtip({
        content: {
            text: $('#form')
        },
        show:{
            event: 'click'
        },
        
        hide: {
            fixed: false,
            event: "click unfocus",
            delay: 0
                
        },
        position: {
            at: "bottom right",
            my: "top right",
            adjust: {
                
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
                
                $.fn.qtip.zindex = 100010; 
            },
            hide: function() {
                
            }
        } 
    });
            
}
