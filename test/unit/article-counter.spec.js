describe('Unit: App', function () {
    var $componentController;

    beforeEach(angular.mock.module('articles'));

    beforeEach(angular.mock.inject(function(_$componentController_){
        $componentController = _$componentController_;
    }));

    it('should expose a counter object', function() {
        // Here we are passing actual bindings to the component
        var bindings = {article: {name: 'Wolverine'}};
        var ctrl = $componentController('articlesCounter', null, bindings);

        expect(ctrl.article).toBeDefined();
        expect(ctrl.article.name).toBe('Wolverine');
    });

    /*it('Replaces the element with the appropriate content', function() {
     // Compile a piece of HTML containing the directive
     var childElement = angular.element("<articles-counter></articles-counter>");
     var element = $compile(childElement)($rootScope);
     // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
     $rootScope.$digest();
     // Check that the compiled element contains the templated content
     expect(element.html()).toContain("Total: 8 articles");
     });*/
});