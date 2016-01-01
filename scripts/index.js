var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'homeController',
    })
	.otherwise({redirectTo: '/'});

}]);

app.controller("homeController", function($scope, $location, $http, $interval) {
    
    $scope.score = 0;
    $scope.playing = false;
    $scope.buttonOne = "A";
    $scope.buttonTwo = "B";
    $scope.backgroundColor = 'teal';
    $scope.strikes = 0;
    $scope.seconds = 0;
    $scope.startTimer;
    $scope.endTimer;
    
    $scope.backgroundColors = ['blue', 'red', 'yellow', 'silver', 'brown', 'purple', 'pink', 'orange'];
    
    $scope.startGame = function() {
        
        $scope.score = 0;    
        $scope.strikes = 0;
        $scope.seconds = 0;
        $(".result").html("");
        
        $scope.playing = true;
        $scope.startTimer = new Date();
        startCounting();
        
    }
    
    function startCounting() {
        $scope.timerInterval = setInterval(function() {
        var temp = new Date();
        var diff = (temp.getTime() - $scope.startTimer.getTime()) / 1000;
        $scope.seconds = parseInt(diff);
        $scope.$apply();
    }, 1000);
        
    }
    
    $scope.newRound = function() {
        
        var color = $scope.backgroundColors[Math.floor(Math.random()*$scope.backgroundColors.length)];
        
        var tempColors = [];
        
        angular.forEach($scope.backgroundColors, function(value, key) {
           
            if (value !== color)
                tempColors.push(value);
        });
        
        var secondColor = tempColors[Math.floor(Math.random()*tempColors.length)];
        
        
        $scope.buttonOne = color;
        $scope.backgroundColor = color;
        $scope.buttonTwo = secondColor;
        
        var num = Math.floor(Math.random() * 2);
        
        if (num === 0)
        {
            $scope.buttonOne = color;
            $scope.backgroundColor = color;
            $scope.buttonTwo = secondColor;
        } else
        {
            $scope.buttonTwo = color;
            $scope.backgroundColor = color;
            $scope.buttonOne = secondColor;
        }
        
    }
    
    $scope.answer = function(value) {
        
        if (value === $scope.backgroundColor)
        {
            $(".result").html("Correct!");  
            $scope.score++;
        } else
        {
            $(".result").html("Wrong!");
            $scope.strikes++;
        }
        
        if ($scope.strikes === 3)
        {
            $scope.playing = false;
            clearInterval($scope.timerInterval);
            return;
        }
        
        $scope.newRound();
        
    }
    
    $scope.newRound();
    
});

