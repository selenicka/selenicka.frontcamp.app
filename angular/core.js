//import styles from './sass/styles.scss';

var app = angular.module('app', ['ngComponentRouter', 'articles', 'ngResource']);

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

                return false;
            };
        }
    };
});

angular.module('articles', [])
    .service('articleService', articleService)
    .component('articles', {
        template:
            '<ng-outlet></ng-outlet>',
        $routeConfig: [
            {path: '/', name: 'Articles', component: 'articleList', useAsDefault: true },
            {path: '/article/:id/edit/', name: 'EditArticle', component: 'articleForm'},
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

    this.updateArticle = function (article) {
        return $http({
            method: 'POST',
            url: '/api/article/update/' + article._id,
            data: article
        });
    };

    this.removeArticle = function (id) {
        return $http({
            method: 'GET',
            url: '/api/article/delete/' + id
        });
    };

    this.getArticle = function(id) {
        return $http({
            method: 'GET',
            url: '/api/article/' + id
        });
    };
}

function articleListController(articleService, $window, $resource) {
    var $ctrl = this;
    
    this.$routerOnActivate = function() {
        var Article = $resource('/api', null, {
            query: {method: 'get', isArray: true}
        });

        return Article.get()
            .$promise.then(function(response) {
                $ctrl.articleList = response.articles;
            });
    };

    $ctrl.removeArticle = function (articleId) {
        var Article = $resource('/api/article/delete/:id', {id: '@id'}, {
            query: {method: 'get', isArray: true}
        });

        Article.get({ id: articleId })
            .$promise.then(function(response) {
                if(response.status === "ok"){
                    $window.location.href = '/';
                }
            });
    };
}

function articleItemController() {
    var $ctrl = this;
    console.log('item ctrl');
}

function articleFormController(articleService, $scope, $window) {
    var $ctrl = this;

    $ctrl.editing = false;

    this.$routerOnActivate = function(next) {
        var id = next.params.id;
        if(id) {
            $ctrl.editing = true;
            
            articleService.getArticle(id).then(function(response) {
                $scope.article = angular.copy(response.data.article);
            });
        }
    };

    $ctrl.saveArticle = function (article, form) {
        if(article._id) {
            articleService.updateArticle(article).then(function(response) {
                if(response.statusText === "OK"){
                    $window.location.href = '/';
                }
            });
        } else {
            articleService.addArticle(article).then(function (response) {
                if (response.statusText === "OK") {
                    if (form) {
                        $scope.article = angular.copy({});
                        form.$setPristine();
                        form.$setUntouched();
                    }
                }
            });
        }
    };
}