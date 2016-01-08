var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
    .when('/', {
        templateUrl: 'main.html',
        controller: 'mainController',
    })
    .when('/strike', {
        templateUrl: 'home.html',
        controller: 'homeController',
    })
    .when('/timed', {
        templateUrl: 'timed.html',
        controller: 'timedController',
    })
	.otherwise({redirectTo: '/'});

}]);

app.controller("mainController", function($scope, $location, $http, $interval) {
    
    $scope.goStrike = function() {
        $location.path('/strike');
    }
    
    $scope.goTimed = function() {
        $location.path('/timed');
    }
    
});

app.controller("homeController", function($scope, $location, $http, $interval) {
    
    $scope.score = 0;
    $scope.playing = false;
    $scope.buttonOne = 'white';
    $scope.buttonTwo = 'white';
    $scope.backgroundColor = 'white';
    $scope.strikes = 0;
    $scope.seconds = 0;
    $scope.startTimer;
    $scope.endTimer;
    $scope.result = "";
    $scope.finalScore = 0;
    $scope.gameOver = false;

    $scope.backgroundColors = ['green', 'red', 'yellow', 'gray', 'purple', 'orange', 'white', 'cyan'];
    
    $scope.startGame = function() {
        
        $scope.score = 0;    
        $scope.strikes = 0;
        $scope.seconds = 0;
        $scope.result = "";
        $scope.finalScore = 0;
        
        $scope.playing = true;
        $scope.startTimer = new Date();
        startCounting();
        
        $scope.newRound();
        
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
        
        var tempNum = Math.floor(Math.random() * $scope.backgroundColors.length);
        
        if (tempNum > ($scope.backgroundColors.length / 2))
        {
            $scope.buttonOneColor = $scope.backgroundColors[tempNum];
            
            $scope.buttonTwoColor = $scope.backgroundColor;
        } else
        {
            $scope.buttonOneColor = $scope.backgroundColors[tempNum];
            
            $scope.buttonTwoColor = $scope.backgroundColor;
        }
        
        
    }
    
    $scope.answer = function(value) {
        
        if (value === $scope.backgroundColor)
        {
            $scope.result = "Correct!";  
            $scope.score++;
        } else
        {
            $scope.result = "Wrong!";
            $scope.strikes++;
        }
        
        if ($scope.strikes === 3)
        {
            $scope.playing = false;
            $scope.backgroundColor = 'white';
            clearInterval($scope.timerInterval);
            $scope.scoring();
            return;
        }
        
        $scope.newRound();
        
    }
    
    $scope.scoring = function() {
        
        var initialScore = $scope.score * 10;
        
        var timeTaken = $scope.seconds;
        console.log("Time:", timeTaken);
        
        var correctResponses = $scope.score;
        console.log("Correct:", correctResponses);
        
        var timePerResponse = timeTaken / correctResponses;
        console.log("Time per: ", timePerResponse);
        
        var finalMultiplier = Math.floor((1/timePerResponse) * 10);
        console.log("Multiplier:", finalMultiplier);
        
        var finalScore = (finalMultiplier * correctResponses) + initialScore;
        
        console.log("Score: ", finalScore);
        
        $scope.finalScore = finalScore;
        
        $scope.gameOver = true;
        
    }
    
    $scope.goHome = function() {
        $location.path('/');
    }
    
});

app.controller("timedController", function($scope, $location, $http, $interval) {
    
    $scope.score = 0;
    $scope.playing = false;
    $scope.buttonOne = 'white';
    $scope.buttonTwo = 'white';
    $scope.backgroundColor = 'white';
    $scope.strikes = 0;
    $scope.seconds = 0;
    $scope.startTimer;
    $scope.endTimer;
    $scope.result = "";
    $scope.finalScore = 0;
    $scope.gameOver = false;

    $scope.backgroundColors = ['green', 'red', 'yellow', 'gray', 'purple', 'orange', 'white', 'cyan'];
    
    $scope.startGame = function() {
        
        $scope.score = 0;    
        $scope.strikes = 0;
        $scope.seconds = 0;
        $scope.result = "";
        $scope.finalScore = 0;
        
        $scope.playing = true;
        $scope.startTimer = new Date();
        startCounting();
        
        $scope.newRound();
        
    }
    
    function startCounting() {
        $scope.timerInterval = setInterval(function() {
        var temp = new Date();
        var diff = (temp.getTime() - $scope.startTimer.getTime()) / 1000;
        $scope.seconds = parseInt(diff);
            
            console.log($scope.seconds);
            
            if ($scope.seconds === 60)
            {
                $scope.playing = false;
                $scope.backgroundColor = 'white';
                clearInterval($scope.timerInterval);
                $scope.scoring();
            }
            
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
        
        var tempNum = Math.floor(Math.random() * $scope.backgroundColors.length);
        
        if (tempNum > ($scope.backgroundColors.length / 2))
        {
            $scope.buttonOneColor = $scope.backgroundColors[tempNum];
            
            $scope.buttonTwoColor = $scope.backgroundColor;
        } else
        {
            $scope.buttonOneColor = $scope.backgroundColors[tempNum];
            
            $scope.buttonTwoColor = $scope.backgroundColor;
        }
        
        
    }
    
    $scope.answer = function(value) {
        
        
        if (value === $scope.backgroundColor)
        {
            $scope.result = "Correct!";  
            $scope.score++;
        } else
        {
            $scope.result = "Wrong!";
            $scope.strikes++;
        }
        
        $scope.newRound();
        
    }
    
    $scope.scoring = function() {
        
        $scope.backgroundColor = 'white';
        
        var initialScore = $scope.score * 10;
        
        var initialMisses = $scope.strikes * 5;
        
        var finalScore = initialScore - initialMisses;;
        
        if (finalScore < 0)
            finalScore = 0;
        
        $scope.finalScore = finalScore;
        
        $scope.gameOver = true;
        
    }
    
    $scope.goHome = function() {
        $location.path('/');
    }
    
    //$scope.newRound();
    
});

