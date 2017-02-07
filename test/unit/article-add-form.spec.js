describe('Unit: App', function () {
    var $el = {};

    beforeEach(angular.mock.module('app.templates'));

    beforeEach(angular.mock.inject(function($rootScope, $compile){
        $el.scope = $rootScope.$new();
        $el.element = angular.element('<add-article>' +
            '<h1>Add article</h1>' +
            '<form name="form">' +
                '<input type="text" name="artTitle" required="required" ng-model="article.title">' +
            '</form>' +
        '</add-article>');

        $el.element = $compile($el.element)($el.scope);
        $el.scope.$digest();
    }));

    it('should renger html properly', function() {
        expect($el.element.find('h1').text()).toBe('Add article');
    });

    it('should show message when invalid form', function() {
        var elementInput = $el.element.find('input');

        angular.element(elementInput).val('Some text').triggerHandler('input');
        $el.scope.$apply();

        expect(elementInput.hasClass('ng-valid')).toEqual(true);
    });
});