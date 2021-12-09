var level = 0;
var choicearray = ["red", "green", "blue", "yellow"];
var tobeselected = []
var userans = [];
var started = false;

/*
  It's a memory game
  Each time you will get new color with previous sequence
  Remember the past sequence and select sequences in correct order.
*/

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }

});

$("button").click(function () {
    var userchosedcolor = $(this).attr("id");
    userans.push(userchosedcolor);
    playSound(userchosedcolor);
    animatePress(userchosedcolor);
    checkAnswer(userans.length - 1);
});

function checkAnswer(currentlevel) {
    if (tobeselected[currentlevel] === userans[currentlevel]) {
        if (userans.length === tobeselected.length) {
                nextSequence();
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $(".label").text("Game Over, Press any key to restart");
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 1000);
        startOver();

    }
}

function nextSequence() {
    userans = [];
    level++;
    $(".label").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomchosencolor = choicearray[randomNumber];
    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    tobeselected.push(randomchosencolor);
    playSound(randomchosencolor);
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    started = false;
    tobeselected = [];
    userans = [];
}