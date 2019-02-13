// Data Trivia Games
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
	                picture: "../images/",
	                background: "../images/",
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
	                picture: "../images/",
	                background: "../images/",
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
	                picture: "../images/",
	                background: "../images/",
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
	        question : "What is the only mammal that can truly fly?",
	        choices : [
	            {
	                choice: "The Bat",
	                picture: "../images/",
	                background: "../images/",
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
	                picture: "../images/",
	                background: "../images/",
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
	
	var timerSet = 25;
	var currentTimer;
	
	// Get a random number 
	var randomTriviaNum = Math.floor(Math.random()*questions.length);
	
	// Get a random question
	var currentQuestion = questions[randomTriviaNum];
	
	$("#question").html(currentQuestion.question);
	
	for(var i = 0; i < currentQuestion.choices.length; i++) {
	    $("#options").append(`<li><a href="#" data-choice="${i}">${currentQuestion.choices[i].choice}</a></li>`);
	}
	
	$("#options a").bind("click",function(){
	    var choice = $(this).attr("data-choice");
	    console.log(currentQuestion.choices[choice].answer);
		if(currentQuestion.choices[choice].answer === true){
			$("#timer").html("That's Correct!");
		} else {
			$("#timer").html("That's Wrong!");
		}
	
	});
	
	starTimer();
	
	function starTimer() {
	    currentTimer = setInterval(function(){ 
	        timerSet--;
			if(timerSet < 10){
	        	$("#timer").html("00:0"+timerSet);
			} else {
				$("#timer").html("00:"+timerSet);
			}
	        if(timerSet === 0){
	            $("#timer").html("TIMES UP");
	            clearTimeout(currentTimer);
	        }
	    },1000);
	    
	}
	