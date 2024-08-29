import React from "react";
import { Action, Question as QuestionType } from "./App";
import Options from "./Options";

interface Props {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}

const Question = ({ question, dispatch, answer }: Props) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
