angular.module('pp.adminLogin',['ngCookies']).controller('adminLoginCtrl',['$scope','$http','$location','$cookieStore',function($scope,$http,$location,$cookieStore){
    $scope.loginForm = {};
    $scope.adminLogin = function(){
        $http.post('/api/admin/authenticate',{
                username : $scope.loginForm.username,
                password : $scope.loginForm.password
            }).success(function(result){
                //console.log(result);
                $cookieStore.put('me',result);
                $location.url('/admin/dashboard');                
                window.location.reload();
        });    
    };
    
}]);