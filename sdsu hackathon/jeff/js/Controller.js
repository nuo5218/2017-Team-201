angular.module('viewApp')

        .controller('mapInfoController', ['$scope', function($scope) {
			
        }])

        .controller('mapWindowController', ['$scope', function($scope) {
			if (reloadFlag === true) {
				window.location.reload(false);
				reloadFlag = false;
			}
		}])

        .controller('mapFunctionController', ['$scope', function($scope) {
        }])
        

        .controller('modelInfoController', ['$scope', function($scope) {
            
            
        }])

        .controller('modelWindowController', ['$scope', function($scope) {
			reloadFlag = true;
        }])

        .controller('modelFunctionController', ['$scope', function($scope) {
            
    
        }])

		.controller('weatherInfo', ['$scope','$http', function($scope,$http) 
		{

		
			/* $http.get('http://api.openweathermap.org/data/2.5/forecast?zip=92373&appid=cebc286eab27816eee2d1b40c20c5e24').
						success(function(data, status, header, config)
						{
							$scope.weatherInfos = data;

						   weatherObj = $scope.weatherInfos;



						 tempTime = $scope.weatherInfos["list"][0].dt_txt
						 temp = Math.round(($scope.weatherInfos["list"][0].main.temp-273.15)*10)/10;

						 for(i = 0; i < 8; i++)
						 {
						   tempTime = $scope.weatherInfos["list"][i].dt_txt;
						   temp = Math.round(($scope.weatherInfos["list"][i].main.temp-273.15)*10)/10;
						   tempTimels.push(tempTime);
						   templs.push(temp);

						if($scope.weatherInfos["list"][i].weather[0].main == "Rain")
						{    if($scope.weatherInfos["list"][i].rain["3h"]==""||"0"){ rain = 0;}
						else rain = $scope.weatherInfos["list"][i].rain["3h"];

						}
					else rain =0;
						rainls.push(rain);
						};
						drawWeatherChart();
						}).
						error(function (data, status, headers, config)
						{

						}); */

            drawWeatherChart();
    
        }])

.controller('SNS', ['$scope','$http', function($scope,$http) 
		{
		
			function querySMS()
			{
				$http.get('http://localhost:8090/api/selfinflicteds').
				success(function(data, status, header, config)
				{
					$scope.SNSInfos = data;
					console.log(data);

			   }).
				error(function (data, status, headers, config)
				{

				});
				setTimeout(querySMS, 5000);
			}
			querySMS();
		
    
        }])

.controller('HospitalInfo', ['$scope','$http', function($scope,$http) 
		{
     
            
          function queryHospital()
			{
            //$http.get('http://localhost/arcbbq/manager/querydb.php?table=hospital').
			$http.get('/arcbbq/manager/querydb.php?table=hospital').
			success(function(data, status, header, config)
			{
				$scope.HospitalInfos = data;
				//console.log($scope.HospitalInfos);
           }).
			error(function (data, status, headers, config)
			{
			
			});
			
			}
			
     queryHospital();
            
		}])
          
		
       
            
    
        

;