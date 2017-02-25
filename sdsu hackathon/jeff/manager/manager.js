var points = [];
var k;
var centers = [], radius = [];
var assignments, means;
var dataLen = 0;
var users = [];
var poi = [];
var curTime;

var map, view, routeTask, closestFacilityTask, locator;
var solutionLayer, poiLayer;
var markerSymbol, newMarkerSymbol, routeSymbol;
var closestFacilityParams;

require([
	"esri/Map",
	"esri/views/MapView",
	"esri/tasks/RouteTask",
	"esri/tasks/ClosestFacilityTask",
	"esri/tasks/Locator",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/geometry/Point",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/PopupTemplate",
	"esri/tasks/support/AddressCandidate",
	"esri/tasks/support/ClosestFacilityParameters",
	"esri/tasks/support/FeatureSet",
	"esri/tasks/support/DirectionsFeatureSet",
	"dojo/domReady!"
], function(
	Map, MapView, RouteTask, ClosestFacilityTask, Locator, 
	Graphic, GraphicsLayer, Point, SimpleMarkerSymbol, SimpleLineSymbol, PopupTemplate, AddressCandidate,
	ClosestFacilityParameters, FeatureSet, DirectionsFeatureSet
) {
	
	map = new Map({
		basemap: "streets"
	});

	view = new MapView({
		center: [-117.07, 32.77],
		container: "viewDiv",
		map: map,
		zoom: 11
	});
	
	markerSymbol = new SimpleMarkerSymbol({
		color: [226, 119, 40],
		outline: { // autocasts as new SimpleLineSymbol()
			color: [255, 255, 255],
			width: 2
		}
	});

        newMarkerSymbol = new SimpleMarkerSymbol({
		color: [0, 128, 128],
		outline: { // autocasts as new SimpleLineSymbol()
			color: [255, 255, 255],
			width: 2
		}
	});
	
	routeSymbol = new SimpleLineSymbol({
		color: [0, 0, 255, 0.5],
		width: 5
	});
	
	routeTask = new RouteTask({
		url: "https://utility.arcgis.com/usrsvcs/servers/971fc2afc6df4d98aeafc4a0d5c50516/rest/services/World/Route/NAServer/Route_World"
	});
	
	closestTask = new ClosestFacilityTask({
		url: "http://utility.arcgis.com/usrsvcs/servers/e9875d4725fe43e88f2838adc2578345/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World"
	});
	
	locator = new Locator({
		url: "http://utility.arcgis.com/usrsvcs/servers/c118337e6f8a48ca8de41ffd23211d59/rest/services/World/GeocodeServer"
	});
	
	solutionLayer = new GraphicsLayer();
	poiLayer = new GraphicsLayer();
	
	map.add(solutionLayer);
	map.add(poiLayer);
	
	closestFacilityParams = new ClosestFacilityParameters({
		facilities: new FeatureSet(),
		incidents: new FeatureSet(),
		travelDirection: "esriNATravelDirectionFromFacility",
		returnDirections: true
	});
	
	// load sms data
	getDBData("user", userCallBack);
	
	// load POI
	getDBData("hospital", poiCallBack);
	
	function poiCallBack() {
		poi = JSON.parse(this.responseText);
		showHospitalData(poi);
	}
	
	function userCallBack() {
		dbData = JSON.parse(this.responseText);
		
		curTime = 0;
		
		// display existing data
		for (var i = 0; i < dbData.length; i++) {
			if (dbData[i]["country"] == "USA" && dbData[i]["postal"] != "") {
				dbData[i]["longitude"] = parseFloat(dbData[i]["longitude"]);
				dbData[i]["latitude"] = parseFloat(dbData[i]["latitude"]);
				addPoint(dbData[i], markerSymbol);
				users.push(dbData[i]);
			}
			if (dbData[i]["time_stamp"] > curTime) {
				curTime = dbData[i]["time_stamp"];
			}
		}
		
		// query new sms
		getSMS();
	
		// periodically query SMS
		setInterval(getSMS, 5000);
	}
	
	// query SMS API
	function getSMS() {
		var url = "manager/getsms.php?Date=2016-07-25";
		var oReq = new XMLHttpRequest();
		oReq.onload = function() {
			
			data = JSON.parse(this.responseText);
			
			// process message
			for (var i = 0; i < data.sms_messages.length; i++) {
				
				// filter out old message
				var record = [];
				record["sid"] = data.sms_messages[i].sid;
				record["phone"] = data.sms_messages[i].from;
				record["date_sent"] = data.sms_messages[i].date_sent.substr(0, data.sms_messages[i].date_sent.length - 6);
				record["time_stamp"] = Date.parse(data.sms_messages[i].date_sent);
                                var flag = true;
				for (var j = 0; j < users.length; j++) {
					if (users[j]["sid"] == record["sid"]) {
						flag = false;
						break;
					}
				}
				
				if (flag && record["time_stamp"].toString() > curTime) {
					var body = data.sms_messages[i].body;
					
					var idx = body.indexOf("@");
					if (idx < 0)
						/*{ sendSMS(record["phone"], "Aida is here to help! Please type more detailed information and your address in the form of message@address\n. Example: Hurt@123 xyz St, city, state"); continue; }*/ continue;
					
					record["message"] = body.substr(0, idx);
					record["address"] = body.substr(idx + 1);
					if (record["address"].length > 0) {
						// geocode address
						geocode(record);
					}
				}
			}
		}
		oReq.open("get", url, true);
		oReq.send();
	}
	
	function getDBData(table, callback) {
		var url = "manager/querydb.php?table=" + table;
		var oReq = new XMLHttpRequest();
		oReq.onload = callback;
		oReq.open("get", url, true);
		oReq.send();
	}
	
	function geocode(record) {
		var obj = [];
		var address = {
			"SingleLine": record["address"]
		};
		obj.push(address);
		
		var obj2 = {
			"addresses": obj
		};
		
		locator.addressesToLocations(obj2).then(showResults.bind(null, record));
	}
	
	function showResults(record, cands) {
		if (cands[0].location) {
			record["match_addr"] = cands[0].attributes.Match_addr;
			record["city"] = cands[0].attributes.City;
			record["country"] = cands[0].attributes.Country;
			record["postal"] = cands[0].attributes.Postal;
			record["longitude"] = cands[0].location.longitude;
			record["latitude"] = cands[0].location.latitude;
			
			// only keep USA results
			if (record["country"] == "USA" && record["postal"] != "") {
				addPoint(record, newMarkerSymbol);
				users.push(record);
				writePoint(record);
			}
		}
	}
	
	function addPoint(item, marker) {
		var point = new Point({
			longitude: item["longitude"],
			latitude: item["latitude"]
		});

		// Create a graphic and add the geometry and symbol to it
		var pointGraphic = new Graphic({
			geometry: point,
			symbol: marker,
			popupTemplate : new PopupTemplate({
				content: "Message: " + item["message"] + "<br/>Address: " + item["match_addr"] + "<br/>Time: " + item["date_sent"]
				+ "<br/>Longitude: " + item["longitude"] + "<br/>Latitude: " + item["latitude"] + "<br/>"
				+ "<a href=model1.html>view building</a>"
			})
		});

		view.graphics.add(pointGraphic);
		
		points.push([item["longitude"], item["latitude"]]);
	}
	
	function writePoint(item) {
		var url = "manager/writedb.php?sid=" + item["sid"] + "&phone=" + encodeURIComponent(item["phone"]) + 
		"&message=" + encodeURIComponent(item["message"]) + 
		"&address=" + encodeURIComponent(item["address"]) + 
		"&match_addr=" + encodeURIComponent(item["match_addr"]) + 
		"&city=" + item["city"] + "&country=" + item["country"] + "&postal=" + item["postal"]
		+ "&longitude=" + item["longitude"] + "&latitude=" + item["latitude"] + 
		"&date_sent=" + encodeURIComponent(item["date_sent"]) + 
		"&time_stamp=" + item["time_stamp"];
		
		var oReq = new XMLHttpRequest();
		oReq.onload = function() {
		}
		oReq.open("get", url, true);
		oReq.send();
	}
	
	function showHospitalData(data) {
		var hospitalSymbol = new SimpleMarkerSymbol({
			style: "cross",
			size: 12,
			outline: { color: "red",
				width: 4
			}
		});
		
		for (var i = 0; i < data.length; i++) {
			
			var point = new Point({
				longitude: data[i]["longitude"],
				latitude: data[i]["latitude"]
			});

			// Create a graphic and add the geometry and symbol to it
			var pointGraphic = new Graphic({
				geometry: point,
				symbol: hospitalSymbol,
				popupTemplate : new PopupTemplate({
					content: "Name: " + data[i]["facname"]
					+ "<br/>Longitude: " + data[i]["longitude"] + "<br/>Latitude: " + data[i]["latitude"] + "<br/>"
				})
			});
			
			poiLayer.add(pointGraphic);
			
			closestFacilityParams.facilities.features.push(pointGraphic);
		}
	}
});

