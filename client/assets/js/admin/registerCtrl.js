angular.module('pp.adminRegister',['ngCookies']).controller('adminRegisterCtrl',['$scope','$http','$cookieStore','$location',function($scope,$http,$cookieStore,$location){
    $scope.registerForm = {};
    $scope.registerAdmin = function(){
        if($scope.registerForm.password === $scope.registerForm.confirmPassword){
            $http.post('/api/admin/register',{
                username : $scope.registerForm.username,
                password : $scope.registerForm.password,
                email : $scope.registerForm.email
            }).success(function(result){
                //console.log(result);
                $cookieStore.put('me',result);
                $location.url('/admin/dashboard');                
                window.location.reload();
            });
        }
        else{
            alert('password do not match');
        }
    };
}]);