/*  Copyright (C) 2013 GAYON Matthieu

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
var dynamicTuto = function() {
    
    var events = new Object();
    var idDynamicZone = '#tutorial_container .didactitiel_content';
    var that = this;
    var defaultTuto = 'tuto_search_bar';
    var scrolled = false;
    this.turning = false;
    
    this.state = false;
    
    ///// default tutos
    var tuto_search_bar;
    var tuto_livre_pivot;

    window.onscroll = function() {
       var checkPath = idDynamicZone + ' .tuto_content';      
       if($(window).scrollTop() > 330){
           scrolled = true;
           if ($(checkPath).hasClass('tuto_livre_pivot')) {
               that.release();
           }
       }
       else scrolled = false;
    }
    
    this.pushEvents = function(key) {      
        var mydispatcher = new dispatcher(key);
        events[key] = mydispatcher;    
        return events[key];
    } 
    
    
    
    var dispatcher = function(key) {       
        var mykey = key; 
        this.displayTuto = function() {
            
            if (that.state) {
                var checkPath = idDynamicZone + ' .tuto_content';          
                if(!$(checkPath).hasClass(key) && !that.turning) {
                    var tuto_to_display = $('.'+mykey).clone();
                    $(idDynamicZone ).html(tuto_to_display );
                    $(idDynamicZone+' .'+mykey).show();
                }
            }
        } 
        this.release = function() {
            if (that.state) {
                var empty = $('#tuto_empty').html();
                $(idDynamicZone).html(empty);
            }
        }
        return this;
    }
    
    this.release = function(){
         var empty = $('#tuto_empty').html();
         $(idDynamicZone).html(empty);
    }
    
    this.bindActivator = function() {
        $("#tuto_on_off .tuto_button").click(function(){
            if (that.state){
                AjaxController.onOffTuto("false");
                that.state = false;
                $("#tuto_on_off .tuto_button").css('background',"url('http://www.sanspapier.com/images/icone_Off21.png') 0px 0px no-repeat");
                that.release();
            } 
            else {
                AjaxController.onOffTuto("true");
                that.state = true;
                $("#tuto_on_off .tuto_button").css('background',"url('http://www.sanspapier.com/images/icone_On21.png') 0px 0px no-repeat");
                that.check_dom_state();
            }
        });
    }
    
    ///// default tutos
    //tuto_search_bar = new that.pushEvents('tuto_barre_de_recherche');
    tuto_livre_pivot = new that.pushEvents('tuto_livre_pivot');
    
    var tuto_category = new that.pushEvents('tuto_category');
    
    this.declareDomTutorialsElements = function() {

//        $('#middle_search_bar').mouseenter(function() {
//            tuto_search_bar.displayTuto();
//        }).mouseleave(function() {
//            //tuto_search_bar.release(); 
//        }); 
        
        var tuto_pagination = new that.pushEvents('tuto_pagination');
        $('#result_pagination ').mouseenter(function() {
            tuto_pagination.displayTuto(); 
        }).mouseleave(function() {
            tuto_pagination.release(); 
        });
        
        that.bind_tuto_category();
        
        var tuto_biblio = new that.pushEvents('tuto_biblio');
        $('#call_4').mouseenter(function() {
            tuto_biblio.displayTuto(); 
        }).mouseleave(function() {
            tuto_biblio.release(); 
        });
        
        var tuto_onglets_perso_editeur = new that.pushEvents('tuto_onglets_perso_editeur');
        var tuto_onglets_perso_genre = new that.pushEvents('tuto_onglets_perso_genre');
        var tuto_onglets_perso_keyword = new that.pushEvents('tuto_onglets_perso_keyword');
        $('#call_3').mouseenter(function() {
            tuto_onglets_perso_keyword.displayTuto(); 
        }).mouseleave(function() {
            tuto_onglets_perso_keyword.release(); 
        });
        $('#call_2').mouseenter(function() {
            tuto_onglets_perso_genre.displayTuto(); 
        }).mouseleave(function() {
            tuto_onglets_perso_genre.release(); 
        });
        $('#call_1').mouseenter(function() {
            tuto_onglets_perso_editeur.displayTuto(); 
        }).mouseleave(function() {
            tuto_onglets_perso_editeur.release(); 
        });
        
        var tuto_prix = new that.pushEvents('tuto_prix');
        $('#filtres .prix_tuto').mouseenter(function() {
            tuto_prix.displayTuto(); 
        }).mouseleave(function() {
            tuto_prix.release(); 
        });
        
        var tuto_epub = new that.pushEvents('tuto_epub');
        $('#filtres .epub_tuto').mouseenter(function() {
            tuto_epub.displayTuto(); 
        }).mouseleave(function() {
            tuto_epub.release(); 
        });
        
        var tuto_pdf = new that.pushEvents('tuto_pdf');
        $('#filtres .pdf_tuto').mouseenter(function() {
            tuto_pdf.displayTuto(); 
        }).mouseleave(function() {
            tuto_pdf.release(); 
        });
        
        var tuto_mobile = new that.pushEvents('tuto_mobile');
        $('#filtres .mobile_tuto').mouseenter(function() {
            tuto_mobile.displayTuto(); 
        }).mouseleave(function() {
            tuto_mobile.release(); 
        });
        
        var tuto_DRM = new that.pushEvents('tuto_DRM');
        $('#filtres .DRM_tuto').mouseenter(function() {
            tuto_DRM.displayTuto(); 
        }).mouseleave(function() {
            tuto_DRM.release(); 
        });
        
        var tuto_aide_en_ligne = new that.pushEvents('tuto_aide_en_ligne');
        $('#aide_en_ligne').mouseenter(function() {
            tuto_aide_en_ligne.displayTuto(); 
        }).mouseleave(function() {
            tuto_aide_en_ligne.release(); 
        });
        
        var tuto_mon_compte = new that.pushEvents('tuto_mon_compte');
        $('#mon_compte').mouseenter(function() {
            tuto_mon_compte.displayTuto(); 
        }).mouseleave(function() {
            tuto_mon_compte.release(); 
        });
    }
    
    this.update_tuto_button  = function() {
        if (that.state) {
            $("#tuto_on_off .tuto_button").css('background',"url('http://www.sanspapier.com/images/icone_On21.png') 0px 0px no-repeat");
        }
        else {
            that.release();
            $("#tuto_on_off .tuto_button").css('background',"url('http://www.sanspapier.com/images/icone_Off21.png') 0px 0px no-repeat");
        } 
    }
    
    this.check_dom_state = function() {
        var cibleState = $('#cible').css('display');
        //var barState = $('#middle_search_bar_container').css('display');
        
        if (that.state) {
            if (cibleState == 'block') {
                if (!scrolled) {
                    tuto_livre_pivot.displayTuto();
                }
            }
            else that.release();
        }
        else {
            that.release();
        } 
    }
    
    
    var tuto_recherche_auteur = new that.pushEvents('tuto_recherche_auteur');
    
    this.bind_tuto_recherche = function() {
        $('.authorName').unbind('mouseenter');
        $('.authorName').unbind('mouseleave');
        
        $('.authorName').mouseenter(function() {
            tuto_recherche_auteur.displayTuto(); 
        }).mouseleave(function() {
            tuto_recherche_auteur.release(); 
        });
    }
    
    this.bind_tuto_category = function() {
        
        $('.tutoriable').mouseenter(function() {
            tuto_category.displayTuto(); 
        }).mouseleave(function() {
            tuto_category.release(); 
        });
        
    }
    
    this.unbind_tuto_category = function() {
        $('.tutoriable').unbind('mouseenter');
        $('.tutoriable').unbind('mouseleave');
        //tuto_category.release(); 
    }
    
    
       
}

function displayTuto(on_off){
    AjaxController.onOffTuto(String(on_off));
    window.sanspapier.tutorial_OnOff = String(on_off);
}


/////// declaration here of the main tutorial object 

var mytutorial = new dynamicTuto();    ///// object that handle the tutorials 



