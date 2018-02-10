var helloit = game || {};

game.createQuestionBar = function () {
    var content = game.createQuestion();

    return game.createCenteredContent(content);
}

game.createQuestion = function() {

    var result = $('<div class="question">1+1</div>=<div class="answer"></div>');

    return result;
}

game.createNumbersBar = function () {
    var content = game.createNumbers();

    return game.createCenteredContent(content);
}

game.createNumbers = function() {

    var result = $('<div></div>');
    for(var i = 0; i < 10; i++) {
        var number = game.createNumber(i);
        result.append(number);
    }

    return result.children();
}

game.createNumber = function(value) {
    var result = $('<div class="number"></div>')
        .append($('<div></div>')
            .append(value));

    result.attr('number', value);

    return result;

}

game.updateWithAnswerDigit = function(digit) {
    var answer = $(".answer");

    if (answer.html().length == 2) {
        answer.html(digit);
    }
    else {
        answer.append(digit);
    }
}

game.updateQuestion = function(left, right) {
    $(".question").html(left + "X" + right)
}

game.randomNumber = function(numbersArray) {
    return numbersArray[Math.floor((Math.random() * numbersArray.length))];
}

game.randomQuestion = function() {
    var left = game.randomNumber(game.LEFT_NUMBERS);
    var right = game.randomNumber(game.RIGHT_NUMBERS);

    game.updateQuestion(left, right);
}


$(function () {
    game.randomQuestion();

    $(".number").click(function (event) {
        game.updateWithAnswerDigit(event.target.firstChild.nodeValue);
    });
});
