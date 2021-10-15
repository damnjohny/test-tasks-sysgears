const quizData = {
  questions: {
    // ids: ["q_1", "q_2", "q_3", "q_4"],
    q_1: {
      id: "q_1",
      questionText: "What is your marital status?",
      answers: [
        { answerText: "Single", nextQuestion: "q_2" },
        { answerText: "Married", nextQuestion: "q_3" },
      ],
    },
    q_2: {
      id: "q_2",
      questionText: "Are you planning on getting married next year?",
      answers: [
        { answerText: "Yes", nextQuestion: "" },
        { answerText: "No", nextQuestion: "" },
      ],
    },
    q_3: {
      id: "q_3",
      questionText: "How long have you been married?",
      answers: [
        { answerText: "Less than a year", nextQuestion: "" },
        { answerText: "More than a year", nextQuestion: "q_4" },
      ],
    },
    q_4: {
      id: "q_4",
      questionText: "Have you celebrated your one year anniversary?",
      answers: [
        { answerText: "Yes", nextQuestion: "" },
        { answerText: "No", nextQuestion: "" },
      ],
    },
  },
};

const answersListRef = document.querySelector(".js-answers-list");
const questionTextRef = document.querySelector(".js-question-text");
const answerLabelTextRef = document.querySelector(".js-answer-label-text");

const submitBtnRef = document.getElementById("submit");
const restartBtnRef = document.getElementById("restart");

answersListRef.addEventListener("click", onAnswerClick);
submitBtnRef.addEventListener("click", onSubmitBtnClick);
restartBtnRef.addEventListener("click", onRestartBtnClick);

const firstQuestionId = "q_1";
let answersItemIdx = 0;
let questionId = firstQuestionId;
let answeredQuestionsList = [];
const resultQuiz = {
  paths: {
    number: 0,
    list: [],
  },
};

function onAnswerClick(e) {
  answersItemIdx = e.target.value;
}

function onSubmitBtnClick(e) {
  e.preventDefault();

  restartBtnRef.disabled = true;

  const answeredQuestion = {};

  answeredQuestion[quizData.questions[questionId].questionText] =
    quizData.questions[questionId].answers[answersItemIdx].answerText;

  answeredQuestionsList.push(answeredQuestion);

  questionId =
    quizData.questions[questionId].answers[answersItemIdx].nextQuestion;

  if (questionId === "") {
    resultQuiz.paths.number += 1;

    if (resultQuiz.paths.number > 0) {
      resultQuiz.paths.list.slice(
        resultQuiz.paths.number,
        0,
        answeredQuestionsList
      );
    }
    resultQuiz.paths.list.push(answeredQuestionsList);
    const resultQuizJson = JSON.stringify(resultQuiz);

    submitBtnRef.disabled = true;
    restartBtnRef.disabled = false;

    console.log("resultQuiz: ", resultQuiz.paths);
    console.log("resultQuizJson: ", resultQuizJson);

    return;
  }

  renderQuestion(quizData.questions, questionId);
}

function onRestartBtnClick() {
  questionId = firstQuestionId;
  answeredQuestionsList = [];
  renderQuestion(quizData.questions, questionId);
  submitBtnRef.disabled = false;
}

function renderQuestion(questionsData, renderQuestionId) {
  for (const key in questionsData) {
    const questionsItem = questionsData[key];

    if (questionsItem.id === renderQuestionId) {
      questionTextRef.textContent = questionsItem.questionText;

      const answersMarkup = questionsItem.answers
        .map((answersItem, answersItemIdx) => {
          return `
        <li>
            <label class="js-answer-label">
              <span class="js-answer-label-text">${answersItem.answerText}</span>
              <input type="radio" name="answer" value=${answersItemIdx} />
            </label>
          </li>
        `;
        })
        .join();

      answersListRef.innerHTML = answersMarkup;
    }
  }
}

renderQuestion(quizData.questions, questionId);
