import React from "react";
import { Action } from "./App";

interface Props {
  dispatch: React.Dispatch<Action>;
  currentAnswer: number | null;
  currentIndex: number;
  numQuestions: number;
}

const NextButton = ({
  dispatch,
  currentAnswer,
  currentIndex,
  numQuestions,
}: Props) => {
  if (currentAnswer === null) return null;
  if (currentIndex < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (currentIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
};

export default NextButton;
