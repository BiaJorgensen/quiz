let question = document.querySelector("#question");
let option = document.querySelectorAll(".option");
let evaluate = document.querySelector("#evaluate");

let questions = [
{
    question: "1How do you name a variable?",
    options: ["1let variable = name", "1variableName = name", "1name = Variable", "1var: name"],
    answer: 0
},
{
    question: "2How do you name a variable?",
    options: ["2let variable = name", "2variableName = name", "2name = Variable", "2var: name"],
    answer: 1
},
{
    question: "3How do you name a variable?",
    options: ["3let variable = name", "3variableName = name", "3name = Variable", "3var: name"],
    answer: 2   
}
]
let i = 0;
var result = "";
evaluate.textContent = result
console.log(result);

function showQuestion() {
    
    
    questions[i]
    question.textContent = questions[i].question;
    option.forEach(function(element, index){
        element.textContent = questions[i].options[index];
        element.addEventListener ('click', function(){
            i++;
            showQuestion();
            if(questions[i-1].answer == index) {
                result = "Correct";
                
                evaluate.textContent = result
                        
            } 
            else {
                result = "Wrong";
                
                evaluate.textContent = result
                        
            }


        })

        // element.addEventListener ('click', function(){
            
        //     if(questions[i].answer == index) {
        //         evaluate.textContent = "Correct";
                
        //     } 
        //     else {
        //         evaluate.textContent = "Wrong";
                
        //     }
            
        // })
        

    })

}

// function next(){
//     i++;
//     showQuestion()  
// }

  showQuestion()
  
  

   
    
    



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