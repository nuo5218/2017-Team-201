<html>
<head><title>Submit Form</title></head>
<body>

	<h1 align=center>Submit Form</h1>
	<hr align=center color=black size=2>
	
<?php

	$number = $_POST["number"];
	$message = $_POST["message"];
	$address = $_POST["address"];
	$longitude = $_POST["longitude"];
	$latitude = $_POST["latitude"];
	
	echo $number;
	echo "<br/>";
	echo $message;
	echo "<br/>";
	echo $address;
	echo "<br/>";
	echo $longitude;
	echo "<br/>";
	echo $latitude;
	echo "<br/>";
	
	$query = "insert into user (num_people, message, geo_label, longitude, latitude) values (";
	$query = $query.$number.", '".$message."', '".$address."', ".$longitude.", ".$latitude.");";
	
	//echo $query;
	
	$db = mysql_connect("localhost:3306", "root", "");
	mysql_select_db("geodb", $db);
	$result = mysql_query($query);
	mysql_close();
?>
</body>
</html>