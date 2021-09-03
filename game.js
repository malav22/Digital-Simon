const buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = -1;

var s =0;
function checkAnswers(currentLevel) {
    s++;
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
    } 
    else{
        console.log("Failed");
        playSound("wrong");
        $("body").addClass("game-over");
        gamePattern=[];
        userClickedPattern=[];
        level = -1;
        i=0;
        s=0;
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        $("h1").text("Game Over , Press A key to Start");
        return;
    } 
    if(s===gamePattern.length){
        console.log("Complete");
        setTimeout(nextSequence,1000);
        userClickedPattern=[];
        i=0;
        s=0;
    } 
}

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(color){
    $("#"+color).fadeOut(100).fadeIn(100);
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 200);
}

function nextSequence(){

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);

    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+(level+1));
    console.log(gamePattern);
}
var i =0;
jQuery(".btn").attr("type", "button").click(handler);
function handler(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswers(i++);
}

$("body").keypress(nextSequence);