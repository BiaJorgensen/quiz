let question = document.querySelector("#question");
let option = document.querySelectorAll(".option");

let questionSet1 = {
    question: "How do you name a variable?",
    options: ["let variable = name", "variableName = name", "name = Variable", "var: name"],
    answer: "let variable = name"
}

function getQuestionSet(x) {
    question.textContent = x.question;
    option.forEach(function(element, index){
        element.textContent = x.options [index];

    })
    
    
}

getQuestionSet(questionSet1)