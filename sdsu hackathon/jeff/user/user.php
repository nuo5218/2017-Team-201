<?php
	
	$query = "select * from user;";
	
	$db = mysql_connect("localhost:3306", "root", "");
	mysql_select_db("geodb", $db);
	$result = mysql_query($query);
	
	$ret = array();
	
	while ($arr = mysql_fetch_array($result)) {
		array_push($ret, $arr);
	}
	
	mysql_close();
?>

<script>
	var view;
	var data = <?php echo json_encode($ret) ?>;
	var k;
	var centers = [], radius = [];
	var assignments, means;
	
    require([
		"esri/Map",
		"esri/views/MapView",
		"esri/Graphic",
		"esri/geometry/Point",
		"esri/geometry/Circle",
		"esri/geometry/Polygon",
		"esri/tasks/Locator",
		"esri/tasks/support/AddressCandidate",
		"esri/tasks/RouteTask",
		"esri/tasks/support/RouteParameters",
		"esri/tasks/support/FeatureSet",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleFillSymbol",
		"dojo/on",
		"dojo/domReady!"
    ], function(
		Map, MapView, Graphic, Point, Circle, Polygon, Locator, AddressCandidate, 
		RouteTask, RouteParameters, FeatureSet, 
		SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, on
    ) {

		var map = new Map({
			basemap: "streets"
		});

		view = new MapView({
			center: [-117.195, 34.057],
			container: "viewDiv",
			map: map,
			zoom: 12
		});
		
		var markerSymbol = new SimpleMarkerSymbol({
			color: [226, 119, 40],
			outline: { // autocasts as new SimpleLineSymbol()
				color: [255, 255, 255],
				width: 2
			}
		});
		
		var routeSymbol = new SimpleLineSymbol({
			color: [0, 0, 255, 0.5],
			width: 5
		});
		
		var routeTask = new RouteTask({
			url: "https://utility.arcgis.com/usrsvcs/servers/971fc2afc6df4d98aeafc4a0d5c50516/rest/services/World/Route/NAServer/Route_World"
		});
		
		// geocoding service
		var locator = new Locator({
			url: "http://utility.arcgis.com/usrsvcs/servers/c118337e6f8a48ca8de41ffd23211d59/rest/services/World/GeocodeServer"
		});
		
		on(view, "click", reverseGeocoding);
		
		// display
		for (var i = 0; i < data.length; i++) {
			addPointByLongLat(data[i]["longitude"], data[i]["latitude"]);
		}
		
		// clustering
		var tmp = [];
		for (var i = 0; i < data.length; i++) {
			tmp.push([parseFloat(data[i]["longitude"]), parseFloat(data[i]["latitude"])]);
		}
		
		clustering(tmp);
		
		drawCircles(centers, radius);
		
		computeRoute();
		
		function clustering(points) {
			k = 0;
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
					
					if (r > 0.03) {
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
					color: [227, 139, 79, 0.8],
					outline: { // autocasts as new SimpleLineSymbol()
						color: [255, 255, 255],
						width: 1
					}
				});
				
				var circleGraphic = new Graphic({
					geometry: circle,
					symbol: fillSymbol
				});
				
				view.graphics.add(circleGraphic);
			}
		}
		
		function addPointByLongLat(lon, lat) {
			// First create a point geometry (this is the location of the Titanic)
			var point = new Point({
				longitude: lon,
				latitude: lat
			});

			// Create a graphic and add the geometry and symbol to it
			var pointGraphic = new Graphic({
				geometry: point,
				symbol: markerSymbol
			});

			// Add the graphics to the view's graphics layer
			view.graphics.add(pointGraphic);
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
			view.graphics.add(routeResult);
		}
    });
	
</script>