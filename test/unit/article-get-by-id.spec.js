describe('Service: HTTP calls.', function () {
    var httpBackend,
        myService,
        $el = {};

    beforeEach(angular.mock.module('articles'));

    beforeEach(angular.mock.inject(function($httpBackend, _articleService_){
        httpBackend = $httpBackend;
        myService = _articleService_;
    }));

    afterEach(function() {
        $el.$httpBackend.verifyNoOutstandingExpectation();
        $el.$httpBackend.verifyNoOutstandingRequest();
    });

    describe('Get list', function () {
        beforeEach(angular.mock.inject(function ($injector) {
            $el.$httpBackend = $injector.get('$httpBackend');
            $el.authRequestHandler = $el.$httpBackend.when('GET', '/api')
                .respond(200, [
                    {
                        title: "Economists Want to Be Members of Donald Trump’s Team -- Really",
                        source: "Bloomberg"
                    }
                ]);

            $el.articleService = $injector.get('articleService');
        }));

        it('from /api', function () {
            var articleList = [
                {
                    "title": "Economists Want to Be Members of Donald Trump’s Team -- Really",
                    "source": "Bloomberg"
                }
            ];

            httpBackend.expectGET('/api');
            myService.getArticles().then(function (responce) {
                expect(responce.data).toEqual(articleList);
            });
            httpBackend.flush();
        });
    });

    describe('Get article', function () {
        beforeEach(angular.mock.inject(function ($injector) {
            $el.$httpBackend = $injector.get('$httpBackend');
            
            $el.authRequestHandler = $el.$httpBackend.when('GET', '/api/article/1234567890')
                .respond(200, {
                        title: "Economists Want to Be Members of Donald Trump’s Team -- Really",
                        source: "Bloomberg"
                    });

            $el.articleService = $injector.get('articleService');
        }));

        it('from /api/article/:id', function () {
            var id = 1234567890,
                article = {
                    "title": "Economists Want to Be Members of Donald Trump’s Team -- Really",
                    "source": "Bloomberg"
                };

            httpBackend.expectGET('/api/article/' + id);
            myService.getArticle(id).then(function (responce) {
                expect(responce.data).toEqual(article);
            });
            httpBackend.flush();
        });
    });
});