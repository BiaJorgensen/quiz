let questionTitle = document.querySelector("#question");
let optionA = document.querySelector("#A");
let optionB = document.querySelector("#B");
let optionC = document.querySelector("#C");
let optionD = document.querySelector("#D");
let evaluate = document.querySelector("#evaluate");
// let startBtn = document.querySelector("#start");
let introDiv = document.querySelector("#intro");
let questionSetDiv = document.querySelector("#questionSet");
let timer = document.querySelector("#timer");
let gameOverDiv = document.querySelector("#gameOver");
let showScore = document.querySelector("#score");
let submitScoreBtn = document.querySelector("#submitScore");
let highScoresDiv = document.querySelector("#highScores");
let highScoresPage = document.querySelector("#highScoresPage");

let score = 0;
//Array with questions and their respective options
let questions = [
    {
        title: "1How do you name a variable?",
        optionA: "1let variable = name", 
        optionB: "1variableName = name", 
        optionC: "1name = Variable", 
        optionD: "1var: name",
        answer: "A"
    },
    {
        title: "2How do you name a variable?",
        optionA: "2let variable = name", 
        optionB: "2variableName = name", 
        optionC: "2name = Variable", 
        optionD: "2var: name",
        answer: "B"
    },
    {
        title: "3How do you name a variable?",
        optionA: "3let variable = name", 
        optionB: "3variableName = name", 
        optionC: "3name = Variable", 
        optionD: "3var: name",
        answer: "C"  
    }
    ];
    
//Variable to determine index of last available question
let lastQuestion = questions.length -1;
    
    
//Variable to determine which question is currently showing
let currentQuestion = 0;

let secondsLeft = 10;


//Function to start quiz
function startQuiz() {

    hideIntro();
    getQuestionSet();
    
}

//Function to hide intro and show question
function hideIntro() {
    
        
        introDiv.style.display = "none";
        questionSetDiv.style.display = "block"
        countdown()
    
}

//Function to stop game if all questions are answered

let interval;

//Function to stop timer
function stopTimer() {
    clearInterval(interval);
}

//Function to set timer - countdown
function countdown() {
    
    interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time " + secondsLeft + " second(s)";
        
        if(secondsLeft <= 0) {
            
            stopTimer()
            
            
            finalizeQuiz()
        }
    }, 1000);
    
}








//Function to get the question from questions array
function getQuestionSet() {
    
    questionTitle.textContent = questions[currentQuestion].title;
    console.log(questionTitle);
    optionA.textContent = questions[currentQuestion].optionA;
    optionB.textContent = questions[currentQuestion].optionB;
    optionC.textContent = questions[currentQuestion].optionC;
    optionD.textContent = questions[currentQuestion].optionD;
}



//Function to validate if answer is correct
function validateAnswer(x) {
    evaluate.style.display = "block";
    //If answer is correct, increase score by one
    if( x == questions[currentQuestion].answer) {
        score++;
        evaluate.textContent = "Right"

    }
    //If answer is wrong, decrease score by one
    else {
        secondsLeft = secondsLeft - 10;
        evaluate.textContent = "Wrong"
    }
    //If the index representing the current question in the questions array is less than the index of the last question, the function to show the question is called again and it will show the next question
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        getQuestionSet()
    }
    //If there are no more questions and there is still time, it stops the timer and shows game over section
    else {
        stopTimer()
        finalizeQuiz()
    }
}




//Function to stop quiz and save user's initials and score
function finalizeQuiz() {
    
    // timer.style.display = "none";
    questionSetDiv.style.display = "none";
    gameOverDiv.style.display = "block";
    showScore.textContent = "Your final score is " + score + ".";

}
        
        let savedScores;

//Function to save user's initials and score in local storage
    submitScoreBtn.addEventListener('click', function() {
        let allUsers = JSON.parse(localStorage.getItem("users")) ||[];
        let allScores = JSON.parse(localStorage.getItem("scores")) || [];

        let initials = document.querySelector("#initials").value;

        if (initials === "") {
            alert("Please enter your initials")
        }
        else {
            

            allUsers.push(initials);
            console.log(allUsers);
            allScores.push(score);
            console.log(allScores);

            // allScores = localStorage.getItem("scores");
            
            

            for (let i = 0; i < allUsers.length; i++) {
            savedScores = document.createElement("p");
            savedScores.textContent = (i +1) + " Player " + allUsers[i] + " - " + allScores[i] + " point(s)";
            highScoresDiv.appendChild(savedScores)
            }

            localStorage.setItem("users", JSON.stringify(allUsers));
            localStorage.setItem("scores", JSON.stringify(allScores));
           
            evaluate.style.display = "none";
            gameOverDiv.style.display = "none";
            highScoresPage.style.display = "block";

            
        }
        
    });

//Function to go back to main page; it resets all variables to initial values
    function goToMain() {
        reset()
        introDiv.style.display = "block";
        highScoresPage.style.display = "none";
        initials.value = "";

    };

   //Function to clear high scores
   function clearHs() {
    while (highScoresDiv.firstChild) {
        highScoresDiv.removeChild(highScoresDiv.firstChild);
    }
    localStorage.clear();
   }
    




//Function to reset variables for a new game
function reset() {
    score = 0;
    currentQuestion = 0;
    console.log(currentQuestion);
    secondsLeft = 10;
    while (highScoresDiv.firstChild) {
        highScoresDiv.removeChild(highScoresDiv.firstChild);
    }
}




