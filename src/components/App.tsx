import { useEffect, useReducer } from "react";
import Footer from "./Footer";
import Header from "./Header";
import WelcomeScreen from "./WelcomeScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Loader from "./Loader";
import Mains from "./Mains";
import Error from "./Error";
import Progress from "./Progress";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface AppState {
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  currentIndex: number;
  currentAnswer: number | null;
  currentPoints: number;
  highscore: number;
  secondsRemaining: number | null;
}
export interface Action {
  type:
    | "dataReceived"
    | "dataFailed"
    | "start"
    | "newAnswer"
    | "nextQuestion"
    | "finish"
    | "restart"
    | "tick";
  payload?: Question[] | number | string;
}

const initialState: AppState = {
  questions: [],
  status: "loading",
  currentIndex: 0,
  currentAnswer: null,
  currentPoints: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload!,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentAnswer: null,
      };
    default:
      return state;
  }
}

function App() {
  const [
    { questions, status, currentIndex, currentAnswer, currentPoints },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(error => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Mains>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <WelcomeScreen dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              currentIndex={currentIndex}
              currentAnswer={currentAnswer}
              currentPoint={currentPoints}
              maxPoints={maxPoints}
              numQuestions={questions.length}
            />
            <Question question={questions[currentIndex]} />
            <Footer>
              <NextButton dispatch={dispatch} />
            </Footer>
          </>
        )}
      </Mains>
    </div>
  );
}

export default App;
