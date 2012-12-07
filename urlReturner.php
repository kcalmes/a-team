<?php
  $link = mysql_connect('williamswarecom.fatcowmysql.com', 'lawrence', 'pitridish');
  if(!link) {die('Could not connect: ' . mysql_error());}
  mysql_select_db("cs240", $link);

  if($_POST['url']) {
    mysql_query("UPDATE `CurrentResource` SET `url` = '" . $_POST['url'] . "';");
  } else {
    $result = mysql_query("SELECT url FROM CurrentResource;");
    $row = mysql_fetch_array($result);
    echo $row['url'];
  }
?>
