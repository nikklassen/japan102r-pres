var ANSWER_TIMER = 5;

var questionDiv = document.getElementById("question");
var answerDiv = document.getElementById("answer");

var questionNum = {
  anime: 1,
  geography: 1,
  food: 1,
  ghibli: 1,
};

function showAnswer(questionType, questionDiv, answerDiv, answerHtml) {
  function cb(e) {
    e.stopPropagation();

    document.removeEventListener('click', cb, true);
    questionDiv.style.display = 'none';
    answerDiv.style.display = 'block';

    if (e.shiftKey) {
        answerDiv.innerHTML = answerHtml;
        return;
    }

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
  }

  document.addEventListener('click', cb, true);
  questionNum[questionType]++;
}

document.querySelectorAll('.category').forEach(function(b) {
  b.addEventListener('click', function(e) {
    e.stopPropagation();

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
    questionDiv.style.display = 'block';
    answerDiv.style.display = 'none';

    setTimeout(function() {
      showAnswer(b.id, questionDiv, answerDiv, a.innerHTML);
    }, 1);
  }, true);
});
