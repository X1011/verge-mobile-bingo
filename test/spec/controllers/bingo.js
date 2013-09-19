'use strict';
/*global board*/

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
	
});

describe('board', function() {
	it('should populate the squares with the given texts', function() {
		expect(board(['text'], 1, 1)).toEqual([[{text: 'text'}]]);
	});
});
