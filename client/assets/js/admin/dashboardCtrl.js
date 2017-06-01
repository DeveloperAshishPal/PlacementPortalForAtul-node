angular.module('pp.adminDashboard',['ngCookies']).controller('adminDashboardCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.me = $cookieStore.get('me');
    $scope.jobForm = {};
    $scope.jobpost = function(){
        $http.post('/api/job/create',{
            title : $scope.jobForm.title,
            company : $scope.jobForm.company,
            location : $scope.jobForm.location,
            salary : $scope.jobForm.salary
        }).success(function(result){
            $scope.jobForm.title = '';
            $scope.jobForm.company = '';
            $scope.jobForm.location = '';
            $scope.jobForm.salary = '';
        });
    };
    
    $scope.loadJob = function(){
        $http.get('/api/find/job').success(function(result){
            $scope.jobs = result;
        });
    }
    
    $scope.loadUser = function(){
        $http.get('/api/find/user').success(function(result){
            $scope.users = result;
        });
    }
}]);