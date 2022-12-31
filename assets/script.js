let questionTitle = document.querySelector("#question");
let optionA = document.querySelector("#A");
let optionB = document.querySelector("#B");
let optionC = document.querySelector("#C");
let optionD = document.querySelector("#D");
let evaluate = document.querySelector("#evaluate");
let startBtn = document.querySelector("#start");
let introDiv = document.querySelector("#intro");
let questionSetDiv = document.querySelector("#questionSet");
let timer = document.querySelector("#timer");
let gameOverDiv = document.querySelector("#gameOver");
let showScore = document.querySelector("#score");
let submitScoreBtn = document.querySelector("#submitScore");

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

let secondsLeft = 60;

//Function to hide intro and show question
function hideIntro() {
    startBtn.addEventListener('click', function() {
        introDiv.style.display = "none";
        questionSetDiv.style.display = "block"
        countdown()
    })
}

//Function to stop game if all questions are answered


//Function to set timer - countdown
function countdown() {
    
    let interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time " + secondsLeft + " second(s)";
        
        if(secondsLeft <= 0) {
            clearInterval(interval);
            //Change below to a function
            
            
            finalizeQuiz()
        }
    }, 1000);
}








//Function to get the question from questions array
function getQuestionSet() {
    
    questionTitle.textContent = questions[currentQuestion].title;
    optionA.textContent = questions[currentQuestion].optionA;
    optionB.textContent = questions[currentQuestion].optionB;
    optionC.textContent = questions[currentQuestion].optionC;
    optionD.textContent = questions[currentQuestion].optionD;
}



//Function to validate if answer is correct
function validateAnswer(x) {
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
    else {
        finalizeQuiz()
    }
}




//Function to stop quiz and save user's initials and score
function finalizeQuiz() {
    timer.style.display = "none";
    questionSetDiv.style.display = "none";
    gameOverDiv.style.display = "block";
    showScore.textContent = "Your final score is " + score + ".";

}

//Function to save user's initials and score in local storage
    submitScoreBtn.addEventListener('click', function() {
        // event.preventDefault();

        let initials = document.querySelector("#initials").value;

        if (initials === "") {
            alert("Please enter your initials")
        }
        else {
            localStorage.setItem("initials", initials);
            localStorage.setItem("score", score);
            evaluate.style.display = "none";
            
        }

    })


//Function to start quiz
function startQuiz() {
    hideIntro();
    getQuestionSet();
    
}

startQuiz()


