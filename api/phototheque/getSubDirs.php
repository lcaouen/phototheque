<?php
    require_once(dirname(__FILE__) . "/phototheque.php");

    $arr = getSubDirs("../../" . $_GET["root"]);
    array_pop ($arr);

    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode($arr);
?>