/*
This is The Simon Game
整理思路，
第一步 游戏随机选择颜色
第二步 玩家选中颜色
第三步 优化以上代码
第四步 判断两个array是否相同，成功继续，不成功重来
第五步 重来的代码

*/

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playsound(userChosenColour);

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(level-1);

});







function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  // $("#" + currentColour).addClass("pressed").fadeOut(100).fadeIn(100);
}


function nextSequence(){
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }else{
    console.log("fail");
    var name = "wrong";
    playsound(name);
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
