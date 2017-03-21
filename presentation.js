var ANSWER_TIMER = 5;

var questionDiv = document.getElementById("question");
var answerDiv = document.getElementById("answer");

var questionNum = {
  anime: 1,
  geography: 1,
  food: 1,
  ghibli: 1,
};

function showAnswer(questionType, answerDiv, answerHtml) {
  function cb() {
    document.removeEventListener('click', cb);
    answerDiv.innerHTML = ANSWER_TIMER;

    var remainingSeconds = ANSWER_TIMER - 1;
    var timer = setInterval(function() {
      if (remainingSeconds > 0) {
        answerDiv.innerHTML = remainingSeconds;
        remainingSeconds -= 1;
      } else {
        answerDiv.innerHTML = answerHtml;
        clearInterval(timer);
      }
    }, 1000);

    questionNum[questionType]++;
  }
  document.addEventListener('click', cb);
}

document.querySelectorAll('.category').forEach(function(b) {
  b.addEventListener('click', function() {

    if (b.className.indexOf('disabled') > -1) {
      return;
    }

    var q = document.getElementById(b.id + '-question-' + questionNum[b.id]);
    if (q === null) {
      return;
    }

    // check whether next question exists
    var questionIndex = questionNum[b.id] + 1;
    var nextQ = document.getElementById(b.id + '-question-' + questionIndex); 
    if (nextQ === null) {
      b.className += ' disabled';
    }

    var a = document.getElementById(b.id + '-answer-' + questionNum[b.id]);

    questionDiv.innerHTML = q.innerHTML;

    setTimeout(function() {
      showAnswer(b.id, answerDiv, a.innerHTML);
    }, 1);
  });
});
