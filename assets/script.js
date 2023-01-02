//Global variables used to access HTML
let evaluate = document.querySelector("#evaluate");
let introDiv = document.querySelector("#intro");
let questionSetDiv = document.querySelector("#questionSet");
let timer = document.querySelector("#timer");
let gameOverDiv = document.querySelector("#gameOver");
let submitScoreBtn = document.querySelector("#submitScore");
let highScoresDiv = document.querySelector("#highScores");
let highScoresPage = document.querySelector("#highScoresPage");
let hsLink = document.querySelector("#highScoreLink");

//Global variable containing array with questions and their respective options
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
//Variable to determine which question is currently showing -- index
let currentQuestion = 0;
let secondsLeft = 10;
let score = 0;
let interval;

//Function to hide section
function hide(y) {
    y.style.display = "none";          
}

//Function to show section
function show(z) {
    z.style.display = "block";
}

//Function to start quiz when "Start Quiz" button is clicked
function startQuiz() {
    hide(introDiv);
    show(questionSetDiv);
    getQuestionSet();
    countdown();
    timer.textContent = "Time " + secondsLeft + " second(s)";    
}

//Function to set/start timer - countdown
function countdown() {
    show(timer);
    interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time " + secondsLeft + " second(s)";
        if(secondsLeft <= 0) {
            stopTimer();  
            finalizeQuiz()
        }
    }, 1000);  
}

//Function to stop timer
function stopTimer() {
    clearInterval(interval);
    hide(timer);
}

//Function to get the question from questions array
function getQuestionSet() {
    let questionTitle = document.querySelector("#question");
    let optionA = document.querySelector("#A");
    let optionB = document.querySelector("#B");
    let optionC = document.querySelector("#C");
    let optionD = document.querySelector("#D");
    
    questionTitle.textContent = questions[currentQuestion].title;
    optionA.textContent = questions[currentQuestion].optionA;
    optionB.textContent = questions[currentQuestion].optionB;
    optionC.textContent = questions[currentQuestion].optionC;
    optionD.textContent = questions[currentQuestion].optionD;
}

//Function to validate if answer is correct
function validateAnswer(x) {
    show(evaluate);
    //If answer is correct, increase score by one
    if( x == questions[currentQuestion].answer) {
        score++;
        evaluate.textContent = "Correct!"
    }
    //If answer is wrong, decrease timer
    else {
        secondsLeft = secondsLeft - 10;
        evaluate.textContent = "Wrong!"
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
    hide(timer);
    hide(questionSetDiv);
    show(gameOverDiv);
    let showScore = document.querySelector("#score");
    showScore.textContent = "Your final score is " + score + ".";
}

//Function to save user's initials and score in local storage
submitScoreBtn.addEventListener('click', function() {
    let initials = document.querySelector("#initials").value;
    //If user tries to submit without adding their initials, shows alert, does not save score without initials
    if (initials === "") {
        alert("Please enter your initials")
    }
    //If initals are provided, code can continue
    else {
        //Hides unnecessary sections, shows high score page and renders high scores including new score
        hide(hsLink);
        hide(evaluate);
        hide(gameOverDiv);
        show(highScoresPage);
        renderHighScores();
    }
})

//Function to render high scores
function renderHighScores() {
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let allScores = JSON.parse(localStorage.getItem("scores")) || [];
     //Pushes initials and scores in arrays
     allUsers.push(initials.value);
     allScores.push(score);
     //Saves pushed initials and scores in local storage
     localStorage.setItem("users", JSON.stringify(allUsers));
     localStorage.setItem("scores", JSON.stringify(allScores));

     //Creates p elements for each user/score
     for (let i = 0; i < allUsers.length; i++) {
         let savedScores = document.createElement("p");
         savedScores.textContent = (i +1) + " " + allUsers[i] + " - " + allScores[i] + " point(s)";
         highScoresDiv.appendChild(savedScores)
     }  
}

//Function to show high scores when high score on top left of page is clicked
hsLink.addEventListener('click', function() {
    //Hiding every page that user could be on, timer and high score link; only shows high scores page
    show(highScoresPage);
    hide(introDiv);
    hide(hsLink);
    hide(questionSetDiv);
    hide(gameOverDiv);
    hide(evaluate);
    hide(timer);
    stopTimer();
    //Gets users and scored from local storage, if any
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let allScores = JSON.parse(localStorage.getItem("scores")) || [];
//Creates p elements for each user/score
    for (let i = 0; i < allUsers.length; i++) {
        let savedScores = document.createElement("p");
        savedScores.textContent = (i +1) + " " + allUsers[i] + " - " + allScores[i] + " point(s)";
        highScoresDiv.appendChild(savedScores)
    }  
})

//Function to go back to main page when 'Main Page' button is clicked
function goToMain() {
    reset();
    show(introDiv);
    show(hsLink);
    hide(highScoresPage);
    //Clears previous entered initial from initial's text box
    initials.value = "";
}

//Function to clear high scores from high scores page and local storage when 'Clear High Scores' button is clicked
function clearHs() {
    removeChild()
    localStorage.clear();
}
    
//Function to reset variables for a new game
function reset() {
    score = 0;
    currentQuestion = 0;
    secondsLeft = 10;
    //Removes child elements created on high scores page to avoid duplicates
    removeChild()
}

//Function to remove child elements created on high scores page
function removeChild() {
    while (highScoresDiv.firstChild) {
        highScoresDiv.removeChild(highScoresDiv.firstChild);
    }
}