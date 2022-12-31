let questionTitle = document.querySelector("#question");
let optionA = document.querySelector("#A");
let optionB = document.querySelector("#B");
let optionC = document.querySelector("#C");
let optionD = document.querySelector("#D");
let evaluate = document.querySelector("#evaluate");
let startBtn = document.querySelector("#start");
let introDiv = document.querySelector("#intro");
let questionSetDiv = document.querySelector("#questionSet");




//Function to hide intro and show question
function hideIntro() {
    startBtn.addEventListener('click', function() {
        introDiv.style.display = "none";
        questionSetDiv.style.display = "block"
    })
}


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
console.log(currentQuestion);

// let i = 0;
// var result = "";
// evaluate.textContent = result
// console.log(result);

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
        console.log("right");
        evaluate.textContent = "Right"

    }
    //If answer is wrong, decrease score by one
    else {
        score--;
        console.log("wrong");
        evaluate.textContent = "Wrong"
    }
    //If the index representing the current question in the questions array is less than the index of the last question, the function to show the question is called again and it will show the next question
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        getQuestionSet()
    }
}

//Function to start quiz
function startQuiz() {
    hideIntro();
    getQuestionSet();
    
}

startQuiz()


// function showQuestion() {
    
// }
// showQuestion()








    
    // questions[i]
    // question.textContent = questions[i].question;
    // option.forEach(function(element, index){
    //     element.textContent = questions[i].options[index];
    //     element.addEventListener ('click', function(){
    //         i++;
    //         showQuestion();
    //         if(questions[i-1].answer == index) {
    //             result = "Correct";
                
    //             evaluate.textContent = result
                        
    //         } 
    //         else {
    //             result = "Wrong";
                
    //             evaluate.textContent = result
                        
    //         }


    //     })

        // element.addEventListener ('click', function(){
            
        //     if(questions[i].answer == index) {
        //         evaluate.textContent = "Correct";
                
        //     } 
        //     else {
        //         evaluate.textContent = "Wrong";
                
        //     }
            
        // })
        

    // })



// function next(){
//     i++;
//     showQuestion()  
// }

  
  
  

   
    
    



// function getQuestionSet(x) {
//     question.textContent = x.question;
//     option.forEach(function(element, index){
//         element.textContent = x.options [index];
//         element.addEventListener ('click', function(){
//             if(x.answer == index) {
//                 evaluate.textContent = "Correct";
//             } 
//             else {
//                 evaluate.textContent = "Wrong";
//             }
//         })

//     })
    
    
// }

// getQuestionSet(questions)