<?php
    require_once(dirname(__FILE__) . "/phototheque.php");

    $sessionID = "";
    foreach ($_COOKIE as $key => $value) {
        $pos = strpos($key, "CMSSESSID");
        if ($pos !== false) {
            $sessionID = $value;
        }
    }

    foreach ($_GET as $key => $value) {
        $pos = strpos($key, "CMSSESSID");
        if ($pos !== false) {
            $sessionID = $value;
        }
    }

    $arr = getRights($sessionID);

    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode($arr);
?>