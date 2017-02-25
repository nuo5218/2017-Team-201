<?php
	
	$query = "select * from hospital;";
	
	$db = mysql_connect("localhost:3306", "root", "");
	mysql_select_db("geodb", $db);
	$result = mysql_query($query);
	
	$ret = array();
	
	while ($arr = mysql_fetch_array($result)) {
		array_push($ret, $arr);
	}
	
	mysql_close();
	
	echo json_encode($ret);
	
?>