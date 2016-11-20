/**
 * Created by CesyZhao on 2016/10/16.
 */
    angular.module("app", [])
.controller("musicList",["$scope","musicService",function($scope,musicService){
    musicService.getAll(function(data){
        $scope.list = data;
    })
}])
.service("musicService",["$http",function($http){
    this.getAll = function(handler){
        $http.get("data/musics.json").success(function(data){
            handler(data);
        })
    }
}])