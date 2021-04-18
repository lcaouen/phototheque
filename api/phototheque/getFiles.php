<?php
    require_once(dirname(__FILE__) . "/phototheque.php");

    $arr = array();
    if (isset($_GET["dir"])) $arr = getFiles("../../" . $_GET["root"], $_GET["dir"]);
    
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode($arr);
?>