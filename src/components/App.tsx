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
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";

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
    | "timerTick";
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

const SECONDS_PER_QUESTION = 20;

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
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        currentAnswer: action.payload!,
        currentPoints:
          action.payload === question.correctOption
            ? state.currentPoints + question.points
            : state.currentPoints,
      };
    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.currentPoints > state.highscore
            ? state.currentPoints
            : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };

    case "timerTick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}

function App() {
  const [
    {
      questions,
      status,
      currentIndex,
      currentAnswer,
      currentPoints,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then(res => res.json())
  //     .then(data => dispatch({ type: "dataReceived", payload: data }))
  //     .catch(error => dispatch({ type: "dataFailed" }));
  // }, []);

  useEffect(() => {
    fetch("../../data/questions.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data.questions });
      })
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
              numQuestions={numQuestions}
            />
            <Question
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={currentAnswer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                currentAnswer={currentAnswer}
                currentIndex={currentIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={currentPoints}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Mains>
    </div>
  );
}

export default App;
