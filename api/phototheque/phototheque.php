<?php
    require_once(dirname(__FILE__) . "/../../config.php");

    function getSubDirs($dir) {
        $nFiles = 0;
		$arr = array();
        if (is_dir($dir)) {
            $subDirs = scandir($dir); 
            foreach ($subDirs as $subDir) { 
                if ($subDir != "." && $subDir != "..") { 
                    if (filetype($dir."/".$subDir) == "dir") {
                        $lstDir = getSubDirs($dir."/".$subDir);
                        $n = array_pop ($lstDir);
                        $node["id"] = $subDir;
                        $node["text"] = $subDir . ($n > 0 ? " (" . $n . " fichiers)" : "");
                        $node["children"] = $lstDir;
                        $arr[] = $node;
                    }
                    else if (strstr(strtolower($subDir), ".jpg") !== FALSE) $nFiles++;
                } 
            } 
        }
        $arr[] = $nFiles;
		return $arr; 
	}

	function getFiles($root, $dir) {
        $liste = array();
        if (is_dir($root . "/" . $dir)) {
            $files = scandir($root . "/" . $dir);
    
            foreach ($files as $file) {
                if ($file != "." && $file != "..") { 
                    if (filetype($root . "/" . $dir."/".$file) !== "dir" && strstr(strtolower($file), ".jpg") !== FALSE) {
                        $image = @getimagesize($root . "/" . $dir."/".$file);
                        $element = array();
                        $element[] = $file;
                        $element[] = $image[0];
                        $element[] = $image[1];
                        $element[] = "";
                        $element[] = "./images/" . $dir."/".$file;
						$liste[] = $element;
					}
                } 
            }

            if (strpos($root, "phototheque") !== false) {
                $liste = getComments($liste, $dir);
            }
        }
        if (count($liste) === 0) $liste[] = array("--Aucune image--", 0, 0, "", "");
        else array_unshift($liste, array("--Sélectionner une image--", 0, 0, "", ""));
		return $liste; 
    }

    function getComments($liste, $dir) {
        global $config;

        $imageList = "";
        foreach ($liste as $image) {
            $imageList .= "'./images/" . $dir."/" . $image[0] . "',";
        }

        $imageList = substr_replace($imageList, "", -1);

        $results = array();

        if ($imageList !== "") {
            $connect = mysqli_connect($config['db_hostname'], $config['db_username'], $config['db_password'], $config['db_name']);
            if ($connect !== false) {
                mysqli_query($connect, "SET NAMES 'utf8'");
                $query = "SELECT * FROM `phototheque` where image in (" . $imageList . ")";
    
                if ($result = mysqli_query($connect, $query)) {
                    while ($row = mysqli_fetch_array($result)) {
                        $results[$row['image']] = $row['description'];
                    }
                }
                mysqli_free_result($result);
                mysqli_close($connect);
            }
        }

        if (!empty($results)) {
            foreach ($liste as &$image) {
                $image[3] = $results["./images/" . $dir."/" . $image[0]];
            }
        }

        return $liste;
    }

    function setComment($imageName, $description) {
        global $config;
        $return = "erreur";

        $bUpdate = false;

        $connect = mysqli_connect($config['db_hostname'], $config['db_username'], $config['db_password'], $config['db_name']);
        if ($connect !== false) {
            mysqli_query($connect, "SET NAMES 'utf8'");
            $query = "SELECT count(1) FROM `phototheque` where image = '$imageName'";
            if ($result = mysqli_query($connect, $query)) {
                if ($row = mysqli_fetch_array($result)) {
                    if ($row[0] > 0) $bUpdate = true;
                }
            }
            mysqli_free_result($result);


            if ($bUpdate) {
                $query = "UPDATE `phototheque` SET description='$description' where image = '$imageName'";
                $return = mysqli_query($connect, $query);
            }
            else {
                $query = "INSERT INTO `phototheque` (image, description) VALUES ('$imageName','$description')";
                $return = mysqli_query($connect, $query);
            }
        }
        mysqli_close($connect);
    
        return $return;
    }

    function getRights($sessionID)
	{
        global $config;

		// Récupération session ID
		$rights['loggedIn'] = true;
		$rights['sessionID'] = "";
		$rights['userID'] = "";
		$rights['isAdmin'] = true;
        $rights['sessionID'] = $sessionID;
        
		// recherche dans la base si l'utilisateur s'est authentifié (n° de session en base)
        $connect = mysqli_connect($config['db_hostname'], $config['db_username'], $config['db_password'], $config['db_name']);
        if ($connect !== false) {
            $sessionID = $rights['sessionID'];
            $query = "SELECT * FROM cms_module_feusers_loggedin where sessionid = '$sessionID'";
            if ($result = mysqli_query($connect, $query)) {
                if ($row = mysqli_fetch_assoc($result)) {
                    $rights['loggedIn'] = true;
                    $rights['userID'] = $row['userid'];
                }
            }
            mysqli_free_result($result);
    
            $userID = $rights['userID'];
            $query = "SELECT * FROM cms_module_feusers_belongs where userid = '$userID' and groupid = '3'";
            if ($result = mysqli_query($connect, $query)) {
                if ($row = mysqli_fetch_assoc($result)) {
                    $rights['isAdmin'] = true;
                }
            }
            mysqli_free_result($result);
    
            mysqli_close($connect);
        }
		

		return $rights;
	}
?>