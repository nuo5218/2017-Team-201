<?php

	$to = $_GET["To"];
	$msg = $_GET["Body"];
	$sid = "ACd18890844cda7b4b63b441fd8b0910dd";
	$token = "152192f67ec542eabf6c67761795d8a7";
	$from = "5012358999";
	$url = "https://api.zang.io/v2/Accounts/".$sid."/SMS/Messages.json";
	$postdata = "To=".$to."&Body=".$msg."&From=".$from."&AllowMultiple=true";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
	curl_setopt($ch, CURLOPT_USERPWD, "ACd18890844cda7b4b63b441fd8b0910dd:152192f67ec542eabf6c67761795d8a7");
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
	$response = curl_exec($ch);
	
	print curl_error($ch);
	curl_close($ch);
?>