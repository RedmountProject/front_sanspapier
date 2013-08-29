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
        <meta name="robots" content="none,noarchive" />
        <title>Sanspapier.com - Librairie numérique &amp; Moteur de recommandation</title>
        <link rel="Shortcut Icon" href="images/favicon.ico" type="image/x-icon" />

        <?php include($_SERVER['DOCUMENT_ROOT'] . '/header_asset.php'); ?>

        <script type="text/javascript" src="data/js/libs_comp.js"></script>

        <link rel="stylesheet" href="<?php autoVer('css/shop_comp.css','css'); ?>" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php autoVer('css/global_comp.css','css'); ?>" type="text/css" media="screen" />
        
        <script type="text/javascript" src="<?php autoVer('js/global_comp.js','js'); ?>"></script>

        <script type="text/javascript">
        
            var js_shop_file = "<?php autoVer('js/shop_comp.js','js'); ?>";
            
        
            $LAB
            .script(js_shop_file).wait(function(){
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
                                <img src="images/logo_sp.png" alt="" BORDER=0/>
                            </p>
                        </div>
                    </div>
                    <div class="grid_3" id="slogan">
                        Librairie numérique &amp; Moteur de recommandation 
                    </div>

                    <div class="grid_1" style="height: 100px;">
                        <div id="mon_compte" class="button_header mon_compte">

                        </div>
                        <div id="aide_en_ligne" class="button_header"></div>
                    </div>



                </div>

                <div class="container_5" id="filtres" style="border-bottom: 0px;">
                    <div class="grid_1 button session" style="height: 30px"></div>
                    <div class="grid_3 button" style="height:60px;line-height:60px; text-align:center; ">
                        <div class="centered_list">
                            <h2>Espace boutique</h2>
                        </div>

                    </div>

                </div> 
                <div class="container_5" id="shop_menu">
                    <div class="push_05 grid_1 step" id="id"><p>Identification</p></div>
                    <div class="push_05 grid_1 step" id="selec"><p>Ma Sélection</p></div>
                    <div class="push_05 grid_1 step" id="pay"><p>Paiement</p></div>
                    <div class="push_05 grid_1 step last" id="download"><p>Téléchargement</p></div>

                </div>
            </div>

        </div>


        <div class="container_5" style="position: relative; height: 252px;">
        </div>

        <div class="clear"></div>

        <!-- register step-->

<!--        <div class="container_5" id="shop">
            <div id="form" class="grid_23 push_12">

            </div>
        </div>-->
        
        <div class="container_5" id="shop">
            <div id="form" class="grid_5">
            </div>
        </div>



        <!-- cart display -->
        <div class="container_5" id="selec_step">
            <div class="grid_23 push_12" id="shop_cartDisplay">

            </div>

            <div class="grid_23 push_12" id="total_price">
                <div class="grid_1" id="total_">
                    Total :
                </div>
                <div class="grid_1" id="_price"></div>

                <!--<div id="agreement"><input type="checkbox" name="agreement_checkbox" id="agreement_checkbox" value=""/>En cochant cette case, j’accepte et je reconnais avoir pris connaissance des <a href="http://www.sanspapier.com/a_propos.php#cgv" target="_blank" class="linkShopCGV">Conditions Générales de Vente</a> Sanspapier.com</div>-->
                <div id="agreement">En raison de la fermeture imminente de la librairie, il n'est plus possible de passer d'achats sur sanspapier.com. Merci de votre compréhension.</div>
                <div id="end_button">Bientôt 100% gratuit !</div>
            </div>


        </div>


        <!-- payment display -->
        <div class="container_5" id="payment_step">

        </div>


        <!-- download display -->
        <div class="container_5">
            <div class="grid_3 push_1 suffix_1" id="download_step">

            </div>
        </div>

        <div class="container_5">
            <!--  FOOTER  -->
            <?php include('footer.html'); ?>
        </div>

    </body>

</html>
