
/*
var fillForm = function(html){
    //showHandlers();
    $('#form_content').html(html);
}*/
var fillLoginForm = function(html){
    //showHandlers();
    $('#form').html(html);
    $('#form').append('<div id="forgottenPasswordZone"><span id="registerFormLabel">Mot-de-passe oublié ?</span><span id="forgotPasswordForm">Cliquez ici!</span></div>');
    $('#form').append('<div id="registerZone"><span id="registerFormLabel">Vous n\'avez pas de compte? </span><span id="registerForm">Cliquez ici!</span></div>');
    $('#registerForm').click( function(){
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
    
    $('#mon_compte').click( function() {
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
            fixed: true,
            event: "unfocus",
            delay: 600
                
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
            }
        } 
    });
        
//$('#mon_compte').qtip("render"); 
    
}
