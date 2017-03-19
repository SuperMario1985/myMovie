;(function (angular) {
    "use strict";

    // 创建一个模块,所有子模块需要在主模块中引入
    var app  = angular.module('moviecat',[
      'moviecat.details', //  先引用，先匹配
      'moviecat.movie_list',
      'moviecat.auto-active',
      'ngRoute'
      ]);

    // 创建控制器 搜索模块
    app.controller('mainController',['$scope','$route',function($scope,$route){

      $scope.search=function(){
        // 改变url的值
        $route.updateParams({
          movieType:'search',
          q:$scope.query
        })
      }
    }]);

})(angular);

//