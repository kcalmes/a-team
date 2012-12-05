<?php
    $link = mysql_connect('williamswarecom.fatcowmysql.com', 'lawrence', 'pitridish');
    if(!link) {die('Could not connect: ' . mysql_error());}
    mysql_select_db("cs240", $link);
    
    $result = mysql_query("SELECT url, isDoc, tags, title FROM Resources");
    
    $toEcho = "results = [";
    
    while($row = mysql_fetch_array($result)) {
        if(($_GET['query'] && ((stristr($row['tags'], $_GET['query'])) || (stristr($row['title'], $_GET['query']))) ) || ! $_GET['query']) {
            $toEcho = $toEcho . "{ \"url\":\"" . $row['url'] . "\", ";
			$toEcho = $toEcho . "\"title\":\"" . $row['title'] . "\", ";
            $toEcho = $toEcho . "\"isDoc\":\"" . $row['isDoc'] . "\" }, ";
        }
    }
    
    $toEcho = $toEcho . "]";
    echo str_ireplace("}, ] }", "} ] }", $toEcho);
?>
