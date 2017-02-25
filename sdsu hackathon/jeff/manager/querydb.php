<?php

	$table = $_GET["table"];
	
	$query = "select * from ".$table.";";
	
	$con = mysqli_connect("localhost", "arcbbq50_571183", "holleman1600", "arcbbq50_aidaDB", 3306);
	if (mysqli_connect_errno()) {
		echo mysqli_connect_error();
	}
	
	$result = mysqli_query($con, $query);
	
	$ret = array();
	
	while ($arr = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		array_push($ret, $arr);
	}
	
	mysqli_close($con);
	
	echo json_encode($ret);
	
?>