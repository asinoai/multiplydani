var helloit = game || {};

game.createQuestionBar = function () {
    var content = game.createQuestion();

    return game.createCenteredTwoPieceContent(content, $('<div class="ok">✓</div>'));
}

game.createQuestion = function() {

    var result = $('<div><div class="question"></div><div>=</div><div class="answer"></div></div>');

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

game.createMessageBar = function() {
    return $('<div class="message"></div>')
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

game.updateAnswer = function(content) {
    var answer = $(".answer");

    answer.html(content);
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

    game.expectedAnswer = left * right;

    game.updateQuestion(left, right);
}


game.updateMessage = function(content) {
    $(".message").html(content)
}

game.checkAnswer = function () {
    var answer = $(".answer");

    var ok = answer.html() == game.expectedAnswer;

    game.updateMessage(ok ? game.i18n.successMessage : game.i18n.failureMessage);

    window.setTimeout(game.nextQuestion, 2000);
}


game.nextQuestion = function () {
    root = $(":root");
    root.fadeOut('slow', function() {
        game.updateWithAnswerDigit();
        game.updateAnswer("");
        game.updateMessage("");
        game.randomQuestion();
        root.fadeIn();
    });
}

$(function () {
    game.randomQuestion();

    $(".number").click(function (event) {
        game.updateWithAnswerDigit(event.target.firstChild.nodeValue);
    });

    $(".ok").click(function () {
       game.checkAnswer();
    });
});
