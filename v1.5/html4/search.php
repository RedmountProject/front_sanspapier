<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <meta name="Description" content="Sanspapier.com - Moteur de recommandation d'ebooks gratuits. Téléchargez gratuitement les ebooks du domaine public !" />
        <meta name="google-site-verification" content="59RfwgrZkrZwObbhPOjXtDlY-3BfwI5Tz_vgD_BBN4I" />
        <title>Sanspapier.com - Moteur de recommandation d'ebooks gratuits</title>
        <link rel="Shortcut Icon" href="images/favicon.ico" type="image/x-icon" />
        <?php include($_SERVER['DOCUMENT_ROOT'] . '/header_asset.php'); ?>

        <script type="text/javascript" src="data/js/libs_comp.js"></script>
        
        <script type="text/javascript">
            function canvasDetection() {   
                return !!window.CanvasRenderingContext2D;
            }
            if (canvasDetection()) {
                $('<link rel="stylesheet" type="text/css" href="<?php autoVer('css/search_html5_comp.css','css'); ?>" />').appendTo('head');
            } else {
                $('<link rel="stylesheet" type="text/css" href="<?php autoVer('css/search_html4_comp.css','css'); ?>" />').appendTo('head');
            }
            
        </script>

        <link rel="stylesheet" href="<?php autoVer('css/global_comp.css','css'); ?>" type="text/css" media="screen" />
        <script type="text/javascript" src="<?php autoVer('js/global_comp.js','js'); ?>"></script>
        
        <script type="text/javascript">
            var canvasHtml = '<canvas id="canvas" width="960" height="550"></canvas>';
            if (canvasDetection()) {
                var canvasHtml = '<canvas id="canvas" width="960" height="550"></canvas>';
                var file = "<?php autoVer('js/search_html5_comp.js','js'); ?>";
                $LAB
                .script(file).wait(function(){
                    $('#cible_feature').html(canvasHtml); 
                    $('#search_result').css({'display':'block','position':'absolute'});
                    $('#result_pagination').css({'top':'-30px','margin-top':'0px'});                     
            
                    window.sanspapier.myeasel = new easel();   ////// drive the html5 cible!!!!
            
                    window.sanspapier.myeasel.ajax = AjaxController;
                    init_after();
                }); 
                
            } else {
                var file = "<?php autoVer('js/search_html4_comp.js','js'); ?>";
                $LAB
                .script(file).wait(function(){
                    rafael();
                    init_after();
                });
            }
        </script>


        <script type="text/javascript" src="js/analytics.js"></script>
    </head>

    <body>
        <div id="tuto">
            <div class="tuto_open" id="tuto_0"></div>
            <div class="tuto_open" id="tuto_1"></div>
            <div class="tuto_open" id="tuto_2"></div>
            <div class="tuto_open" id="tuto_3"></div>
            <div class="tuto_open" id="tuto_4"></div>
            <div class="tuto_open" id="tuto_5"></div>
            <div class="tuto_open" id="tuto_6"></div>
            <div class="tuto_open" id="tuto_7"></div>
            <div class="tuto_open" id="tuto_8"></div>
        </div>

        <!--Header-->
        <div class="container_5">

            <div id="sp">
                <div class="container_5" id="header">

                    <div class="grid_1" style="height: 100px;">
                        <div id="logo" title="Sanspapier.com, Moteur de recommandation d'ebooks gratuits">
                            <p>
                                <img id="logo_img" src="images/logo_sp.png" alt="" title="" />
                            </p>
                        </div>
                    </div>

                    <div class="grid_3" id="slogan">
                        Moteur de recommandation d'ebooks gratuits
                    </div>

                    <div class="grid_3" id="search_bar_top">
                        <form id="search_action" action="javascript:" method="get" class="alt">
                            <fieldset>
                                <div class="center_bar">
                                    <input id="search" type="text" name="search" />
                                    <input id="search_hidden" type="hidden" />
                                    <input type="submit" id="top_submit_search_img" value="" />
                                    <div id="autocomplete-attach" class="ui-front"></div>
                                </div>
                            </fieldset>
                        </form>    
                    </div>
                    <!--
                    <div class="grid_1" style="height: 80px;">
                        <div id="mon_compte" class="button_header mon_compte">
                            <div id="form" class="hidenn">

                            </div>
                        </div>
                        <div id="aide_en_ligne" class="button_header"></div>

                        <div  id="validateAddToCartQtip" style="margin-left: 0px">
                            <div class="button session" id="cart">
                            </div>
                            <div id="cartCount">

                            </div>
                        </div>               
                    </div>
                    -->
                </div>




                <div class="container_5" id="filtres">

                    <div class="grid_1 button session" style="height: 30px"></div>
                    <div class="grid_3" style="height:50px; text-align:center;margin-top:0;">
                        <div class="centered_list">
                            <div id="filtre_content" class="filter_container">
                                <!--<div class="grid_one ">
                                    <div class=" vertical_centering prix_tuto">
                                        <div class="filter_title">Prix</div>
                                        <div id="price_bar">
                                            <div id="price_slider"></div>
                                        </div>
                                        <div id="price_feedback" class="feedback"></div>
                                    </div>
                                </div>-->
                                <div class="grid_one ">
                                    <div class=" vertical_centering prix_tuto" style="line-height:40px;font-weight:bold">
                                        Filtrez sur le(s) format(s) que vous préférez :
                                    </div>
                                </div>
                                <div class="grid_one" style="margin-left: 10px;">
                                    <div class=" vertical_centering">
                                        <div class="filter_title">Formats</div>
                                        <div class="toggle_group epub_tuto">
                                            <div id="epub" class="toggle"></div>
                                            <div class="feedback">EPUB</div>
                                        </div>
                                        <div class="toggle_group pdf_tuto">
                                            <div id="pdf" class="toggle"></div>
                                            <div class="feedback">PDF</div>
                                        </div>
                                        <!--<div class="toggle_group mobile_tuto">
                                            <div id="mobile" class="toggle"></div>
                                            <div class="feedback">MOBI</div>
                                        </div>-->
                                    </div>    
                                </div>
                                <!--<div class="grid_two" style="margin-left: 5px;">
                                    <div class=" vertical_centering DRM_tuto">
                                        <div class="filter_title">DRM</div>
                                        <div class="toggle_group">
                                            <div id="drm" class="toggle_round"></div>
                                        </div>
                                        <div id="drm_feedback" class="feedback">Avec et sans</div>
                                    </div>   
                                </div>-->

                                <div class="grid_two" style="border-left: 1px solid #333; height: 40px;">
                                    <div class=" vertical_centering">
                                        <div class="toggle_group">
                                            <div id="go_filter"></div>
                                        </div>
                                    </div>   
                                </div>
                            </div> 
                        </div>

                    </div>


                </div>

            </div>

            <div id="tuto_on_off" >
                <div class="tuto_button button_header" title="Activer/désactiver les tutoriels"></div>
            </div>

            <div id="tutorial_container">
                <div class="tutorial">
                    <div class="didactitiel_content"> 
                    </div>    
                </div>
            </div>
        </div>

        <div class="container_5" style="height: 50px;"></div>
