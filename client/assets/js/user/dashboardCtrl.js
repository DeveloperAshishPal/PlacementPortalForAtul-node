angular.module('pp.userDashboard',['ngCookies']).controller('userDashboardCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.me = $cookieStore.get('me');
    $scope.loadData = function(){
        $http.get('/api/user/profile?userId=' + $scope.me._id).success(function(res){
            $scope.user = res;
        });
    }
    
    $scope.loadJob = function(){
        $http.get('/api/find/job').success(function(result){          
            $scope.jobs = result;
        });
    }
}]);