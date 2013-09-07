'use strict';

describe('Bingo', function() {

	var bingo,
	    scope;
	
	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		bingo = $controller('Bingo', {
			$scope: scope
		});
	}));
	
	it('should do nothing', function() {
	});
});
