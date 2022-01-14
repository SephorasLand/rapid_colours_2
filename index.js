var buttonColours = ["red", "blue", "green", "yellow", "black", "grey", "white"];
var gamePattern = [];
var userClickedPattern = [];
var hasBeenPressed = false;
var level = 0;
var isOnTime = false;
var timerHandler = 0;
var changingTime = 2000;

function nextSequence(){
  changingTime -= 100;
  console.log(changingTime);
  if (timerHandler != 0) {
    clearTimeout(timerHandler);
    timerHandler = 0;
  }
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  document.getElementById("blank").style.background = randomChosenColour;
  $("#blank").fadeOut(100).fadeIn(100);
  if(randomChosenColour == "black" || randomChosenColour == "grey"){
    playSound(randomChosenColour);
  }
  timerHandler = setTimeout(function(){
    if(!isOnTime){
      playSound("wrong");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }, changingTime)
  isOnTime = false;
}

$("body").on("tap", function(event){
  if (!hasBeenPressed && event.target.id != "white" && event.target.id != "red" && event.target.id != "blue" && event.target.id != "yellow" && event.target.id != "green" && event.target.id != "black" && event.target.id != "grey"){  
    nextSequence();
    hasBeenPressed = true;
  }
})

$(document).keypress(function(){
  if (!hasBeenPressed){
    nextSequence();
    hasBeenPressed = true;
  }
})


$(".btn").on("click", function(event){
  if(hasBeenPressed){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    //playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  } else {
    $("h1").text("Level " + level);
    nextSequence();
    hasBeenPressed = true;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
      isOnTime = true;
      setTimeout(nextSequence,1000);
    
  } else {
    if (timerHandler != 0) {
      clearTimeout(timerHandler);
      timerHandler = 0;
    }
    playSound("wrong");
    $("#title").text("Game Over, Tap Anywhere or Press a Key to Restart");
    $("body").addClass("game-over");
    $("h2").addClass("hidden");
    setTimeout(function(){
      $("body").removeClass("game-over");;
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isOnTime = false;
  changingTime = 2000;
  setTimeout(function(){
    hasBeenPressed = false;
  }, 200);
}

function playSound(input){
  var simonMusic = new Audio("sounds/" + input + ".mp3");
  simonMusic.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
