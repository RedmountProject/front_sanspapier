<?php
  header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
  header("Pragma: no-cache"); //HTTP 1.0
  header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="content-type" 
              content="text/html;charset=utf-8" />

        <title>Sanspapier.com - Mon Compte</title>
        <meta name="robots" content="none,noarchive" />
        <link rel="Shortcut Icon" href="images/favicon.ico" type="image/x-icon" />
        <?php include($_SERVER['DOCUMENT_ROOT'] . '/header_asset.php'); ?>        

        <script type="text/javascript" src="data/js/libs_comp.js"></script>


        <link rel="stylesheet" href="<?php autoVer('css/global_comp.css','css'); ?>" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php autoVer('css/profile_comp.css','css'); ?>" type="text/css" media="screen" />
        
        <script type="text/javascript" src="<?php autoVer('js/global_comp.js','js'); ?>"></script>

        <script type="text/javascript">
        
            var js_profile_file = "<?php autoVer('js/profile_comp.js','js'); ?>";
            
            $LAB
            .script(js_profile_file).wait(function(){
                init_after();
            });
        
        </script>


        <script type="text/javascript" src="js/analytics.js"></script>
    </head>

    <body>
        <!--Header-->
        <div class="container_5">

            <div id="sp">
                <div class="container_5" id="header">

                    <div class="grid_1" style="height: 100px;">
                        <div id="logo" title="sanspapier.com, librairie numérique et moteur de recommandation">
                            <p>
                                <img src="images/logo_sp.png" alt="" title="" />
                            </p>
                        </div>
                    </div>

                    <div class="grid_3" id="slogan">
                        Librairie numérique &amp; Moteur de recommandation
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
                </div>
                <div class="container_5" id="filtres"></div>
            </div>
        </div>
        <div class="clear"></div>

        <div class="container_5" style="height: 200px;"></div>


        <div class="container_5" id="overflowContainer">

            <div class="container_5" id="onglet_content">


                <div class="onglet prefs" id="call_0">
                    <p>Mes préférences</p>
                </div>

                <div class="onglet achats" id="call_1">
                    <p>Mes achats</p>
                </div>

                <div class="onglet infos" id="call_2">
                    <p>Mes infos perso</p>
                </div>

            </div>

            <div class="container_5" id="content">

                <div id="content_slider">
                    <div class="container_5 slide_container" id="content_0">
                        <div class="bandeau prefs"></div>
                        <div class="content">
                            <div class="profile_container" id="mes_prefs">
                            </div>
                        </div>
                    </div>

                    <div class="container_5 slide_container" id="content_1">
                        <div class="bandeau achats"></div>
                        <div class="content">
                            <div class="profile_container" id="mes_achats">
                            </div>
                        </div>
                    </div>

                    <div class="container_5 slide_container" id="content_2">
                        <div class="bandeau infos"></div>
                        <div class="content">
                            <div class="profile_container" id="infos_perso">
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div class="clear"></div>


            <!--  FOOTER  -->
            <?php include('footer.html'); ?>
        </div>


        <div id="panier_display" class="hidenn"></div>

    </body>

</html>