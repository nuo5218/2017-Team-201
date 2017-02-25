function getDBData() {
		// update data from database
		var oReq = new XMLHttpRequest();
		oReq.onload = function() {
			data = JSON.parse(this.responseText);
			showData();
		}
		oReq.open("get", "getHospital.php", true);
		oReq.send();
	}
