// Data Trivia Game
var instructions = $(".instructions").attr("data-content").trim();

// This types out the instructions, character by character
var m = 0; 
var instructionGenerator = setInterval(function(){
	if(m < instructions.length){
		$(".instructions").append(instructions[m]);
	} else {
		clearInterval(instructionGenerator);
		$(".start").fadeIn();
	}
	m++;
},80);

// Variables
var current = 0;	// global count of the current question
var timer = 25;	// variable to set seconds per answer
var currentScore = 0;
var currentTimer; 	// used for set interval
var currentPicture; // get the current picture
var currentAnswer; // get the current answer
var currentHint; // get the current hint

var questions = [
	    {
	        question : "Which bird has eyes that are larger than it's brain?",
	        choices : [
	            {
	                choice: "Eagle",
	                answer: false,
	            },
	            {
	                choice: "Ostrich",
	                picture: "https://media.giphy.com/media/qghdusmfvfjri/giphy.gif",
					hint: "Ostrich has the biggest eyes in the whole animal kingdom. Its eye is bigger than its brain.",
	                answer: true,
	            },
	            {
	                choice: "Emu",
	                answer: false,
	            },
	            {
	                choice: "Penguin",
	                answer: false,
	            }
	        ]
	    },
	    {
	        question : "What is the only snake in the world that builds a nest for its eggs?",
	        choices : [
	            {
	                choice: "Anaconda",
	                answer: false,
	            },
	            {
	                choice: "Rattle Snake",
	                answer: false,
	            },
	            {
	                choice: "King Cobra",
	                picture: "https://media.giphy.com/media/AT2W5RsfjaIjS/giphy.gif",
	                hint: "The king cobra is the only type of snake on the planet to build a nest for her eggs primarily to keep the eggs safe.",
	                answer: true,
	            },
	            {
	                choice: "Coral Snake",
	                answer: false,
	            }
	        ]
	    },
	    {
	        question : "What is the only mammal that can truly fly?",
	        choices : [
	            {
	                choice: "The Bat",
	                picture: "https://media.giphy.com/media/HNdRJNO0whxkI/giphy.gif",
					hint: "Bats are mammals of the order Chiroptera; with their forelimbs adapted as wings, they are the only mammals naturally capable of true and sustained flight.",
	                answer: true,
	            },
	            {
	                choice: "Flying Squirrel",
	                answer: false,
	            },
	            {
	                choice: "Pegasus",
	                answer: false,
	            },
	            {
	                choice: "Mallard Duck",
	                answer: false,
	            }
	        ]
	    },
	    {
	        question : "A snail can sleep for how many years?",
	        choices : [
	            {
	                choice: "6 months",
	                answer: false,
	            },
	            {
	                choice: "3 years",
	                picture: "https://media.giphy.com/media/yWB3Q8N9DZmRG/giphy.gif",
					hint: "It may sound impossible, but a snail can sleep for three years.",
	                answer: true,
	            },
	            {
	                choice: "4 weeks",
	                answer: false,
	            },
	            {
	                choice: "7 days",
	                answer: false,
	            }
	        ]
	    }
	];
	
	var countQuestions = questions.length; // number of questions

	// Start the game
	$(".start").on("click",function(){
		current = 0;	// global count of the current question
		currentScore = 0;
		$(".start, .instructions").fadeOut();
		$(".wrapper").addClass("ready");
		generateQuestion(); // get the questions ready
		setTimeout(starTimer,500);
	});
	
	// Get a random number 
	shuffle(questions);
	var currentQuestion;

	function generateQuestion(){
		
		// css animation - move questions to the right
		setTimeout(function(){
			$(".container").removeClass("startOver"); 
			$(".container").addClass("reset");
		},500);
		
		// css animation - move questions to center
		setTimeout(function(){
			$(".container").removeClass("reset");
			$(".container").addClass("ready"); 
		},900);
		
		currentQuestion = questions[current];

		$("#question").hide().html(currentQuestion.question).fadeIn();

		current++;

		$("#counter").html("Question "+current+" of "+countQuestions);

		$("#options").html("").fadeIn(); // clear options and show if hidden;

		$("#options a").unbind("click");

		for(var i = 0; i < currentQuestion.choices.length; i++) {
		    $("#options").append(`<li><a href="#" data-choice="${i}">${currentQuestion.choices[i].choice}</a></li>`);
			if(currentQuestion.choices[i].answer === true){
				currentPicture 	= currentQuestion.choices[i].picture;
				currentHint 	= currentQuestion.choices[i].hint;
				currentAnswer	= currentQuestion.choices[i].choice;
			}
		}

		$("#options a").bind("click",function(){
		    var choice = $(this).attr("data-choice");
		    console.log(currentQuestion.choices[choice].answer);
			if(currentQuestion.choices[choice].answer === true){
				showAnswer("That's Correct!");
				currentScore++;
			} else {
				showAnswer(`Sorry, the correct answer is <strong>${currentAnswer}.</strong>`);
			}
		});
	}
	
	function starTimer() {
		$("#timer").show();
		var timerSet = timer+1;
		// show the question
	    currentTimer = setInterval(function(){ 
	        timerSet--;
			handleBarStatus(timerSet,25);
			if(timerSet < 10){
	        	$("#timer").html("00:0"+timerSet);
			} else {
				$("#timer").html("00:"+timerSet);
			}
	        if(timerSet === 0){
	            
				$("#timer").html("TIMES UP");
	            clearTimeout(currentTimer);
				showAnswer(`Times up! The correct answer is <strong>${currentAnswer}.</strong>`);

	        }
	    },1000);
	}

	function showAnswer(message){
		clearTimeout(currentTimer);
		var counter = 0;
		$("#options,#question").hide().empty();
		$("#picture").hide().html(`<img src='${currentPicture}'>`).fadeIn();
		$("#hint").hide().html(`<h5>${message}</h5> ${currentHint}`).fadeIn();

		setTimeout(function(){
			
			$(".container").removeClass("ready");
			$(".container").addClass("startOver");
			$("#picture,#hint").fadeOut();
			
			// There are no more questions
			if(current === countQuestions){

				$(".instructions").html(`
					You got <strong>${currentScore} of ${countQuestions}</strong> correct!
				`);

				$(".start").html("Click here to Play Again!");

				$(".start, .instructions").fadeIn();
				$(".status-bar .bar").attr("class","bar");
				showResults();

			} else {
				generateQuestion();
				starTimer();
			}
		},6000);
	}

	function showResults(){
		$("#timer").hide();
		$(".status-bar .bar").css("width","100%");
		$(".wrapper").removeClass("ready");
	}

	// Shuffle the questions
	function shuffle(array) {

		var currentIndex = array.length, temporaryValue, randomIndex;
	  
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
	  
		  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;

		  // And swap it with the current element.
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
		return array;
	  }
	
	// Added function to manage bar status
	function handleBarStatus(current,total){
		var percentage = 100-(100-(current/total)*100);
		var bar = $(".status-bar .bar");
		$(".status-bar").css("background-position",100-percentage);
		if( percentage <= 100 && percentage >= 70 ){
			bar.removeClass("red");
			bar.addClass("green");
		} else if( percentage < 70 && percentage >= 40 ){
			bar.addClass("orange");
			bar.addClass("green");
		} else if( percentage < 40 ) {
			bar.removeClass("orange");
			bar.addClass("red");
		} else {
			bar.removeClass("red");
		}
		bar.css("width",percentage+"%");
	}