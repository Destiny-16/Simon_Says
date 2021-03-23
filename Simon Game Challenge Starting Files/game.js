var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function(event) {
  if(start === false){
    nextSequence();
    start = true;
  }

})



$(".btn").click (function() {
 var userChosenColor = $(this).attr("id");
 userClickedPattern.push(userChosenColor);
 animatePress(userChosenColor);
 playSound(userChosenColor);
 checkAnswer(userClickedPattern.length-1);

});



function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

}

function playSound (color){
  switch(color){
    case "green":
      $("#green").fadeOut(200).fadeIn(200);
      var gSound = new Audio('sounds/green.mp3');
      gSound.play();
      break;
    case "red":
      $("#red").fadeOut(200).fadeIn(200);
      var gSound = new Audio('sounds/red.mp3');
      gSound.play();
      break;
    case "yellow":
      $("#yellow").fadeOut(200).fadeIn(200);
      var gSound = new Audio('sounds/yellow.mp3');
      gSound.play();
      break;
    case "blue":
      $("#blue").fadeOut(200).fadeIn(200);
      var gSound = new Audio('sounds/blue.mp3');
      gSound.play();
      break;
    default:
      alert("error");
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function changeBackground(){
  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer(currentLevel){

  console.log("game: " + gamePattern[currentLevel]);
  console.log("user: " + userClickedPattern[currentLevel]);
  console.log("level: " + userClickedPattern.length + gamePattern.length);

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPattern = [];

    }
  }

  else{
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();

    changeBackground();

    $("h1").text("Game over, press any key to restart");

    startOver();
  }

}


function startOver() {

  level = 0;
  gamePattern = [];
  start = false;

}
