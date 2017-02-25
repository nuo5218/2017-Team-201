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
	
	$con = mysqli_connect("localhost", "humitrip_arcbbq", "esri_1234", "humitrip_arcbbq", 3306);
	if (mysqli_connect_errno()) {
		echo mysqli_connect_error();
	}
	$result = mysqli_query($con, $query);
	mysqli_close($con);
?>
</body>
</html>