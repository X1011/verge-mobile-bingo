'use strict';


'use strict';
/*jshint quotmark: false*/

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
var texts = [
	'webOS / Pre / Palm',
	'Companion Core',
	'IR blaster',
	'Fast and Furious',
	'S Pen',
	'crazy Samsung press conference',
	'segue',
	'Microsoft Kin',
	"Chris's connection is bad",
	'breaking news',
	'Vlad pronounces things wrong',
	'holding a phone up to the screen',
	'3-man Vergecast',
	'HTC HD2',
	'talking about food',
	'Bohn Zone',
	'violent Droid brand',
	'Samsung crazy',
	'Chris knows way too much about some obscure topic',
	'“We’ve got a lot to talk about”',
	'PureView',
	'Dieter spinning in his chair',
	'Sprint bashing',
	'2 or more Vergecasters in the same room'
];
