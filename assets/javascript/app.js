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
	m++; // increment 
},80);

// Variables
var current = 0;			// global count of the current question
var timer = 10;				// variable to set seconds per answer
var currentScore = 0; 		// keep track of score
var currentTimeouts = 0;	// keep track of user timeouts	
var currentIncorrects = 0;	// keep track of incorrect answes
var currentTimer; 			// used for set interval
var currentPicture; 		// get the current picture
var currentAnswer; 			// get the current answer
var currentHint; 			// get the current hint
var currentQuestion;		// get the current question

// Questions Data Object
var questions = [
	    {
		        question : "The slug has how many noses?",
		        choices : [
		            {
		                choice: "One",
		                answer: false,
		            },
		            {
		                choice: "Two",
		                answer: false,
		            },
		            {
		                choice: "Three",
		                answer: false,
		            },
		            {
		                choice: "Four",
		                picture: "https://media.giphy.com/media/lma5aujULEkKs/giphy.gif",
						hint: "A slug has 4 noses. A slug does not have a traditional nose, but rather a pair of tentacles that it uses to smell.",
		                answer: true,
		            }
		        ]
		},
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
					hint: "The ostrich's eyes are about the size of billiard balls and its brain is actually smaller than either one of its eyeballs.",
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
	                picture: "https://media.giphy.com/media/lItmREiQTcgE/giphy.gif",
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
	        question : "A tarantula spider can survive without food for how long?",
	        choices : [
	            {
	                choice: "2 years",
	                picture: "https://media.giphy.com/media/ilYH0gWXsP4nm/giphy.gif",
	                hint: "Scientists have tested for how long a tarantula can live without eating. The longest period was 2 years and 9 months and 19 days.",
	                answer: true,
	            },
	            {
	                choice: "1 year",
	                answer: false,
	            },
	            {
	                choice: "6 months",
	                answer: false,
	            },
	            {
	                choice: "3 weeks",
	                answer: false,
	            }
	        ]
	    },
		{
			question : "Where is the heart of a shrimp located?",
		  	choices : [
		        {
		            choice: "Tail",
		            answer: false,
		        },
		        {
		            choice: "Belly",
		            answer: false,
		        },
		        {
		            choice: "Antennae",
		            answer: false,
		        },
		        {
		            choice: "Head",
		            picture: "https://media.giphy.com/media/dUbpfXvWFDBW8/giphy.gif",
		           	hint: "The shrimp's heart is located in the thorax, which is part of their head, along with the brain and the other good parts.",
		            answer: true,
		        }
		    ]
		},
	    {
	        question : "What is the only mammal that can truly fly?",
	        choices : [
	            {
	                choice: "The Bat",
	                picture: "https://media.giphy.com/media/qH1PNSJcvinDi/source.gif",
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
	        question : "A snail can sleep for how long?",
	        choices : [
	            {
	                choice: "6 months",
	                answer: false,
	            },
	            {
	                choice: "3 years",
	                picture: "https://media.giphy.com/media/B6cisLSD2kTmM/giphy.gif",
					hint: "Snails can sleep for 3 years to hibernate and sleep when weather becomes excessively cold. Snails will bury themselves in the ground and close their shells off with their own slime.",
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

	shuffle(questions); // Shuffle the questions every time game loads
	
	// Start the game
	var game = false;
	$(".start").on("click",function(){
		if(!game){
			// Variable resets for new game
			game = true;
			current = 0;			
			currentScore = 0;
			currentIncorrects = 0;
			currentTimeouts = 0;

			// Hide Intro UI and set the main wrapper to ready
			$(".start, .instructions").fadeOut();
			$(".wrapper").addClass("ready");

			// Functions to start the game
			generateQuestion(); // get the questions ready
			setTimeout(starTimer,500); // Delay the timer half a second for CSS animation
		}
		

	});

	// Load and show current question
	function generateQuestion(){
		
		var container = $(".container");

		// delay for css animation - move questions to the right
		setTimeout(function(){
			container.removeClass("startOver") 
				.addClass("reset");
		},500);
		
		//delay for css animation - move questions to center
		setTimeout(function(){
			container.removeClass("reset")
				.addClass("ready"); 
			$("#question,#options").fadeIn();
		},900);
		
		// store current question
		currentQuestion = questions[current];

		$("#question").html(currentQuestion.question);

		current++; // increment for next question

		// display x of length question 
		$("#counter").html("Question "+current+" of "+countQuestions);

		// clear options
		$("#options").html(""); 

		// append answer options to display
		for(var i = 0; i < currentQuestion.choices.length; i++) {

			var currentObject = currentQuestion.choices[i]; // store object

		    $("#options").append(`<li><a href="#" data-choice="${i}">${currentObject.choice}</a></li>`);
			
			// store correct answer assets to variables
			if(currentObject.answer === true){
				currentPicture 	= currentObject.picture;
				currentHint 	= currentObject.hint;
				currentAnswer	= currentObject.choice;
			}
		}

	}

	// assign document click for dynamically created buttons
	$(document).on("click","#options a",function(){
			
		var choice = $(this).attr("data-choice"); // get the index of the option
		
		// Check answer against object
		if(currentQuestion.choices[choice].answer === true){
			currentScore++; // increment score
			showAnswer("That's Correct!");
		} else {
			currentIncorrects++; // increment incorrect score
			showAnswer(`Sorry, the correct answer is <strong>${currentAnswer}.</strong>`);
		}
	});
	
	// Function to start timer and check for timeout
	function starTimer() {
		
		var timerSet = timer; // save the timer
		var timerDiv = $("#timer");
		
		// loop every 1 second and update timer
	    currentTimer = setInterval(function(){ 

			handleBarStatus(timerSet,timer); // function for moving bar

			// handle timer string, supports up to 59 sec
			if(timerSet < 10){
				timerDiv.html("00:0"+timerSet);
			} else {
				timerDiv.html("00:"+timerSet);
			}

			$("#timer:hidden").fadeIn(); // show if hidden

			// check for timeout
	        if(timerSet < 0){
	            clearTimeout(currentTimer); // kill the timer
				showAnswer(`Times up! The correct answer is <strong>${currentAnswer}.</strong>`);
				currentTimeouts++; // increment timeout score
				timerDiv.html("TIMES UP");
	        } else {
				timerSet--; // decrementer
			}

	    },1000); // 1 second
	}

	// Function to show the answer with a message
	function showAnswer(message){

		var container = $(".container");
		clearTimeout(currentTimer); // kill the current timer
		
		container.addClass("answer"); // add class for timer

		// hide and clear previous optoins and questions
		$("#options,#question").hide().empty(); 
		
		// Add the answer assets image
		$("#picture").hide().html(`
			<div style="background: url('${currentPicture}') center center no-repeat; background-size: cover;">
			</div>
		`).fadeIn();

		// Add the answer assets hint
		$("#hint").hide().html(`<h5>${message}</h5> ${currentHint}`).fadeIn();

		// Show answer for 5 seconds
		setTimeout(function(){
			
			container.removeClass("answer")	 		// add class for timer
				.removeClass("ready") 				// CSS animation styles
				.addClass("startOver"); 			// CSS animation styles
			
			$("#picture,#hint").fadeOut(); 			// hide picture and hint
			
			// There are no more questions
			if(current === countQuestions){

				// Show the results 
				showResults();

			} else {
				generateQuestion();
				starTimer();
			}
		},5000);
	}

	function showResults(){

		// Show the results
		$(".instructions").html(`
			You got <strong>${currentScore} of ${countQuestions}</strong> correct!
			<br>
			<span>Incorrect answers: <strong>${currentIncorrects}</strong></span>
			<span>Timeouts: <strong>${currentTimeouts}</strong></span>
		`);

		// Update button text
		$(".start").html("Click here to Play Again!");
		game = false; // gate to allow start game

		// Show start button and results
		$(".start, .instructions").fadeIn();

		// Update bar
		$(".status-bar .bar")
			.attr("class","bar")
			.css("width","100%");
		
		// Hide the timer
		$("#timer").hide();

		// CSS specific style
		$(".wrapper").removeClass("ready");
	}

	// Shuffle the questions
	function shuffle(array) {

		// set up variables
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
		
		// Calculation to get a countdown of percentage
		var percentage = 100-(100-(current/total)*100);
		
		var bar = $(".status-bar .bar");
		
		// Add/Remove CSS classes
		if( percentage <= 100 && percentage >= 70 ){
			bar.removeClass("red")
				.removeClass("blink")
				.addClass("green");
		} else if( percentage < 70 && percentage >= 30 ){
			bar.addClass("orange")
				.addClass("green");
		} else if( percentage < 30 && percentage >= 10) {
			bar.removeClass("orange")
				.addClass("red");
		} else if( percentage < 10) {
			bar.removeClass("red")
				.addClass("blink");
		} else {
			bar.removeClass("red");
		}

		// Make the background of animals move
		$(".status-bar").css("background-position",100-percentage);
		
		// Update bar width
		bar.css("width",percentage+"%");
		
	}