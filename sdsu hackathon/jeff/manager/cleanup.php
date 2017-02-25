<?php
	
	$query = "delete from user;";
	
	$con = mysqli_connect("localhost", "humitrip_arcbbq", "esri_1234", "humitrip_arcbbq", 3306);
	$result = mysqli_query($con, $query);
	
	mysqli_close($con);
	
?>