import React from "react";
import { Action } from "./App";

interface Props {
  dispatch: React.Dispatch<Action>;
}

const NextButton = ({ dispatch }: Props) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextButton;