function updateSolution() {
require([
"esri/Graphic",
"esri/geometry/Point",
"esri/geometry/Circle",
"esri/tasks/support/RouteParameters",
"esri/tasks/support/FeatureSet",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"dojo/domReady!"
], function(
	Graphic, Point, Circle, RouteParameters, FeatureSet, 
	SimpleLineSymbol, SimpleFillSymbol
) {
	
	// clear solution layer
	solutionLayer.removeAll();
	
	// update solution for the first time
	update();
	
	function update() {
		if (points.length !== dataLen) {
			// new points added, update solution
			dataLen = points.length;
			solution();
		}
	}
	
	function solution() {
		// clustering
		clustering(points);
	
		drawCircles(centers, radius);
		
		// add center as incidents
		while (closestFacilityParams.incidents.features.length > 0) {
			closestFacilityParams.incidents.features.pop();
		}
		
		for (var i = 0; i < means.length; i++) {
			
			var point = new Point({
				longitude: means[i][0],
				latitude: means[i][1]
			});
			
			var pointGraphic = new Graphic({
				geometry: point,
				symbol: markerSymbol
			});

			closestFacilityParams.incidents.features.push(pointGraphic);
		}
		
		// compute closest facility
		closestTask.solve(closestFacilityParams).then(showClosestFacility, errorHandle);
	
		if (means.length > 1) {
			//computeRoute();
		}
	}
	
	function showClosestFacility(data) {
		
		// render routing
		for (var i = 0; i < data.routes.length; i++) {
			data.routes[i].symbol = routeSymbol;
			solutionLayer.add(data.routes[i]);
			//alert("Time: " + data.directions[i].totalTime + "Length: " + data.directions[i].totalLength);
		}
		
		// send sms to users
		for (var i = 0; i < data.routes.length; i++) {
			var fid = data.routes[i].attributes.FacilityID - 1;
			for (var j = 0; j < users.length; j++) {
				if (assignments[j] == i) {
					var str = "Nearest available hospital is " + poi[fid]["facname"] + ", " + Math.round(data.directions[i].totalLength) + " miles away. ETA of rescue team is " + Math.round(data.directions[i].totalTime) + " minutes";
					var to = users[j]["phone"];
                                        var tmp = users[j]["time_stamp"];
					if (typeof tmp === 'number')
						tmp = tmp.toString();
					if (tmp >= curTime)
						{ sendSMS(to, str); sendSMS(to, "Go to stair #2"); }

				}
			}
		}
	}
	
	function sendSMS(phone, txt) {
		var url = "manager/postsms.php?To=" + encodeURIComponent(phone) + "&Body=" + encodeURIComponent(txt); console.log(url);
		var oReq = new XMLHttpRequest();
		oReq.onload = function() {
		}
		oReq.open("get", url, true);
		oReq.send();
	}
	
	function errorHandle(error) {
		console.error(error);
	}
	
	function clustering(points) {
		k = Math.floor(Math.sqrt(points.length)) - 1;
		while (true) {
			k++;
			ret = kmeans(points, k);
			assignments = ret[0];
			means = ret[1];
			
			// compute circle to cover each cluster
			var flag = true;
			for (i = 0; i < k; i++) {
				var x = 0, y = 0, count = 0;
				var cluster = [];
				for (j = 0; j < points.length; j++) {
					if (assignments[j] === i) {
						x += points[j][0];
						y += points[j][1];
						cluster.push(j);
					}
				}
				
				x /= cluster.length;
				y /= cluster.length;
				
				var r = 0;
				for (j = 0; j < cluster.length; j++) {
					var dx = points[cluster[j]][0] - x;
					var dy = points[cluster[j]][1] - y;
					var tmp = Math.sqrt(dx * dx + dy * dy);
					if (tmp > r)
						r = tmp;
				}
				
				if (r === 0)
					r = 0.004;
				
				if (r > 0.04) {
					flag = false;
					break;
				}
				
				centers[i] = [x, y];
				radius[i] = r;
			}
				
			if (flag === true)
				break;
		}
	}
	
	function drawCircles(centers, radius) {
		for (i = 0; i < centers.length; i++) {
			var circle = new Circle({
				center: centers[i],
				radius: radius[i] * 110,
				radiusUnit: "kilometers",
				geodesic: true
			});
			
			var fillSymbol = new SimpleFillSymbol({
				color: [254, 0, 51, 0.2],
				outline: { // autocasts as new SimpleLineSymbol()
					color: [255, 255, 255],
					width: 1
				}
			});
			
			var circleGraphic = new Graphic({
				geometry: circle,
				symbol: fillSymbol
			});
			
			solutionLayer.add(circleGraphic);
		}
	}
	
	function computeRoute() {
		var routeParams = new RouteParameters({
			stops: new FeatureSet(),
			outSpatialReference: { // autocasts as new SpatialReference()
				wkid: 3857
			}
		});
		
		for (var i = 0; i < means.length; i++) {
			var point = new Point({
				longitude: means[i][0],
				latitude: means[i][1]
			});
			
			var pointGraphic = new Graphic({
				geometry: point,
				symbol: markerSymbol
			});
			
			routeParams.stops.features.push(pointGraphic);
		}
		
		// solve routes
		routeTask.solve(routeParams).then(showRoute);
	}
	
	function showRoute(results) {
		var routeResult = results.routeResults[0].route;
		routeResult.symbol = routeSymbol;
		solutionLayer.add(routeResult);
	}
});
}