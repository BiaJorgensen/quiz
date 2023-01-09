//Global variables used to access HTML
const evaluate = document.querySelector("#evaluate");
const introDiv = document.querySelector("#intro");
const questionSetDiv = document.querySelector("#questionSet");
const timer = document.querySelector("#timer");
const gameOverDiv = document.querySelector("#gameOver");
const submitScoreBtn = document.querySelector("#submitScore");
const highScoresDiv = document.querySelector("#highScores");
const highScoresPage = document.querySelector("#highScoresPage");
const hsLink = document.querySelector("#highScoreLink");
const startQuizBtn = document.querySelector('#start');
const goToMainBtn = document.querySelector('#main');
const clearHsBtn = document.querySelector('#clear');


//Global variable containing array with questions and their respective options
const questions = [
    {
        title: "What symbol is used to compare if two values are equal, independent of their type?",
        optionA: "=", 
        optionB: "==", 
        optionC: "===", 
        optionD: "?=",
        answer: "B"
    },
    {
        title: "Which is not a correct way to assign value to a variable?",
        optionA: "let variable = name", 
        optionB: "const x = name", 
        optionC: "var x = 10", 
        optionD: "var: name",
        answer: "D"
    },
    {
        title: "Where can you add <script> tags in HTML to link it to JavaScript files?",
        optionA: "Between <head> tags or before </body> closing tag", 
        optionB: "Only between <head> tags", 
        optionC: "Only before </body> closing tag", 
        optionD: "Anywhere",
        answer: "A"  
    },
    {
        title: "JavaScript is a (an) __________ language.",
        optionA: "Procedural", 
        optionB: "Machine", 
        optionC: "Scripting", 
        optionD: "None of the above",
        answer: "C"
    },
    {
        title: "What does the querySelector method do?",
        optionA: "Selects JavaScript variables", 
        optionB: "Starts functions", 
        optionC: "Access HTML elements", 
        optionD: "Highlights code",
        answer: "C"
    }
];
    
//Variable to determine index of last available question
const lastQuestion = questions.length -1;   
//Variable to determine which question is currently showing -- index
let currentQuestion = 0;
let secondsLeft = 60;
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
startQuizBtn.addEventListener ('click', function() {
    hide(introDiv);
    show(questionSetDiv);
    getQuestionSet();
    countdown();
    timer.textContent = "Timer: " + secondsLeft + " second(s)";    
})

//Function to set/start timer - countdown
function countdown() {
    show(timer);
    interval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Timer: " + secondsLeft + " second(s)";
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
    const questionTitle = document.querySelector("#question");
    const optionA = document.querySelector("#A");
    const optionB = document.querySelector("#B");
    const optionC = document.querySelector("#C");
    const optionD = document.querySelector("#D");
    
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
    const showScore = document.querySelector("#score");
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
        //Variable to house initials and scores as objects
        const newPlayer = {
            user: initials,
            score
        };

        //Gets scores array from local storage
        const allScores = JSON.parse(localStorage.getItem("scores")) || [];
        //Pushes newPlayer's onjects in an array
        allScores.push(newPlayer);
        //Saves pushed initials and scores into local storage
        localStorage.setItem("scores", JSON.stringify(allScores));
        renderHighScores();
    }
})

//Function to render high scores
function renderHighScores() {
    //Gets scores array from local storage
    const allScores = JSON.parse(localStorage.getItem("scores")) || [];
    //Sorts players from higher to lower score
    allScores.sort((a,b)=>b.score-a.score);
     //Creates p elements for each user/score
     for (let i = 0; i < allScores.length; i++) {
         const savedScores = document.createElement("p");
         savedScores.textContent = (i +1) + ". " + allScores[i].user + " - " + allScores[i].score + " point(s)";
         highScoresDiv.appendChild(savedScores)
     };  
}

//Function to show high scores when high score on top left of page is clicked
hsLink.addEventListener('click', function() {
    //Hiding every page that user could be on, timer and high score link; only shows high scores page and renders scores
    show(highScoresPage);
    hide(introDiv);
    hide(hsLink);
    hide(questionSetDiv);
    hide(gameOverDiv);
    hide(evaluate);
    hide(timer);
    stopTimer();
    renderHighScores();
})

//Function to go back to main page when 'Main Page' button is clicked
goToMainBtn.addEventListener('click', function() { 
    reset();
    show(introDiv);
    show(hsLink);
    hide(highScoresPage);
    //Clears previous entered initial from initial's text box
    initials.value = "";
}) 

//Function to clear high scores from high scores page and local storage when 'Clear High Scores' button is clicked
clearHsBtn.addEventListener('click', function() {
    removeChild()
    localStorage.removeItem("scores");
})

    
//Function to reset variables for a new game
function reset() {
    score = 0;
    currentQuestion = 0;
    secondsLeft = 60;
    //Removes child elements created on high scores page to avoid duplicates
    removeChild()
}

//Function to remove child elements created on high scores page
function removeChild() {
    while (highScoresDiv.firstChild) {
        highScoresDiv.removeChild(highScoresDiv.firstChild);
    }
}