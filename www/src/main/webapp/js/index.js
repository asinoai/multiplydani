var helloit = game || {};

game.LEFT_NUMBERS = [2,4,5,8,10];
game.RIGHT_NUMBERS = [2,3,4,5,6,7,8,9,10];

game.createQuestionAnswerBar = function () {
    var content = game.createQuestion();

    return game.createCenteredContent(content);
}

game.createQuestion = function() {
    var result = $('<div><div class="question"></div><div>=</div><div class="answer"></div><div class="ok">✓</div></div>');

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
    var content = $('<div class="message"></div>');

    return game.createCenteredContent(content);

}

game.createHistoryBar = function() {
    var content = $('<div><div class="history-image"></div><div class="history-text"></div></div>');

    return game.createCenteredContent(content);
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
    game.questionCount++;
}


game.updateMessage = function(content) {
    $(".message").html(content)
}

game.questionCount = 0;
game.successCount = 0;

game.updateHistory = function() {
    var percent = 0;
    if (game.questionCount > 0) {
        percent = game.successCount * 100 / game.questionCount;
    }

    var pixel = 100 + 200 * percent / 100;

    $(".history-image").attr("style", "width: "+pixel+"px;height: "+pixel+"px;");
    $(".history-text").html(game.successCount + "/" + game.questionCount)
}

game.checkAnswer = function () {
    var answer = $(".answer");

    var ok = answer.html() == game.expectedAnswer;

    game.updateMessage(ok ? game.i18n.successMessage : game.i18n.failureMessage);

    if (ok) {
        window.setTimeout(game.nextQuestion, 2000);
        game.successCount++;
    }
    else {
        answer.fadeOut('slow', function() {
            game.updateAnswer(game.expectedAnswer);
            game.expectedAnswer = null;
            answer.fadeIn();
            window.setTimeout(game.nextQuestion, 5000);
        });
    }
}


game.nextQuestion = function () {
    root = $(":root");
    root.fadeOut('slow', function() {
        game.updateHistory();
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
