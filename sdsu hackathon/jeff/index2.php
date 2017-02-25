<!DOCTYPE html>
<html lang="en" ng-app="viewApp">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ArcBBQ</title>
	
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/bootstrap-theme.min.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/bootstrap-select.css" />
	<link rel="stylesheet" href="https://js.arcgis.com/4.0/esri/css/main.css">
</head>

<body>
	<div id="header">
	<nav class="navbar navbar-inverse navbar-fixed-top childpanelhead" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="HOME.html">ArcBBQ</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#">Account</a></li>
					<li><a href="#">Help</a></li>
				</ul>
			</div>
		</div>
	</nav>
	</div>
	
	<!--MAIN CONTENT-->
	<div id="content">
		<div class="container-fluid nocircum">
		<div class="row gutter-10 nomargin">
		
		<!--Function-->
		<div class="col-xs-2" >
		<div class="window" style="border-left: 1px solid #333;">
		<div class="window-content" style="background-color:#f5f5f5;">
		<div class="content-container">
		<div class="row nomargin">
		
		<div class="col-xs-2 fullscreen nopadding">
			<ul class="cbp-vimenu">
				<li><a  class="icon-archive" href="index.php" type="pill"  ></a></li>
				<li><a  class="icon-search"  href="model1.html"  type="pill" ></a></li>
			</ul>
		</div>
		
		<div class="col-xs-10 fullscreen nopadding" >
		<div id="LeftWindowContent" class="function-body">
			<!--<div ui-view="functionWindow"></div>-->
			<button onclick="updateSolution()">Solution</button>
            
            
            
            
		</div>
		</div>
		</div>
		</div>
		</div>
		</div>
		</div><!--End of Function Window -->
		
		<!--Viewer-->
		<div class="col-xs-8">
		<div class="window">
		<div class="window-heading text-center">
			<ul class="nav nav-pills nocircum text-center" >
				<li role="presentation" style="width:100%" ><a href="#1" type="pill" class="window-title">VIEWER</a></li>
			</ul>
		</div>
		
		<div  class="window-body"><div class="content-container" id="viewDiv"></div></div>
		</div>
		</div>
		
		<!--Info-->
		<div class="col-xs-2">
		<div class=" window">
		<div ui-view="infoWindow"></div>
		</div><!--End of 3rd Window-->
		</div> <!--End of Info Column-->
		
		</div>
		</div>
	</div><!--End of #cotent div-->
	
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.js"></script>
	<script src="js/angular-ui-router.min.js"></script>
	<script src="js/viewAppp.js"></script>
	<script src="js/Controller.js"></script>
	<script src="https://js.arcgis.com/4.0/"></script>
	<script src="js/kmeans.js"></script>
	<script src="manager/manager.js"></script>
	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="js/bootstrap.min.js"></script>
	<script src="js/fileinput.js"></script>
	<script src="js/bootstrap-select.js"></script>
	<script type="text/javascript">
	reloadFlag = false;
	</script>
</body>
</html>