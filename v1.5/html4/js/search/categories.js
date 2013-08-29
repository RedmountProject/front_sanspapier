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
function changeCat(replace, onglet_name) {
    
    switch(onglet_name){
        case 'Bibliographie' :
            $('#biblio_title').text("Oeuvres de "+replace);
            break;
        case 'Genre' :
            $('#biblio_title').text("Oeuvres du genre "+replace);
            break;
        case 'Editeur' :
            $('#biblio_title').text("Oeuvres éditées chez "+replace);
            break;
    }
    
}



function callContent(id){
    var backColor = $("#call_"+id).css('background-color');

    if(id==4){
        $('#empty_biblio').show();
        $(".onglet").stop().animate({
            'height': '25px',
            'margin-top': '0px'
        }, 0);
        $("#call_4").stop().animate({
            'height': '35px',
            'margin-top': '-10px'
        },100);
    }
    
    else{
        $('#empty_biblio').hide(0);
        AjaxController.saveLastCustomId(id);
    }
    
    $('.change_col').css({
        'background-color': backColor
    });
    $('.mos_container').css({
        'background-color': backColor
    });
    
    $("#lib_"+id).show();
    $("#title_"+id).show();
    switch(parseInt(id)){
        case 0:
            AjaxController.bypassCustomALaUneCalling(window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
        
        case 1:
            AjaxController.bypassCustomPublishersCalling(window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
        
        case 2:
            AjaxController.bypassCustomGenresCalling(window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
        
        case 3:
            AjaxController.bypassCustomKeywordsCalling(window.sanspapier.filters.price,window.sanspapier.filters.epub,window.sanspapier.filters.pdf,window.sanspapier.filters.mobile,window.sanspapier.filters.drm);
            break;
    }
    
    for(var i=0; i<6; i++){
        if(i!=id){
            $("#title_"+i).hide(0);
            $("#lib_"+i).hide(0);
        }
    }

}

function spread(){
    
    var parent = "";
    
    var gab_time = 300;
    var cont_time = 400;
    var fast = 200;
    
    $(".activateSpread").click(function(){
        var link_id = ($(this).attr("id")).split("_")[1];
        var lib_id = ($(this).attr("id")).split("|")[0];
        
        parent = " .column"+link_id;
        
        
        for(var i=1;i<6;i++){
            if(i!=link_id)
                col_1(" .column"+i,"#lib_"+lib_id,lib_id,i,gab_time,cont_time,fast); //CLOSE EVERY COLUMN window.sanspapier.filters IS NOT THE COL TO SPREAD       
        }
        
        if(link_id==2)
            var margin = 0;
        else if(link_id>2 && link_id!=5)
            margin = -192 * (link_id-2);
        else if(link_id==5)
            margin = -192 * 2;
        
        if($("#title_"+lib_id+parent).width()==172){
            $("#lib_"+lib_id).animate({
                'margin-left' : margin+"px"
            }, gab_time);
            
            $("#title_"+lib_id).animate({
                'margin-left' : margin+"px"
            }, gab_time);
            
            col_3(parent,"#lib_"+lib_id,lib_id,link_id,margin,gab_time,cont_time);
        }
        
        else{
            $("#lib_"+lib_id).animate({
                'margin-left' : '0px'
            }, cont_time);
            $("#title_"+lib_id).animate({
                'margin-left' : '0px'
            }, cont_time);
            
            col_1(parent,"#lib_"+lib_id,lib_id,link_id,gab_time,cont_time,fast);
        }
        
        bind_classes_until_offset(link_id);
    
    });

}

function bind_classes_until_offset(offset) {
    mytutorial.unbind_tuto_category();
    
    for(var i=1;i< 6;i++){
        $('#title_0 .column'+i).removeClass('tutoriable');
    }
    
    var limit = parseInt(offset);
 
    
    switch (limit) {
        case 1:
            for(var z=1;z< limit + 2;z++){
                $('#title_0 .column'+z).addClass('tutoriable');
            }    
            break;
        case 5:
            for(var z=1;z< limit;z++){
                $('#title_0 .column'+z).addClass('tutoriable');
            }
            break;
        default:
            for(var z=1;z< limit + 1;z++){
                $('#title_0 .column'+z).addClass('tutoriable');
            }
            break;
    } 
    
    mytutorial.bind_tuto_category();
}

function col_3(parent,child,lib_id,id,gab_time,cont_time){
    var sp = window.sanspapier.config;
    
    $("#title_"+lib_id+parent).animate({
        'width' : '552px'
    },gab_time);
    $("#lib_"+lib_id+parent).animate({
        'width' : '552px'
    },gab_time);
    
    $(child+" .col_"+id).animate({
        'width' : '552px'
    }, cont_time);
    
    $(child+" .col_"+id+" .titre_auteur").animate({
        'margin-left' : '5px',
        'width' : '290px',
        'min-height' : '65px'
    }, cont_time);
    
    $(child+" .col_"+id+" .titreMo").animate({
        'width' : '280px'
    }, cont_time);
    
    $(child+" .col_"+id+" .info_content").animate({
        'width' : '552px'
    }, cont_time);
    
    $(child+" .col_"+id+" .infos_achatMo").animate({
        //                'margin-left' : '10px',
        //                'margin-top' : '5px'
        'float':'right'
    }, cont_time);
    
    $(child+" .col_"+id+" .info_buttonMo").animate({
        //                'width' : '290px',
        //                'margin-left' : '10px'
        'float':'right'
    }, cont_time);
    
    $(child+" .col_"+id+" .imageMo").animate({
        'height' : '360px',
        'margin-bottom':'0px'
    }, cont_time);
    
    $(child+" .col_"+id+" .infosMo").show();
    $(child+" .col_"+id+" .textMo").show();
    $(child+" .col_"+id+" .formatsMo").hide();
    
    jQuery.each($("#lib_"+lib_id+parent+" .fiche_mosaique"), function() {     
        var fiche = $(this).attr('id');
        var product_id = fiche.split('_')[1];
        var publisher_id = fiche.split('__')[1];
        var image = this.children[0];
        
        $(image).html('<img tooltip="'+product_id+'" src="'+sp.images_url+publisher_id+'/'+product_id+'/'+product_id+'_fc_Bbis.jpg" >');
    });
}
       

function col_1(parent,child,lib_id,id,gab_time,cont_time,fast){
    var sp = window.sanspapier.config;
    
    $("#title_"+lib_id+parent).animate({
        'width' : '172px'
    },gab_time);
    $("#lib_"+lib_id+parent).animate({
        'width' : '172px'
    },gab_time);
    
    $(child+" .col_"+id).animate({
        'width' : '172px'
    }, gab_time);
    
    $(child+" .col_"+id+" .titre_auteur").animate({
        'margin-left' : '0px',
        'width' : '162px',
        'padding':'5px',
        'min-height' : '89px'
    }, gab_time);
    
    $(child+" .col_"+id+" .titreMo").animate({
        'width' : '162px'
    }, fast);
    
    $(child+" .col_"+id+" .infos_achatMo").animate({
        //                'width' : '85px',
        //                'margin-left' : '0px',
        //                'margin-top' : '10px'
        }, gab_time);
    
    $(child+" .col_"+id+" .bookSheetIdLink").animate({
        //                'margin-left' : '0px'
        }, gab_time);
    
    $(child+" .col_"+id+" .imageMo").animate({
        'height' : '257px',
        'margin-bottom':'3px'
    }, gab_time);    
    
    $(child+" .col_"+id+" .info_content").animate({
        'width' : '172px'
    }, fast);
    
    $(child+" .col_"+id+" .infosMo").hide();
    $(child+" .col_"+id+" .textMo").hide();
    $(child+" .col_"+id+" .formatsMo").show();
    
    jQuery.each($("#lib_"+lib_id+parent+" .fiche_mosaique"), function() {     
        var fiche = $(this).attr('id');
        var product_id = fiche.split('_')[1];
        var publisher_id = fiche.split('__')[1];
        var image = this.children[0];
        
        $(image).html('<img tooltip="'+product_id+'" src="'+sp.images_url+publisher_id+'/'+product_id+'/'+product_id+'_fc_B.jpg" >');
    });
}

function hideColumn(id)
{
    $('#call_'+id).animate({
        'opacity' : '0'
    }, 300, function() {
        $('#call_'+id).css({
            'display':'none'
        });
    });
}

function displayNonSearchableBookInfos(type, bookInfos) {
    var author = '';
    if(bookInfos['author_firstname'] !== undefined)
        author += bookInfos['author_firstname'][0]+' ';
    
    author += bookInfos['author_lastname'][0];
    var content = "<div style='font-weight:bold;'><a href='#!booksheet_"+bookInfos['product_id']+"'>Cliquez ici</a> pour accéder à la fiche du livre \""+bookInfos['title']+"\" de "+author+" !</div>";
    $("#bottomTarget").html(content);
    switch(type)
    {
        case "booksheet":
            $("#bottomTarget").css({
                'display':'block',
                'margin-top':'-155px',
                'font-size':'20px'
            });
            break;
        case "booksheet_target":
            $("#bottomTarget").css({
                'display':'block',
                'margin-top':'-25px',
                'font-size':'16px'
            });
            break;
        default:
            break;
    }
}

function hideNonSearchableBookInfos() {
    $("#bottomTarget").css({
        'display':'none'
    });
}