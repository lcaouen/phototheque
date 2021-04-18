<?php
    require_once(dirname(__FILE__) . "/phototheque.php");

    $arr = json_decode(file_get_contents('php://input'), true);
    if (isset($arr['imageName']) && isset($arr['description'])) {
        $imageName = $arr['imageName'];
        $description = $arr['description'];
        $arr = setComment($imageName, $description);
    }
    
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo json_encode($arr);
?>