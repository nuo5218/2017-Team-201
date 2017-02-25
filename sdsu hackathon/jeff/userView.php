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
		
				<div class="col-xs-12 fullscreen nopadding" >
				<div id="LeftWindowContent" class="function-body">
				
				<h3 align=center>Rescue Request Form</h3>
				
				<form action="submitform.php" method=post>
					<p>Number of people:</p>
					<input type="text" name="number"/><br/>
					
					<p>Message:</p>
					<textarea name="message" rows="10" cols="50"></textarea>
					
					<p>Pick your location:</p>
					Address: <input type="text" size="50" name="address" id="address"/>
					Longitude: <input type="text" size="15" name="longitude" id="longitude"/>
					Latitude: <input type="text" size="15" name="latitude" id="latitude"/>
					<input type="submit" name="submit" value="Submit">
				</form>
				
                </div>
				</div>
				</div>
				</div>
				</div>
                </div>
				</div><!--End of Function Window -->
				
				<!--Viewer-->
				<div class="col-xs-10">
				<div class="window">
				<div class="window-heading text-center">
					<ul class="nav nav-pills nocircum text-center" >
						<li role="presentation" style="width:100%" ><a href="#1" type="pill" class="window-title">VIEWER</a></li>
					</ul>
				</div>
				
				<div ui-view="viewer" class="window-body"></div>
				</div>
				</div>
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
	<?php include('user/user.php') ?>
	<?php include('user/submitform.php') ?>
	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="js/bootstrap.min.js"></script>
	<script src="js/fileinput.js"></script>
	<script src="js/bootstrap-select.js"></script>
	<script type="text/javascript">
    function addFolder() {
        $('#doctree').append("<ul ><li><span><i class='fa fa-folder-open'></i>" + $("#docfolderName").val() + "</span><ul></ul></li></ul>");
        $("#docfolderName").val('');
    }

    function uploadFile() {
        $("#" + $("#uploadFolder").val()).append("<li><span><i class='fa fa-files-o'></i></span><a href='#none'onclick='docfileClick('invoice 1',contactFile[2].notes);'> Invoice 1</a></li>");
        $("#docfolderName").val('');
    }

 
    function showFileUploadModal() {
        $('#doc_upload_modal').modal('show');
    }

    function showNewFolderModal() {
        $('#doc_newfolder_modal').modal('show');
    }
        
    
        
    function menuModel(){
        $('#window1').html("<a href='#1' type='pill' class='window-title'>MODEL</a>");
         $('#window3').html("<li role='presentation'  class='active btnhalfwidth' data-toggle='pill'><a href='#home' class='btnfullwidth window-title' >Information</a></li><li role='presentation' class='btnhalfwidth'  data-toggle='pill'><a href='#1' class='btnfullwidth window-title'>Link File</a></li>");
    }
    function menuTeam(){
         $('#window1').html("<a href='#1' type='pill' class='window-title'>TEAM</a>");
         $('#window3').html("<li role='presentation' style='width:100%'><a href='#1' type='pill' class='window-title'>TEAM MEMBER</a></li>");
    }
    function menuDoc(){
         $('#window1').html("<a href='#1' type='pill' class='window-title'>DOCUMENT</a>");
         $('#window3').html("<li role='presentation' style='width:100%'><a href='#1' type='pill' class='window-title'>FILE NOTE</a></li>");
    }

        function showModel() {
        //var viewer = new xViewer('viewer-canvas');
        browser.load("content/rac_advanced_sample_project_DPoW.json");
        viewer.load("content/rac_advanced_sample_project.wexBIM");
        
        viewer.start();
        $(window).load(function () {
            $('.scrollable').css('height', 0.93* window.innerHeight + 'px');
        });

    }

</script>
</body>
</html>