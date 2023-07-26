import Quiz from "./components/quiz/Quiz";
import { jsQuizz } from "./constants";

function App() {
  return (
    <>
      <h1>React Js MCQ </h1>
      <Quiz questions={jsQuizz.questions} />
    </>
  );
}

export default App;
