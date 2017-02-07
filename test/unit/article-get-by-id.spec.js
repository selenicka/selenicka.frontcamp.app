describe('Service: HTTP calls', function () {
    var httpBackend,
        myService,
        $el = {};

    beforeEach(angular.mock.module('article'));

    beforeEach(angular.mock.inject(function($httpBackend, _articleService_){
        httpBackend = $httpBackend;
        myService = _articleService_;
    }));

    /*it('should call the API', function() {
        httpBackend.expectGET(/\/api\/things/).respond('');
        myService.getArticles();
        httpBackend.flush();
    });*/

    describe('HTTP get list', function() {
        beforeEach(angular.mock.inject(function($injector) {
            // Set up the mock http service responses
            $el.$httpBackend = $injector.get('$httpBackend');
            // backend definition common for all tests
            $el.authRequestHandler = $el.$httpBackend.when('GET', '/api')
                .respond({userId: 'userX'});

            $el.articleService = $injector.get('articleService');
            console.log($el.$httpBackend);
        }));

        /*afterEach(function() {
            $el.$httpBackend.verifyNoOutstandingExpectation();
            $el.$httpBackend.verifyNoOutstandingRequest();
        });*/

        it('should return smth', function() {
            console.log($el);
        });


        /*var myThings;
        var errorStatus = '';
        var handler;

        beforeEach(function() {
            myThings = [];
            errorStatus = '';
            handler = {
                success: function(data) {
                    myThings = data;
                },
                error: function(data) {
                    errorStatus = data;
                }
            };
            spyOn(handler, 'success').and.callThrough();
            spyOn(handler, 'error').and.callThrough();
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should return an array of things on success', function() {
            var response = ['one thing', 'another thing'];

            httpBackend.whenGET(/\/api/).respond(response);
            myService.getArticles().then(handler.success, handler.error);
            httpBackend.flush();

            expect(handler.success).toHaveBeenCalled();
            expect(myThings).toEqual(response);
            expect(handler.error).not.toHaveBeenCalled();
            expect(errorStatus).toEqual('');
            console.log('eee');
        });

        it('should call the API', function() {
            var items = myService.getArticles(),
                articleList = {
                    articles: [
                        {
                            "title":"Economists Want to Be Members of Donald Trump’s Team -- Really",
                            "source":"Bloomberg"
                        },
                        {
                            "title":"Russian skeleton athletes have suspension lifted by IBSF",
                            "source":"BBC Sport"
                        }
                    ]
                };

            expect(items).toBeDefined();
            expect(items.length).toBe(0);

            httpBackend.expectGET('/api').respond('hi');
            myService.getArticles().then(function(data) {
                console.log(data);
                expect(data).toEqual('hi');
            });
            httpBackend.flush();
        });
        */
    });
});