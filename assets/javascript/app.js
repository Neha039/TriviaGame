$(document).ready(function () {

    //Game Timer 
    var countDown = 30;
    var quizTimer = setInterval(function () {
      countDown--;
      document.getElementById('timer').textContent = countDown;
      if (countDown <= 0)
        clearInterval(quizTimer);
    }, 1000)
  
    //TimeUp Events
    setTimeout(timeUp, 1000 * 30);
    function timeUp() {
      $('body').css('background-image', 'url(./assets/img/back1.jpg)');
      $('.scoreboard').css('font-size', '2em').css('color', '#FF0000');
      $('.quiz').css('visibility', 'hidden');
      $('.ra').css('visibility', 'visible');
    }
  });
  
  //Build Quiz
  (function () {
    function newQuiz() {
      //Array to store HTML output
      var output = [];
  
      //For each question loop
      quizQs.forEach((newQs, qNum) => {
        //Array to store answers
        var answers = []
  
        for (ansLetter in newQs.answers) {
          //Add radio button for each answer 
          answers.push(
            `<label>
                <input type='radio' name='question${qNum}' value='${ansLetter}'>
                ${ansLetter} :
                ${newQs.answers[ansLetter]}
               </label>`
          );
        }
  
        //Push question and answers to answers array
        output.push(
          `<div class='question'> ${newQs.question} </div>
          <div class='answers'> ${answers.join('')} </div>`
        );
      });
  
      //Push the questions, answers, and radio buttons to HTML
      quizContainer.innerHTML = output.join('');
    }
  
    //Track answers
    function showResults() {
      var answerArrays = quizContainer.querySelectorAll('.answers');
  
      let numCorrect = 0;
  
      //Get users answers
      quizQs.forEach((newQs, qNum) => {
        var answerArray = answerArrays[qNum];
        var selector = `input[name=question${qNum}]:checked`;
        var userAnswer = (answerArray.querySelector(selector) || {}).value;
  
        // Increment CORRECT if answer is correct
        if (userAnswer === newQs.correctAnswer) {
          numCorrect++;
  
          //Change correct answers to green/wrong answers to red
          answerArrays[qNum].style.color = 'green';
        } else {
          answerArrays[qNum].style.color = 'red';
        }
      });
  
      //Display score
      resultsArray.innerHTML = `${numCorrect} out of ${quizQs.length}`;
    }
  
    //Write to Scoreboard
    var quizContainer = document.getElementById('quiz');
    var resultsArray = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    // Start Quiz
    var quizQs = [
      {
        question: 'Who was the legendary Benedictine monk who invented champagne ?',
        answers: {
          a: 'Veuve Clicquot',
          b: 'HLaurent Perrier',
          c: 'Dom Perignon',
          d: 'Piper Heidsieck',
        },
        correctAnswer: 'c'
      },
      {
        question: 'Where would you find the Sea of Tranquility?',
        answers: {
          a: 'The Sun',
          b: 'The Moon',
          c: 'The Star',
          d: 'The Sky',
        },
        correctAnswer: 'b'
      },
      {
        question: 'Which of the following was the main medium of economic exchange for Ancient Egypt??',
        answers: {
          a: 'Grain',
          b: 'Viziers',
          c: 'Cattle',
          d: 'Egyptian Deniers',
        },
        correctAnswer: 'a'
      },
      {
        question: 'What kind of weapon is a falchion ?',
        answers: {
          a: 'A sword',
          b: 'A club',
          c: 'A dagger',
          d: 'A halberd',
        },
        correctAnswer: 'a'
      },
      {
        question: 'Name the seventh planet from the sun.',
        answers: {
          a: 'Saturn',
          b: 'Venus',
          c: 'Uranus',
          d: 'Neptune',
        },
        correctAnswer: 'c'
      },
      {
        question: 'What colour is a Himalayan poppy ?',
        answers: {
          a: 'Yellow',
          b: 'White',
          c: 'Pink',
          d: 'Blue',
        },
        correctAnswer: 'd'
      }
    ];
  
    //Call function `build quiz`
    newQuiz();
  
    //Button to display score
    submitButton.addEventListener('click', showResults);
    $(function () {
      $('.ra').click(function () {
        $('.ra').hide();
        $('.ra').show();
      });
    })
  })();
  