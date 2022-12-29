let question = document.querySelector("#question");
let option = document.querySelectorAll(".option");
let evaluate = document.querySelector("#evaluate");

let questionSet1 = {
    question: "How do you name a variable?",
    options: ["let variable = name", "variableName = name", "name = Variable", "var: name"],
    answer: 0
}

function getQuestionSet(x) {
    question.textContent = x.question;
    option.forEach(function(element, index){
        element.textContent = x.options [index];
        element.addEventListener ('click', function(){
            if(x.answer == index) {
                evaluate.textContent = "Correct";
            } 
            else {
                evaluate.textContent = "Wrong";
            }
        })

    })
    
    
}

getQuestionSet(questionSet1)