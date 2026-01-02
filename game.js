let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let gameState = 0;

let score = 0;

$("#score-section h2").hide();

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 3);
    
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // console.log(gamePattern);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("h1").text("Level " + level);

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
}

$(".btn").on("click", function () {
    if (gameState === 1) {
        let userChosenColour = this.id;

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        
        animatePress(userChosenColour);

        let lastAnswer = userClickedPattern.length - 1;

        // console.log(userClickedPattern);
        checkAnswer(lastAnswer);
    }
});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // If the user got the most recent answer right, then check that if they have finished their sequence.
        if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
          score++;
        }, 1000);

      }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Try Again.");
        $("#start-section button").show();
        $("#second-section a").show();
        $("#score-section h2 span").text(score);
        $("#score-section h2").show();
        startOver();
    }
}



function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(".btn" + "." + currentColour).addClass("pressed");

    setTimeout(function () {
        $(".btn" + "." + currentColour).removeClass("pressed");
    }, 100);
}


$(document).on("keypress", function () {
    if (gameState === 0) {
        nextSequence();
        gameState = 1;
        $("#second-section a").hide();
        $("#start-section button").hide();
        $("#score-section h2").hide();
    } else {
        // $("h1").text("Press A key to start");
    }
});

$("#start-section button").on("click", function () {
    if (gameState === 0) {
        nextSequence();
        gameState = 1;
        $("#second-section a").hide();
        $("#start-section button").hide();
        $("#score-section h2").hide();
    } else {
        // $("h1").text("Press A key to start");
    }
});


function startOver() {
    gameState = 0;
    level = 0;
    score = 0;
    gamePattern = [];
    userClickedPattern = [];
}

