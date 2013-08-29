
/*
var fillForm = function(html){
    //showHandlers();
    $('#form_content').html(html);
}*/
var fillLoginForm = function(html){
    //showHandlers();
    $('#form').html(html);
    $('#form').append('<div id="registerZone"><span id="registerForm">Créer un compte en 3 clics!</span></div>');
    $('#form').append('<div id="forgottenPasswordZone"><span id="forgotPasswordForm">Mot-de-passe oublié ? Cliquez ici!</span></div>');
    $('#registerForm').click( function(){
        AjaxController.logAction('Formulaire_CreateAccount');
        AjaxController.getRegisterForm(fillRegisterForm);
    });
    $('#forgotPasswordForm').click( function(){
        AjaxController.getPasswordResetterForm(fillForgotPasswordForm);
    });
    

}

var fillRegisterForm = function(html){
    $('#form').html(html);
    $('#form').append('<div><span id="loginForm">Retour</span></div>');
    $('#loginForm').click( function(){
        AjaxController.getLoginForm(fillLoginForm);
    });
}

var fillForgotPasswordForm = function(html){
    $('#form').html(html);
    $('#form').append('<div><span id="loginForm">Retour</span></div>');
    $('#loginForm').click( function(){
        AjaxController.getLoginForm(fillLoginForm);
    });
}

var connected = function(html){
    $("#form").html(html);
    
    $("#logout").click(function(){
        AjaxController.logOut();
        $('#form').html('<p class="deconnected">Déconnecté</p>');
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
    
    $('#mon_compte').click( function() {
        AjaxController.logAction('MonCompte_Non_Loggé');
        AjaxController.is_logged();
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
                mytutorial.state = false;
                mytutorial.release();
                $.fn.qtip.zindex = 100010; 
            },
            hide: function() {
                mytutorial.state = true;
            }
        } 
    });
}