<!--        <div class="container_5" style="height: 70px;"></div>-->

        <div class="clear"></div>

        <!--Cible area-->
        <div id="middle_search_bar_container">

            <div id="subFilterContainer" class="container_5"></div>
            <div class="container_5">  

                <div id="middle_search_bar" class="index_search_bar grid_3 push_1">
                    <form id="middle_search_action" action="javascript:" method="get" class="alt">
                        <fieldset>
                            <input id="middle_search" class="center_bar" type="text" name="search"/>
                            <input id="middle_search_hidden" type="hidden" />
                            <input type="submit" id="center_submit_search_img" value="" />
                            <div id="autocomplete-attach" class="ui-front"></div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="container_5 ">
                <div class="grid_5" style="height: 100px;"></div>
            </div>
        </div>

        <div id="cible">
            <div id="search_bar">
                <div class="container_5 ">
                    <div id="search_result"></div>
                    <div id="tutorial_second"></div>
                </div>
                <div id="cible_feature">
                    <div id="holder"></div>
                </div>
            </div>
            <div class="container_5">
                <div id="result_pagination">
                    <span class="previous_page page_selector">Précédent</span>
                    <p class="pagination_feedback"></p>
                    <span class="next_page page_selector">Suivant</span>               
                </div>
            </div>
        </div>


        <div id="abortedSearch">
            <div class="container_5" style="height: 150px;"></div>
            <div class="container_5">  
                <div  class="aborted_text grid_3 push_1">

                    <div id="noresult">
                    </div>
                </div>
            </div>
            <div class="container_5 ">
                <div class="grid_5" style="height: 50px;"></div>
            </div>
        </div>
        <div id="bottomTarget"></div>
        <div id="empty"> 
            Chargement des résultats...
        </div>

        <div class="container_5" id="space" style="position: relative;">
        </div>

        <!-- Mosaique -->
        <div id="scroll_fixed"  class="full_width">
            <div class="container_5" id="onglet_content">
                <div class="onglet propo" id="call_0">
                    <p>A la une</p>
                </div>   

                <div class="onglet prefs_ed" id="call_1">
                    <p>Mes éditeurs</p>
                </div>

                <div class="onglet prefs_genre" id="call_2">
                    <p>Mes genres</p>
                </div>

                <div class="onglet prefs_keywords" id="call_3">
                    <p>Mes mots-clés</p>
                </div>

                <div class="onglet biblio" id="call_4">
                    <p>Bibliographie</p>
                </div>
            </div>

            <div class="clear"></div>

            <div class="container_5 change_col blackShadow" >

                <ul id="title_0" class="titles">
                    <li class="grid_1 column1 ui-corner-all entete activateSpread tutoriable" id="0|Spread_1">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column2 ui-corner-all entete activateSpread tutoriable" id="0|Spread_2">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column3 ui-corner-all entete activateSpread tutoriable" id="0|Spread_3">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column4 ui-corner-all entete activateSpread tutoriable" id="0|Spread_4">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column5 ui-corner-all entete activateSpread" id="0|Spread_5">
                        <span class=""></span>
                    </li>
                </ul>

                <ul id="title_1" class="titles">
                    <li class="grid_1 column1 ui-corner-all entete activateSpread" id="1|Spread_1">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column2 ui-corner-all entete activateSpread" id="1|Spread_2">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column3 ui-corner-all entete activateSpread" id="1|Spread_3">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column4 ui-corner-all entete activateSpread" id="1|Spread_4">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column5 ui-corner-all entete activateSpread" id="1|Spread_5">
                        <span class=""></span>
                    </li>
                </ul>

                <ul id="title_2" class="titles">
                    <li class="grid_1 column1 ui-corner-all entete activateSpread" id="2|Spread_1">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column2 ui-corner-all entete activateSpread" id="2|Spread_2">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column3 ui-corner-all entete activateSpread" id="2|Spread_3">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column4 ui-corner-all entete activateSpread" id="2|Spread_4">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column5 ui-corner-all entete activateSpread" id="2|Spread_5">
                        <span class=""></span>
                    </li>
                </ul>

                <ul id="title_3" class="titles">
                    <li class="grid_1 column1 ui-corner-all entete activateSpread" id="3|Spread_1">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column2 ui-corner-all entete activateSpread" id="3|Spread_2">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column3 ui-corner-all entete activateSpread" id="3|Spread_3">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column4 ui-corner-all entete activateSpread" id="3|Spread_4">
                        <span class=""></span>
                    </li>

                    <li class="grid_1 column5 ui-corner-all entete activateSpread" id="3|Spread_5">
                        <span class=""></span>
                    </li>
                </ul>

                <div id="title_4">
                    <div id="empty_biblio" class="grid_1"></div>
                    <div id="biblio_title" class="grid_3"></div>
                </div>


            </div>
        </div>


        <div class="full_width">
            <div class="container_5 mos_container" style="overflow: hidden;">
                <div class="libs" id="lib_0">
                    <div class="grid_1 column1"></div>

                    <div class="grid_1 column2"></div>

                    <div class="grid_1 column3"></div>

                    <div class="grid_1 column4"></div>

                    <div class="grid_1 column5"></div>
                </div>

                <div class="libs" id="lib_1">
                    <div class="grid_1 column1"></div>

                    <div class="grid_1 column2"></div>

                    <div class="grid_1 column3"></div>

                    <div class="grid_1 column4"></div>

                    <div class="grid_1 column5"></div>
                </div>

                <div class="libs" id="lib_2">
                    <div class="grid_1 column1"></div>

                    <div class="grid_1 column2"></div>

                    <div class="grid_1 column3"></div>

                    <div class="grid_1 column4"></div>

                    <div class="grid_1 column5"></div>
                </div>

                <div class="libs" id="lib_3">
                    <div class="grid_1 column1"></div>

                    <div class="grid_1 column2"></div>

                    <div class="grid_1 column3"></div>

                    <div class="grid_1 column4"></div>

                    <div class="grid_1 column5"></div>
                </div>

                <div class="libs" id="lib_4">
                    <div class="grid_1" style="height:5px;"></div>
                    <div class="grid_3">
                    </div>
                </div>

                <!--  FOOTER  -->
                <?php include('footer.html'); ?>
            </div>
        </div>

        <!-- CONTENT BOOK SHEET + HOVERS -->
        <div id="booksheet" class="hidenn"> 

            <div class="content">

                <div class="container_fiche">

                    <div class="image"></div>

                    <div class="titre_logo">
                        <div class="titres"></div>
                        <div class="publisher_logo"></div>
                    </div>

                    <div class="close_booksheet">x</div>

                    <div id="grad"><div class="text"></div></div>

                    <div class="infos_achat">
                        <div class="infos"></div>
                        <div class="buy">
                            <div class="buy_button"></div>
                            <div class="prix"></div>
                        </div>
                        <div class="formats"></div>

                    </div>

                    <div class="sliders">
                        <div class="auteur_slider">
                            <div class="slider_clip">
                                <div class="slider_cont" id="authors_slider">

                                </div>
                            </div>
                            <span class="prev leftArrow"></span>
                            <span class="next rightArrow"></span>
                            <div id="sameAuthor_title"></div>
                        </div>

                        <div class="editions_slider">
                            <div class="slider_clip">
                                <div class="slider_cont" id="editors_slider">
                                </div>
                            </div>
                            <span class="prev leftArrow"></span>
                            <span class="next rightArrow"></span>
                            <div id="sameEd_title"></div>
                        </div>

                        <div class="format_slider">
                            <div class="slider_cont" id="formats_slider">
                            </div>
                        </div>

                    </div>

                </div>
            </div>   
        </div>

        <div class="clear"></div>

        <div id="modal_loading" class=" container_fiche hidenn">Loading ...</div>

        <div id="panier_display" class="hidenn"></div>

        <div id="choose_format_display">
            <div id="choose_format_content">
                <div class="choose_format_close"><img src="http://www.sanspapier.com/images/icons/delete.png" /></div>

                <div id="choose_format_title">Choisissez votre format</div>

                <div id="choose_format_image"></div>

                <div id="choose_format_price"></div>

                <div id="choose_format_formats"></div>
            </div>
        </div>

        <!--  TUTORIALS CONTENTS   -->

        <div class="tuto_content tuto_barre_de_recherche" id="tuto_barre_de_recherche">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Votre recherche commence ici, écrivez ce que vous voulez.</p>
        </div>

        <div class="tuto_content tuto_livre_pivot" id="tuto_livre_pivot">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <div class="result"></div><p>Le livre central est le résultat de votre recherche. Autour de ce titre, notre moteur de recommandation a rassemblé les livres qui partagent des thèmes avec lui.
        </div>

        <div class="tuto_content tuto_plateau" id="tuto_plateau">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Cliquez sur la table, gardez le curseur appuyé et faites tourner les livres. C'est plus facile pour les observer !</p>
        </div>

        <div class="tuto_content tuto_draganddrop" id="tuto_draganddrop">           
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Découvrez de nouveaux titres en déplaçant ce livre au centre de la table.</p>
        </div>

        <div class="tuto_content tuto_pagination" id="tuto_pagination">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Vous ne trouvez pas votre bonheur ? Passez à la table suivante, la perle rare vous y attend sûrement !</p>
        </div>

        <div class="tuto_content tuto_biblio" id="tuto_biblio">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Découvrez ici d'autres titres de l'auteur disponibles en numérique.</p>
        </div>

        <div class="tuto_content tuto_phrase_double_index" id="tuto_phrase_double_index">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Nous travaillons à l'enrichissement de ce livre. Vous le retrouverez bientôt parmi les autres sur notre table de librairie virtuelle.</p>
        </div>

        <div class="tuto_content tuto_category" id="tuto_category">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Une catégorie vous intéresse? Cliquez sur l'en-tête de la colonne et accédez à plus d'informations sur chaque livre !</p>
        </div>

        <div class="tuto_content tuto_recherche_auteur" id="tuto_recherche_auteur">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Une petite astuce : cliquez sur un auteur et une recherche se lance automatiquement sur son nom.</p>
        </div>

        <div class="tuto_content tuto_prix" id="tuto_prix">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Faites varier les prix en poussant la molette et ajustez l’offre en fonction de votre budget.</p>
        </div>

        <div class="tuto_content tuto_epub" id="tuto_epub">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Chaque format possède ses spécificités, sélectionnez les en fonction de vos besoins.<br/><br/>
                EPUB : l'EPUB tend à devenir le standard de la lecture numérique, ce format possède une mise en page qui s'adapte au support sur lequel il est ouvert.</p>
        </div>

        <div class="tuto_content tuto_pdf" id="tuto_pdf">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Chaque format possède ses spécificités, sélectionnez les en fonction de vos besoins.<br/><br/>
                PDF : C'est toujours le format le plus répandu pour le livre numérique. Sa mise en page statique en fait une alternative imparfaite à l’EPUB.</p>
        </div>

        <div class="tuto_content tuto_mobile" id="tuto_mobile">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Chaque format possède ses spécificités, sélectionnez les en fonction de vos besoins.<br/><br/>
                MOBI : C'est le format appartenant à la société Amazon. Il est lu sur les machines Kindle et les applications Kindle embarquées sur d'autres appareils (tablettes Apple ou Android).</p>
        </div>

        <div class="tuto_content tuto_DRM" id="tuto_DRM">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>DRM : Il s'agit d’un mécanisme de protection permettant de contrôler l'utilisation des livres numériques.</p>
        </div>

        <div class="tuto_content tuto_mon_compte" id="tuto_mon_compte">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Connectez-vous et accédez à votre compte: téléchargez vos livres, gérez vos informations personnelles et paramétrez vos flux de recommandation.</p>
        </div>

        <div class="tuto_content tuto_aide_en_ligne" id="tuto_aide_en_ligne">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p>Si vous vous sentez un peu perdu, vous trouverez quelques explications sur la lecture numérique ici !</p>
        </div>

        <div class="tuto_content tuto_onglets_perso_editeur" id="tuto_onglets_perso">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p> Editeurs : Dans cet onglet, suivez les parutions de vos éditeurs favoris.</p>
        </div>
        
        <div class="tuto_content tuto_onglets_perso_genre" id="tuto_onglets_perso">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p> Genres : Cet onglet pour vous permet de rester informé des sorties par genre littéraire.</p>
        </div>
        
        <div class="tuto_content tuto_onglets_perso_keyword" id="tuto_onglets_perso">
            <div class="entete_tuto_content">Le saviez-vous ?</div>
            <p> Mots-clés : Gardez un œil sur les thèmes qui vous passionnent.</p>
        </div>

        <div id="tuto_empty">           
        </div>

        <!-- CHOOSE FORMATS ON BOOKSHEET -->

        <div class="booksheetFormats" id="booksheetFormats_2" style="display: none;">
            <div class="booksheetFormatsTitle">MP3</div>
            <div class="booksheetFormatsContent"><b>MP3 :</b> fichier audio compatible tous ordinateurs, tablettes et lecteurs MP3.</div>
        </div>
        
        <div class="booksheetFormats" id="booksheetFormats_4" style="display: none;">
            <div class="booksheetFormatsTitle">Epub</div>
            <div class="booksheetFormatsContent"><b>Epub :</b> lisible sur la plupart des tablettes et liseuses, sauf Kindle d’Amazon.</div>
        </div>

        <div class="booksheetFormats" id="booksheetFormats_5" style="display: none;">
            <div class="booksheetFormatsTitle">HTML</div>
            <div class="booksheetFormatsContent"><b>HTML :</b> accès en streaming (une connexion internet est requise).</div>
        </div>

        <div class="booksheetFormats" id="booksheetFormats_6" style="display: none;">
            <div class="booksheetFormatsTitle">PDF</div>
            <div class="booksheetFormatsContent"><b>PDF :</b> compatible avec toutes les liseuses, tablettes et ordinateurs.</div>
        </div> 

        <div class="booksheetFormats" id="booksheetFormats_7" style="display: none;">
            <div class="booksheetFormatsTitle">Mobi</div>
            <div class="booksheetFormatsContent"><b>Mobi :</b> compatible avec l'univers Kindle, liseuses et logiciels.</div>
        </div>



        <div class="booksheetFormats" id="booksheetFormats__1" style="display: none;">
            <div class="booksheetFormatsTitle">sans protection</div>
            <div class="booksheetFormatsContent">Ce fichier n'est verrouillé par aucune protection, vous pouvez le lire et le copier librement.</div>
        </div> 

        <div class="booksheetFormats" id="booksheetFormats__2" style="display: none;">
            <div class="booksheetFormatsTitle">avec DRM Adobe</div>
            <div class="booksheetFormatsContent"><b>DRM Adobe :</b> mécanisme de protection limitant le nombre de copies à X appareils. Vous ne pouvez pas copier/coller ou imprimer le texte. <br/>
                Vous devez installer le logiciel <a href="http://www.adobe.com/fr/products/digitaleditions/" target="_blank" style="font-size:12px; color: rosybrown">Adobe Digital Edition</a> pour lire ce fichier.<br/><br/>
                <b>Plus d’informations sur notre</b> <a href="aide_en_ligne.php" target="_blank" style="font-size:12px; color: rosybrown">aide en ligne</a></div>
        </div>

        <div class="booksheetFormats" id="booksheetFormats__3" style="display: none;">
            <div class="booksheetFormatsTitle">avec tatouage</div>
            <div class="booksheetFormatsContent"><b>Protection par tatouage (Watermark) :</b> protection souple sans DRM vous permettant de modifier, copier et imprimer votre fichier pour votre usage personnel. Vos nom et e-mail sont inscrits sur chaque page du livre.</div>
        </div> 
        <span id="titleCol1Hidden" class="hidden titles widthAuto hiddenTitle"></span>
        <span id="titleCol2Hidden" class="hidden titles widthAuto hiddenTitle"></span>
        <span id="titleCol3Hidden" class="hidden titles widthAuto hiddenTitle"></span>
        <span id="titleCol4Hidden" class="hidden titles widthAuto hiddenTitle"></span>
        <span id="titleCol5Hidden" class="hidden titles widthAuto hiddenTitle"></span>
    </body>

</html>
