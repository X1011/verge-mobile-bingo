'use strict';

function Bingo($scope) {
	$scope.board = board(texts, 5, 5);
}

function board(texts, rows, cols) {
	var text = 0;
	var board = new Array(rows);
	for (var i = 0; i < rows; i++) {
		var row = board[i] = new Array(cols);
		for (var j = 0; j < cols; j++)
			row[j] = {text: texts[text++]};
	}
	return board;
}

//todo: define this in a separate file
var texts = ['1', '2'];
