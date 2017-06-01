angular.module('pp.userProfile',['ngCookies']).controller('userProfileCtrl',['$scope','$http','$cookieStore','$location',function($scope,$http,$cookieStore,$location){
    $scope.profileForm = {};
    $scope.me = $cookieStore.get('me');
    $scope.saveAndUpdate = function(){
        $http.post('/api/user/profile/create',{
            userId : $scope.me._id,
            firstname : $scope.profileForm.firstname,
            lastname : $scope.profileForm.lastname,
            email : $scope.profileForm.email,
            phone : $scope.profileForm.phone,
            address : $scope.profileForm.address,
            state : $scope.profileForm.state,
            city : $scope.profileForm.city,
            gender : $scope.profileForm.gender,
            dob : $scope.profileForm.dob,
            rollNo : $scope.profileForm.rollNo,
            course : $scope.profileForm.course,
            branch : $scope.profileForm.firstname,
            yearOfPassing : $scope.profileForm.yearOfPassing,
            noOfBacklogs : $scope.profileForm.noOfBacklogs,
            percentage : $scope.profileForm.percentage,
            sgpa : $scope.profileForm.sgpa,
        }).success(function(result){
            $location.url('#/admin/dashboard');
        });
        
    }
}]);