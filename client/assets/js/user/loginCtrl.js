angular.module('pp.userLogin',['ngCookies']).controller('userLoginCtrl',['$scope','$http','$location','$cookieStore',function($scope,$http,$location,$cookieStore){
    $scope.loginForm = {};
    $scope.userLogin = function(){
        $http.post('/api/user/authenticate',{
                username : $scope.loginForm.username,
                password : $scope.loginForm.password
            }).success(function(result){
                //console.log(result);
                $cookieStore.put('me',result);
                $location.url('/user/dashboard');                
                window.location.reload();
        });    
    };
    
}]);