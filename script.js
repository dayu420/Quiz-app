const questions1 = [
  "What is the capital of France?",
  "Which planet is known as the Red Planet?",
  "What is the largest mammal on Earth?",
  "Who wrote 'Romeo and Juliet'?",
  "What is the square root of 64?",
  "What is the chemical symbol for water?",
];

const  answers1 = [
  ["Rome", "London", "Paris", "Berlin"],
  ["Saturn", "Venus", "Jupiter", "Mars"],
  ["Blue whale", "Elephant", "Giraffe", "Shark"],
  ["Mark Twain", "Charles Dickens", "J.K. Rowling", "William Shakespeare"],
  ["8", "6", "7", "9"],
  ["H2O", "O2", "CO2", "NaCl"],
];

const correctAnswers1 = [
  "Paris",
  "Mars",
  "Blue whale",
  "William Shakespeare",
  "8",
  "H2O",
];





class Quiz {
  constructor(containerElement, questions, answers, correctAnswers) {
    this.containerElement = document.getElementById(`${containerElement}`);
    this.startButton = this.containerElement.querySelector("#start-quiz");
    this.questions = questions;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.intervalId = null;
    this.timer = 0;
    this.score = 0;
    this.answerButtons = [];
    this.currentIndex = 0;
    this.checkAnswer = this.checkAnswer.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM fully loaded and parsed");
      this.startButton.addEventListener("click", () => this.startGame());
    });
    
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;

  }


  startTimer() {
    this.intervalId = setInterval(()=> {
      this.timer++
      
      this.containerElement.querySelector('.quiz-timer span').style.color = this.getRandomColor();
     this.containerElement.querySelector('.quiz-timer').innerHTML = `Timer: ${this.timer}`;
    }, 1000);
  }

  restartGame() {
    this.timer = 0;
    this.currentIndex = 0;
    this.startGame();
  }

  checkAnswer(event) {
    if (this.currentIndex  + 1>= this.answers.length) {
      
      clearInterval(this.intervalId);
    
this.containerElement.innerHTML = '';

// Create and append a message with the final score
const paragraph = document.createElement('p');
paragraph.textContent = `You've scored ${this.score + 1} out of ${this.questions.length}. Well done!`;
this.containerElement.appendChild(paragraph);
return;
  }
    
    const currentButton = event.target;
    const answeredQuestion = event.target.textContent;
    const correctAnswer = this.correctAnswers[this.currentIndex];
    if(answeredQuestion === correctAnswer) {
      currentButton.style.backgroundColor = 'green';
      currentButton.style.color = 'white';
      this.currentIndex = this.currentIndex + 1;
      this.score++;
    this.displayQuestion();
    } else {
      this.answerButtons.forEach(button => {
        button.setAttribute('disabled', 'disabled');
      }
    );
    currentButton.style.backgroundColor = 'red';
    currentButton.style.color = 'white';
      const paragraph = document.createElement('p');
      paragraph.classList.add('endMessage');
      paragraph.textContent = `Sorry its a miss! Youve scored ${this.score} out of ${this.questions.length} questions. Try Again!`;
      const retryButton = document.createElement('button');
      retryButton.classList.add('retry-button');
      retryButton.textContent = 'Retry';
      retryButton.addEventListener('click', this.restartGame);
      this.answerButtons.forEach(button=> {
        if(button.textContent == correctAnswer) {
          button.style.backgroundColor = 'green';
          button.style.color = 'white';
        }
      })
     
        currentButton.classList.add('textCrossed');
      this.containerElement.appendChild(paragraph);
      this.containerElement.appendChild(retryButton);
      clearInterval(this.intervalId);

    }

  }

   displayQuestion() {
    if(this.answerButtons.length > 0) {
    this.answerButtons.forEach(btn => btn.removeEventListener('click', this.checkAnswer));
    this.answerButtons = [];
    }
     
    // Clear Quiz Container
    this.containerElement.textContent = "";
    
    
    // create question container
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");
    const questionEl = document.createElement("h2");
    questionEl.classList.add("question-element");
    // Create timer container
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');
    const quizTimer = document.createElement('span');
    quizTimer.classList.add('quiz-timer');
    quizTimer.textContent = `Timer: ${this.timer}`;
    timerContainer.appendChild(quizTimer);
    // Create score paragraph
    const scoreP = document.createElement('p');
    scoreP.classList.add('score-paragraph');
    const scoreDisplayEl = document.createElement('span');
    scoreDisplayEl.classList.add('score-display');
    // scoreDisplayEl.style.color = this.getRandomColor();
    quizTimer.insertAdjacentElement("afterend", scoreP);
    // display message
    questionEl.innerHTML = `${this.questions[this.currentIndex]}`;
    // append question to main container
    questionContainer.appendChild(questionEl);
    this.containerElement.appendChild(questionContainer);
    this.containerElement.querySelector('.question-element').style.backgroundColor = this.getRandomColor();
    // Append timer
    this.containerElement.appendChild(timerContainer);
    this.displayAnswers();
  

  } 

  displayAnswers() {
    // create answer container
    const answerContainer = document.createElement("div");
    answerContainer.classList.add('answer-container');
    // Loop thru answers array,create a button for each item and append them to html
    for (let i = 0; i < this.answers[this.currentIndex].length; i++) {
      const answerButton = document.createElement("button");
      answerButton.classList.add('answer-button');
      answerButton.textContent = this.answers[this.currentIndex][i];
      answerButton.addEventListener("click", this.checkAnswer);
      answerContainer.appendChild(answerButton);
      this.answerButtons.push(answerButton);
    }
    this.containerElement.appendChild(answerContainer);
  }

  startGame() {
    this.startTimer();
    this.displayQuestion();
    
    this.containerElement.querySelector('.question-element').style.backgroundColor = this.getRandomColor();
  }
  }


 


const quiz = new Quiz("quiz-app", questions1, answers1, correctAnswers1);
