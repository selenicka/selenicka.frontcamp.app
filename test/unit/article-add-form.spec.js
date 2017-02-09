describe('Directive: rendering', function () {
    var $el = {};

    beforeEach(angular.mock.module('customValidators'));
    beforeEach(angular.mock.module('app.templates'));

    beforeEach(angular.mock.inject(function($rootScope, $compile){
        $el.scope = $rootScope.$new();
        $el.element1 = angular.element('<add-article>' +
            '<h1>Add article</h1>' +
            '<form name="form">' +
                '<input type="text" required="required" name="artTitle" ng-model="article.title">' +
            '</form>' +
        '</add-article>');

        $el.element2 = angular.element('<add-article>' +
            '<h1>Add article</h1>' +
            '<form name="form">' +
                '<input type="text" required="required" name="artContent" ng-model="article.description" content-validation>' +
            '</form>' +
        '</add-article>');

        $el.scope.article = { description: '' };
        $el.element1 = $compile($el.element1)($el.scope);
        $el.element2 = $compile($el.element2)($el.scope);
        $el.form = $el.scope.form;
        $el.scope.$digest();
    }));

    it('should renger html properly', function() {
        expect($el.element1.find('h1').text()).toBe('Add article');
    });

    describe('form validation', function() {
        it('should show message when required field is empty', function() {
            var elementInput = $el.element1.find('input');

            angular.element(elementInput).val('Some text').triggerHandler('input');
            $el.scope.$apply();

            expect(elementInput.hasClass('ng-valid')).toEqual(true);
        });

        it('should show message when field contains less than 20 symbols', function() {
            var elementInput = $el.element2.find('input');

            $el.form.artContent.$setViewValue('Some text');
            $el.scope.$digest();

            expect($el.form.artContent.$valid).toBe(false);
            expect($el.form.artContent.$error.contentValidation).toBeDefined();
            expect(elementInput.hasClass('ng-valid-content-validation')).toEqual(false);
        });

        it('should be valid when field contains more than 20 symbols', function() {
            var elementInput = $el.element2.find('input');

            $el.form.artContent.$setViewValue('Some suitable text for validation');
            $el.scope.$digest();

            expect($el.form.artContent.$valid).toBe(true);
            expect($el.form.artContent.$error.contentValidation).toBeUndefined();
            expect(elementInput.hasClass('ng-valid-content-validation')).toEqual(true);
        });
    });
});