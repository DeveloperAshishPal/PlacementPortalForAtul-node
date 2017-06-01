/*angular module*/
/*pp means placement portal*/
var app = angular.module('pp', ['ngRoute'
                                    , 'pp.about'
                                    , 'pp.welcome'
                                    , 'pp.contact'
                                    , 'pp.adminLogin'
                                    , 'pp.adminRegister'
                                    , 'pp.userLogin'
                                    , 'pp.userRegister'
                                    , 'pp.adminDashboard'
                                    , 'pp.userDashboard'
                                    , 'pp.userProfile'
                                    ]);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'welcomeCtrl'
        , templateUrl: 'views/public/welcome.html'
    }).when('/public/about', {
        controller: 'aboutCtrl'
        , templateUrl: 'views/public/about.html'
    }).when('/public/contact', {
        controller: 'contactCtrl'
        , templateUrl: 'views/public/contact.html'
    }).when('/login', {
        controller: 'userLoginCtrl'
        , templateUrl: 'views/user/login.html'
    }).when('/user/dashboard', {
        controller: 'userDashboardCtrl'
        , templateUrl: 'views/user/dashboard.html'
    }).when('/register', {
        controller: 'userRegisterCtrl'
        , templateUrl: 'views/user/register.html'
    }).when('/recruiter/login', {
        controller: 'adminLoginCtrl'
        , templateUrl: 'views/admin/login.html'
    }).when('/admin/dashboard', {
        controller: 'adminDashboardCtrl'
        , templateUrl: 'views/admin/dashboard.html'
    }).when('/admin/register', {
        controller: 'adminRegisterCtrl'
        , templateUrl: 'views/admin/register.html'
    }).when('/user/dashboard/profile/edit', {
        controller: 'userProfileCtrl'
        , templateUrl: 'views/user/edit.html'
    }).otherwise({
        redirectTo: '/'
    });
});

app.controller('mainCtrl',['$scope','$cookieStore',function($scope,$cookieStore){
    $scope.person = $cookieStore.get('me');
    if($cookieStore.get('me')===null || $cookieStore.get('me')===undefined ){
        $scope.me = false;
    }else{
        $scope.me = true;
        if($scope.person.isAdmin === true){
            $scope.dashboardUrl = '#/admin/dashboard';
        }else{
        $scope.dashboardUrl = '#/user/dashboard';
    }
    }
    $scope.logout = function(){
        $cookieStore.put('me',null);
        $scope.me = false;
        $scope.person = null;
        window.location = '#/';
    }
}]);