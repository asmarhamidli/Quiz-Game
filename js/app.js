const start_btn = document.querySelector(".start-button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .quit-button");
const continue_btn = document.querySelector(".buttons .restart-button");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const next_btn = quiz_box.querySelector('.next-button');
const resultBox = document.querySelector(".result-box");
const restartButton = resultBox.querySelector(".restart-button");
const quitButton = resultBox.querySelector(".quit-button");


let queCount = 0;
let que_number = 1;
let userScore = 0;


quitButton.onclick = () => {
window.location.reload();
}

restartButton.onclick = ()=>{
  quiz_box.classList.add("activeQuiz"); 
  resultBox.classList.remove("activeResult"); 
  queCount = 0;
  que_number = 1;
  userScore = 0;
  showQuestions(queCount);
  queCounter(que_number); 
  next_btn.classList.remove("show"); 
}

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  questionsCounter(1);
};



//Next butonuna klik olunsa
next_btn.onclick = () => {
if(queCount < questions.length - 1){
  queCount++;
  que_number++;
  showQuestions(queCount);
  questionsCounter(que_number);
  next_btn.style.display = "none";
}else {
  console.log('Questions completed');
  showResult();
}
}


//sual ve cavablari arrayden getirib ekrana yazdirmaq
function showQuestions(index){
const que_text = document.querySelector(".que-text");

let que_tag = '<span>' + questions[index].number + '.' +  questions[index].question + '</span>';
let option_tag = ' <div class="option">' + questions[index].options[0] + '<span></span></div>'
                   + ' <div class="option">' + questions[index].options[1] + '<span></span></div>'
                   + ' <div class="option">' + questions[index].options[2] + '<span></span></div>'
                   + ' <div class="option">' + questions[index].options[3] + '<span></span></div>';
que_text.innerHTML = que_tag;
option_list.innerHTML = option_tag;
const option = option_list.querySelectorAll('.option');
for (let i = 0; i < option.length; i++){
option[i].setAttribute("onclick", "optionSelected(this)");
}
}

let tickIcon = '  <div class="icon tick"><i class="fas fa-check" aria-hidden="true"></i></div>';
let crossIcon = '  <div class="icon cross"><i class="fas fa-times" aria-hidden="true"></i></div>';

function optionSelected(answer){
let userAnswer = answer.textContent;
let correctAnswer = questions[queCount].answer;
let allOptions = option_list.children.length;
if(userAnswer === correctAnswer){
  userScore += 1;
answer.classList.add("correct");
console.log('answer is correct');
answer.insertAdjacentHTML("beforeend" , tickIcon);
}else{
  answer.classList.add("incorrect");
  console.log('answer is wrong');
  answer.insertAdjacentHTML("beforeend" , crossIcon);
  //eger cavab sehvdise avtomatik duzgun olani sec
  for (let i = 0; i < allOptions; i++){
  if(option_list.children[i].textContent === correctAnswer){
    option_list.children[i].setAttribute("class", "option correct");
    option_list.children[i].insertAdjacentHTML("beforeend" , tickIcon);
  }
}


for(let i = 0; i< allOptions; i++){
  option_list.children[i].classList.add('disabled');
}

}next_btn.style.display = "block";
}

function showResult(){
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score-text");
  if(userScore > 3){
   let scoreTag = '  <span>and congrats!, you got <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
   scoreText.innerHTML = scoreTag;
  }
  else if(userScore > 1){
    let scoreTag = '  <span>and good, you got  <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
   }
  else{
    let scoreTag = '  <span>and sorry, you got only <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
   }
}

//asagidaki sual saygaci

function questionsCounter(index){
const bottom_questions_counter = quiz_box.querySelector('.total-que');
let totalCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
bottom_questions_counter.innerHTML = totalCountTag;
}