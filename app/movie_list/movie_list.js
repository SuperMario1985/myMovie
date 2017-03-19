;(function(angular){
  'use strict';
  // 这里是正在热模块
  var app = angular.module('moviecat.movie_list',[
    'ngRoute',
    'moviecat.jsonp']);

  // 路由
  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/:movieType/:page?',{
      // 这时路径是相对于app.js（主模块）所在目录
      templateUrl:'./movie_list/view.html',
      controller:'movie_listController'
    })
    .otherwise({
      redirectTo:'in_theaters'
    })

  }]);

  // 创建控制器
  app.controller('movie_listController',[
    '$scope','$http','$routeParams','$route','$window','MyService'
    ,function($scope,$http,$routeParams,$route,$window,MyService){
    console.log($routeParams);
    //加载动画显示。
     $scope.loading=false;

     var page = ($routeParams.page||'1')-0;//是字符串
     $scope.page=page;
     var start = (page-1)*5;

      // 跨域请求
      MyService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q,
        {start:start,count:5},function(data){
          $scope.data=data;
          $scope.total=data.total; 
          $scope.totalPage= $window.Math.ceil($scope.total/data.count); // 总的页数
          $scope.loading=true;
          //通知angular我们的数据模型发生了改变。
          $scope.$apply();
        });

      // 下一页按钮的点击事件
      $scope.getPage=function(nowPage){
        if(nowPage<1||nowPage>$scope.totalPage){
          return;
        }

        // 改变锚点值。
        $route.updateParams({page:nowPage});
      }
  }]);
})(angular);