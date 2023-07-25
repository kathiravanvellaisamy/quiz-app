import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./quiz.scss";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : { ...prev, wrongAnswer: prev.wrongAnswer + 1 }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const tryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };
  return (
    <div className="quiz-container">
      <h1>React JS Question (R1)</h1>
      {!showResult ? (
        <>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-questions">/ {questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={answer}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="navigation">
            <button
              className="btn"
              onClick={onClickNext}
              disabled={answerIdx === null}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="show-result">
          <h3>Your Result</h3>
          <div className="details">
            <p>
              Total Questions : <span>{questions.length}</span>
            </p>
            <p>
              Total Score : <span>{result.score}</span>
            </p>
            <p>
              Correct Answer : <span>{result.correctAnswer}</span>
            </p>
            <p>
              Wrong Answer : <span>{result.wrongAnswer}</span>
            </p>
          </div>
          <button className="btn" onClick={tryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
