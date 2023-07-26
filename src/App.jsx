import Quiz from "./components/quiz/Quiz";
import { jsQuizz } from "./constants";

function App() {
  return (
    <>
      <div className="header">
        <h1>React Js MCQ </h1>
      </div>
      <Quiz questions={jsQuizz.questions} />
    </>
  );
}

export default App;
