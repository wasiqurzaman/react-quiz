import React from "react";
import { Action, Question } from "./App";

interface Props {
  question: Question;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}

const Options = ({ question, dispatch, answer }: Props) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload2: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
