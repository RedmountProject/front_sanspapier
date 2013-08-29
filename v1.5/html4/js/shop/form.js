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
    console.log('in call:'+isFromExternal);
    //Initialise the container with the html structure
    $('#form').html('<div id="formFromExternalWebsite"></div><div id="formNeedLogin"><div id="accountGeneralHeader"></div><div id="existingAccountHeader"></div><div id="createAccountHeader"></div></div><div class="clear"></div><div id="formLogin"></div><div id="formCreateAccount"></div>');
    if(isFromExternal == 1) {
        $('#form #formFromExternalWebsite').append('<img src="http://numeriklirestore.com/images/logo_sp.png" style="position: absolute; width: 126px; height: 99px; top: 10px; left: 10px;">');
        $('#form #formFromExternalWebsite').append('<div>Cher lecteur, vous venez de faire une sélection de titres chez notre partenaire Numeriklivres.<br />L\'étape d\'achat se fait ici, sur la librairie 100% numérique Sanspapier.com. Suite à votre achat, vous retrouverez vos fichiers dans votre espace personnel sur Sanspapier.com, où vous pourrez télécharger vos ouvrages.<br /><br />Nous vous remercions pour la confiance que vous portez en Numeriklivres et en Sanspapier.com, bonne lecture !</div>');
    }
    
    $('#form #formNeedLogin #accountGeneralHeader').append('<div id="infoNeedRegister">Vous devez vous identifier pour poursuivre votre commande.</div>');
    $('#form #formNeedLogin #existingAccountHeader').append('<div>Vous avez déjà un compte sur sanspapier.com ?<br /><span>Connectez-vous !</span></div>');
    $('#form #formNeedLogin #createAccountHeader').append('<div>Vous êtes nouveau sur sanspapier.com ?<br /><span> Créez votre compte !</span></div>');
    $('#formLogin').append(html);
    $('#formLogin').append('<div id="forgottenPasswordZone"><span id="forgotPasswordFormLabel">Si vous avez oublié votre mot de passe, </span><span id="forgotPasswordForm">cliquez ici!</span></div>');
    $('#forgotPasswordForm').click( function() {
        AjaxController.getPasswordResetterForm(fillForgotPasswordForm);
    });
}

var fillRegisterForm = function(html){
    $('#form #formCreateAccount').append(html);
}

var fillForgotPasswordForm = function(html){
    $('#form').html('<div id="titleResetPassword">Réinitialisation de votre mot de passe</div>');
    $('#form').append('<div id="textResetPassword">En remplissant ce formulaire, vous recevrez un mail vous permettant de réinitialiser votre mot de passe en toute sécurité.</div>');
    $('#form').append(html);
    $('#form').append('<div id="loginForm"><span>Retour</span></div>');
    $('#loginForm').click( function(){
        AjaxController.init_is_logged();
    });
}

var fillPrefForm = function(html){
    $('#form').html('<div id="shopAlertIncompleteProfile">Vous devez compléter vos informations personnelles pour pouvoir continuer votre commande :</div>');
    $('#form').append(html);
    $('#_submit').val('Continuez votre commande');
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



var bindClickHandlers = function() {
    $('#loginForm').click( function(){
        AjaxController.getLoginForm(fillLoginForm);
    });
    $('#registerForm').click( function(){
        AjaxController.getRegisterForm(fillRegisterForm);
    });
    $('#forgotPasswordForm').click( function(){
        AjaxController.getPasswordResetterForm(fillForgotPasswordForm);
    });
}

var hideHandlers = function(){
    $('#loginForm').hide();
    $('#registerZone').hide();
    $('#forgotPasswordZone').hide();
}

var showHandlers = function(){
    $('#loginForm').show();
    $('#registerZone').show();
    $('#forgotPasswordZone').show();
}


var userForm = function() {
    
    $('#mon_compte').qtip({
        content: {
            text: "Connectez-vous pour accéder à votre espace personnel"
        },
        show:{
            event: true,
            target: $('#mon_compte')
        },
        
        hide: {
            fixed: true,
            delay: 600
                
        },
        position: {
            at: "bottom right",
            my: "top right",
            adjust: {
                
            }
                
        },
        style: {
            classes: 'windows',
            tip: {
                corner: false
            }
        },
        events: { 
            show: function(e, api) { 
                $.fn.qtip.zindex = 10000; 
            }
        } 
    });
}