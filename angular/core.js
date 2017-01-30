//import styles from './sass/styles.scss';

var app = angular.module('app', ['ngComponentRouter', 'articles']);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.value('$routerRootComponent', 'app');

app.component('app', {
    templateUrl: './template/main.html',
    $routeConfig: [
        {path: '/...', name: 'Articles', component: 'articles', useAsDefault: true }
    ]
});

app.controller('indexController', ['$scope', '$http', function ($scope, $http) {
    $scope.showAddForm = false;

    getArticlesList();

    $scope.saveArticle = function (article) {
        $http({
            method: 'POST',
            url: '/article/save',
            data: article
        }).then(function successCallback(response) {
            console.log(response);
            $scope.showAddForm = false;
            getArticlesList();
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };

    function getArticlesList() {
        $http({
            method: 'GET',
            url: '/api'
        }).then(function successCallback(response) {
            $scope.articleList = response.data.articles;
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });
    };

}]);

app.directive('contentValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.contentValidation = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (modelValue.length > 20) {
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
});

angular.module('articles', [])
    .service('articleService', articleService)
    .component('articles', {
        template:
            '<ng-outlet></ng-outlet>' +
            '<a class="btn" ng-link="[\'AddArticle\']">Add Article</a>',
        $routeConfig: [
            {path: '/', name: 'Articles', component: 'articleList', useAsDefault: true },
            {path: '/article/:id', name: 'ArticleDetails', component: 'articleItem'},
            {path: '/article/add', name: 'AddArticle', component: 'articleForm' }
        ]
    })
    .component('articleList', {
        templateUrl: './template/article-list.html',
        controller: articleListController
    })
    .component('articleItem', {
        templateUrl: './template/article-item.html',
        controller: articleItemController
    })
    .component('articleForm', {
        template: '<add-article></add-article>',
        controller: articleFormController
    })
    .directive('addArticle', function() {
        return {
            restrict: 'E',
            templateUrl: './template/add-article.html'
        };
    });

function articleService($http) {
    this.getArticles = function() {
        return $http({
            method: 'GET',
            url: '/api'
        });
    };

    this.addArticle = function (article) {
        return $http({
            method: 'POST',
            url: '/api/article/save',
            data: article
        });
    };
}

function articleListController(articleService) {
    var $ctrl = this;
    this.$routerOnActivate = function() {
        return articleService.getArticles().then(function(response) {
            $ctrl.articleList = response.data.articles;
        });
    }
}

function articleItemController() {
    var $ctrl = this;
    console.log('item ctrl');
}

function articleFormController(articleService, $scope) {
    var $ctrl = this;

    $ctrl.saveArticle = function (article, form) {
        articleService.addArticle(article).then(function(response) {
            if(response.statusText === "OK"){
                if (form) {
                    $scope.article = angular.copy({});
                    form.$setPristine();
                    form.$setUntouched();
                }
            }
        });
    };
}