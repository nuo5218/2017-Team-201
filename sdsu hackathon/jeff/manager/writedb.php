<?php

	$sid = $_GET["sid"];
	$phone = $_GET["phone"];
	$message = $_GET["message"];
	$address = $_GET["address"];
	$match_addr = $_GET["match_addr"];
	$city = $_GET["city"];
	$country = $_GET["country"];
	$postal = $_GET["postal"];
	$longitude = $_GET["longitude"];
	$latitude = $_GET["latitude"];
	$date_sent = $_GET["date_sent"];
	$time_stamp = $_GET["time_stamp"];
	
	$query = "insert into user (sid, phone, message, address, match_addr, city, country, postal, longitude, latitude, date_sent, time_stamp) values ('";
	$query = $query.$sid."', '".$phone."', '".$message."', '".$address."', '".$match_addr."', '".$city."', '".$country."', '".$postal."', ".$longitude.", ".$latitude.", '".$date_sent."', ".$time_stamp.");";
	
	$con = mysqli_connect("localhost", "humitrip_arcbbq", "esri_1234", "humitrip_arcbbq", 3306);
	if (mysqli_connect_errno()) {
		echo mysqli_connect_error();
	}
	
	$result = mysqli_query($con, $query);
	
	mysqli_close($con);
	
?>