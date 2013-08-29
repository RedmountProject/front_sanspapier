<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="content-type" 
              content="text/html;charset=utf-8" />
        <meta name="robots" content="none,noarchive" />
        <title>Sanspapier.com - A propos</title>


        <?php include($_SERVER['DOCUMENT_ROOT'] . '/header_asset.php'); ?>

        <link rel="stylesheet" href="<?php autoVer('css/global_comp.css','css'); ?>" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php autoVer('css/about_comp.css','css'); ?>" type="text/css" media="screen" />

        <link rel="Shortcut Icon" href="images/favicon.ico" type="image/x-icon" />

        <script type="text/javascript" src="data/js/libs_comp.js"></script>
        <script type="text/javascript" src="<?php autoVer('js/global_comp.js','js'); ?>"></script>
        <script type="text/javascript" src="<?php autoVer('js/a_propos_comp.js','js'); ?>"></script>


        <script type="text/javascript" src="js/analytics.js"></script>
    </head>

    <body>

        <!--Header-->
        <div class="container_5">

            <div id="sp">
                <div class="container_5" id="header">

                    <div class="grid_1" style="height: 100px;">
                        <div id="logo" title="Sanspapier.com, Moteur de recommandation d'ebooks gratuits">
                            <p>
                                <img src="images/logo_sp.png" alt="" title="" />
                            </p>
                        </div>
                    </div>

                    <div class="grid_3" id="slogan">
                        Moteur de recommandation d'ebooks gratuits
                    </div>

                    <!--                    
                    <div class="grid_3" id="search_bar_top">
                                            
                    </div>

                    <div class="grid_1" style="height: 80px;">
                        <div id="mon_compte" class="button_header mon_compte">
                            <div id="form" class="hidenn">

                            </div>
                        </div>
                        <div id="aide_en_ligne" class="button_header"></div>

                        <div class="grid_1" style="margin-left: 0px; margin-top:0;">
                            <div class="button session" id="cart">
                            </div>
                            <div id="cartCount">

                            </div>
                        </div>
                    </div>
                    >-->
                </div>
                <div class="container_5" id="filtres"></div>
            </div>
        </div>

        <div class="container_5" style="position: relative; height: 200px;">
        </div>

        <div class="clear"></div>

        <div class="container_5" id="a_propos_container">


            <div class="container_5" id="onglet_content">

                <div class="onglet a_propos" id="call_0">
                    <p>A propos</p>
                </div>
            </div>


            <div class="container_5" id="content">

                <div id="content_slider">
                    <div class="container_5 slide_container" id="content_0">
                        <div class="bandeau a_propos"></div>
                        <div class="content">
                            <div class="contentTitle">Propo</div>
                            <div class="textContent">
                                Sanspapier.com est un moteur de recommandation pour le livre. A travers sa librairie 100% numérique, il donne accès à une grande partie de l'offre issue du domaine public - et donc gratuite - francophone.
                                <br />
                                Les ebooks proposés par Sanspapier.com sont issus du site <a href="http://www.ebooksgratuits.com" target="_blank">http://www.ebooksgratuits.com</a>, communauté de passionnés qui numérise les livres du domaine public pour les mettre à votre disposition.
                            </div>

                            <div class="contentTitle">Techno</div>
                            <div class="textContent">
                                Grâce à sa dimension sémantique et sa présentation innovante rappelant la table du libraire, le moteur de recherche transforme la navigation d’un livre à l’autre sur le Web. Les résultats de recherche ne forment plus seulement l’aboutissement du processus, ils sont l’ouverture vers d’autres titres, qui à leur tour pourront générer de nouvelles recherches.
                                <br/><br/>A partir des titres présents sur la table, l’utilisateur peut générer autant de recherches qu’il le souhaite en ramenant un livre au centre avec sa souris. Une nouvelle recherche sera automatiquement lancée. De cette manière, il peut continuer ses pérégrinations sans jamais avoir à repasser par la barre de recherche forcement rigide lorsque l’on a une idée peu précise (ou pas d’idée du tout) du titre recherché.
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <!--  FOOTER  -->
            <?php include('footer.html'); ?>
        </div>        

        <div id="panier_display" class="hidenn"></div>

    </body>

</html>