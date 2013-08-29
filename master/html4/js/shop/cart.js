
var deleteElementFromCart = function() {
    $(".delete_cartElement").each(function(){
        var link_id = ($(this).attr("id")).split("_")[1];
        
        $(this).click(function(){
            AjaxController.removeElementFromCart(link_id);
        });
    });
}



var endSelec = function() {
//    $("#end_button").click(function(){
//        
//        if ($('#agreement_checkbox').is(":checked"))
//            AjaxController.decideBuyProcess();
//        else alert("Veuillez accepter les conditions générales de vente afin de pouvoir poursuivre votre commande.");
//    });
}


function genPDF(){
    var data_url = window.sanspapier.config.data_url;
    
    $(".generatePDF").click(function(){
        var order_id = $(this).attr("id").split('_')[1];
        var gen_pdf_url = data_url+"profile/order_confirmation/generatePDF_"+order_id+".html";
        
        window.open(
            gen_pdf_url,
            '_blank' 
            );
        
    });
}