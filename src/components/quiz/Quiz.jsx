import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./quiz.scss";
import AnswerTimer from "../answertimer/AnswerTimer";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState("");
  const { question, choices, correctAnswer, type } = questions[currentQuestion];
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setResult((prev) =>
      finalAnswer
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
    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const tryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setInputAnswer("");
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handeInputChange = (e) => {
    e.preventDefault();
    setInputAnswer(e.target.value);

    if (e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handeInputChange} />;
    }

    return (
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
    );
  };
  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && (
            <>
              <AnswerTimer duration={10} onTimeUp={handleTimeUp} />
              <span className="active-question-no">{currentQuestion + 1}</span>
              <span className="total-questions">/ {questions.length}</span>
              <h2>{question}</h2>
              {getAnswerUI()}
              <div className="navigation">
                <button
                  className="btn"
                  onClick={() => onClickNext(answer)}
                  disabled={answerIdx === null && !inputAnswer}
                >
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          )}
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
