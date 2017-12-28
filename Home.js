/**
 * Created by Teju on 7/7/2017.
 */
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "Main.html"
        })
        .when("/log", {
            templateUrl : "Log.html",
            controller:"LogCtrl"
        })
        .when("/Tab", {
            templateUrl : "Employee Details.html",
            css:"Home.css"
        })
        .when("/Tab1", {
            templateUrl : "Employee View.html",
            css:"Home.css",
            controller:"FourthCtrl"
        })
        .when("/Tab2", {
            templateUrl : "Employee View Add.html",
            css:"Home.css",
            controller:"ThirdCtrl"
        })
});

app.service('DataService', function ($http) {
    this.getData=function () {
        return $http.get("main.json");
    }
    this.i=-1;
});

app.controller('SecondCtrl', function($scope, DataService) {
    DataService.getData().then(function (resp) {
        $scope.Table1 = resp.data.Prerak;
        $scope.list = $scope.Table1;
    });

    $scope.rem = function (index) {
        $scope.list.splice(index, 1);
    };

    $scope.Edit = function (index) {

        DataService.i = index;
        console.log(DataService.i);
    };

});
app.controller('ThirdCtrl', function ($scope, DataService) {
    DataService.getData().then(function (resp) {
        $scope.Table1 = resp.data.Prerak;
    });


    $scope.Save1 = function () {
        $scope.list.push({
            Emp_id: $scope.EId,
            FirstName: $scope.fName,
            LastName: $scope.lName,
            MiddleName: $scope.mName,
            date: $scope.Bdate,
            month: $scope.Bmonth,
            year: $scope.Byear
        });
    };
});

app.controller('FourthCtrl', function ($scope, DataService) {
    DataService.getData().then(function (resp) {
        $scope.Table1 = resp.data.Prerak;
    });

    $scope.View = $scope.list[DataService.i];

    $scope.Save = function () {
        var x1 = angular.element(document.getElementById("EId"));
        var x2 = angular.element(document.getElementById("fName"));
        var x3 = angular.element(document.getElementById("mName"));
        var x4 = angular.element(document.getElementById("lName"));
        var x5 = angular.element(document.getElementById("Bdate"));
        var x6 = angular.element(document.getElementById("Bmonth"));
        var x7 = angular.element(document.getElementById("Byear"));

        console.log(x1.val());
        $scope.user = {
            Emp_id: x1.val(),
            FirstName: x2.val(),
            LastName: x4.val(),
            MiddleName: x3.val(),
            date: x5.val(),
            month: x6.val(),
            year: x7.val()
        };

        console.log($scope.user);

        $scope.list[DataService.i] = angular.copy($scope.user);

        console.log($scope.list[DataService.i]);
        console.log(DataService.i);
    }

});
