<?php

	$date = $_GET["Date"];
	$sid = "ACd18890844cda7b4b63b441fd8b0910dd";
	$token = "152192f67ec542eabf6c67761795d8a7";
	$number = "5012358999";
	
	$url = "https://".$sid.":".$token."@api.zang.io/v2/Accounts/".$sid."/SMS/Messages.json?"."To=".$number."&DateSent>=".$date;
	
	echo file_get_contents($url);
	
?>