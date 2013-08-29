<?php

function autoVer($url, $type){
    $path = pathinfo($url);
    //Getting the version in the file /web/version/XX
    $versionDirHandle = dir($_SERVER['DOCUMENT_ROOT'].'/../../data_sanspapier/web/version');
    while($versionFile = $versionDirHandle->read()) {
        if($versionFile != '.' && $versionFile != '..') {
            $versionNumber = basename($versionFile);
            break;
        }
    }
    $versionedFileName = preg_replace('/\.'.$type.'/i', '_'.$versionNumber.'.'.$type, $path['basename']);
    //$ver = '.'.filemtime($_SERVER['DOCUMENT_ROOT'].'/../../data_sanspapier/web/'.$url).'.';
    echo 'data/'.$path['dirname'].'/'. $versionedFileName;
}
?>
