describe('Component: article counter', function () {
    var $componentController;

    beforeEach(angular.mock.module('articles'));

    beforeEach(angular.mock.inject(function(_$componentController_){
        $componentController = _$componentController_;
    }));

    it('should expose a counter object', function() {
        var bindings = {article: {source: 'BBC'}};
        var ctrl = $componentController('articlesCounter', null, bindings);

        expect(ctrl.article).toBeDefined();
        expect(ctrl.article.source).toBe('BBC');
    });

    it('should count amount of articles', function() {
        var bindings = {
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

        var ctrl = $componentController('articlesCounter', null, bindings);

        expect(ctrl.articles.length).toEqual(2);
    });
});