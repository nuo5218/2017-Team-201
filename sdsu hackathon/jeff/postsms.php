<?php

	//$to = $_GET["To"];
	//$msg = $_GET["Body"];
	$to = "9795879043";
	$msg = "test msg";
	$sid = "ACd18890844cda7b4b63b441fd8b0910dd";
	$token = "152192f67ec542eabf6c67761795d8a7";
	$from = "5012358999";
	
	//$url = "https://".$sid.":".$token."@api.zang.io/v2/Accounts/".$sid."/SMS/Messages.json";
	$url = "https://api.zang.io/v2/Accounts/".$sid."/SMS/Messages.json";
	$postdata = "To='".$to."'&Body='".$msg."'&From='".$from."'&AllowMultiple=true";
	
	echo $url;
	echo "<br/>";
	echo $postdata;
	echo "<br/>";
	
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
	curl_setopt($ch, CURLOPT_USERPWD, "ACd18890844cda7b4b63b441fd8b0910dd:152192f67ec542eabf6c67761795d8a7");
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	
	echo $status_code;

	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);

	$response = curl_exec($ch);
	print curl_error($ch);
	
	
	curl_close($ch);
	
	
	
	echo $response;
	
?>