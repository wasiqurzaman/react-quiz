import { useEffect, useReducer } from "react";
import Footer from "./Footer";
import Header from "./Header";
import WelcomeScreen from "./WelcomeScreen";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface AppState {
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
}

const initialState: AppState = {
  questions: [],
  status: "loading",
};

interface Action {
  type:
    | "dataReceived"
    | "dataFailed"
    | "start"
    | "newAnswer"
    | "nextQuestion"
    | "restart"
    | "tick";
  payload?: Question[];
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload!,
        status: "ready",
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(error => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <WelcomeScreen />
      <Footer>
        <h2>Footer</h2>
      </Footer>
    </div>
  );
}

export default App;
