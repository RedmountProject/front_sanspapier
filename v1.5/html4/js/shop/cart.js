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

var deleteElementFromCart = function() {
    $(".delete_cartElement").each(function(){
        var link_id = ($(this).attr("id")).split("_")[1];
        
        $(this).click(function(){
            AjaxController.removeElementFromCart(link_id);
        });
    });
}



var endSelec = function() {
    $("#end_button").click(function(){
        
        if ($('#agreement_checkbox').is(":checked"))
            AjaxController.decideBuyProcess();
        else alert("Veuillez accepter les conditions générales de vente afin de pouvoir poursuivre votre commande.");
    });
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