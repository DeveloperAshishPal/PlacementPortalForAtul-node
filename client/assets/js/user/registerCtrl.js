angular.module('pp.userRegister',['ngCookies']).controller('userRegisterCtrl',['$scope','$http','$cookieStore','$location',function($scope,$http,$cookieStore,$location){
    $scope.registerForm = {};
    $scope.registerUser = function(){
        if($scope.registerForm.password === $scope.registerForm.confirmPassword){
            $http.post('/api/user/register',{
                username : $scope.registerForm.username,
                password : $scope.registerForm.password,
                email : $scope.registerForm.email
            }).success(function(result){
                //console.log(result);
                $cookieStore.put('me',result);
                $location.url('/user/dashboard');                
                window.location.reload();
            });
        }
        else{
            alert('password do not match');
        }
    };
}]);