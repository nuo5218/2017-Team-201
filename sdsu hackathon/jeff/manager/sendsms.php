<?php

	$to = $_GET["To"];
	$msg = $_GET["Body"];
	$sid = "ACd18890844cda7b4b63b441fd8b0910dd";
	$token = "152192f67ec542eabf6c67761795d8a7";
	$from = "+15012358999";
	
	$url = "https://".$sid.":".$token."@api.zang.io/v2/Accounts/".$sid."/SMS/Messages.json?";
	$url = $url."To='".$to."'&Body='".$msg."'&From='".$from."'&AllowMultiple=true";
	
	//echo $msg;
	//echo $url;
	echo file_get_contents($url);
	
?>