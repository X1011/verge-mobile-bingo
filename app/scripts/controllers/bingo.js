'use strict';

function Bingo($scope) {
	$scope.board = newBoard(5, 5);
}

function newBoard(rows, cols) {
	var board = new Array(rows);
	for (var i = 0; i < rows; i++) {
		var row = board[i] = new Array(cols);
		for (var j = 0; j < cols; j++)
			row[j] = {};
	}
	return board;
}
