angular.module('pp.welcome',[]).controller('welcomeCtrl',['$scope','$http',function($scope,$http){
    $scope.loadJob = function(){
        $http.get('/api/find/job').success(function(result){
            $scope.jobs = result;
        });
    }
}]);