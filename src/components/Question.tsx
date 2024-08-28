import { Question as QuestionType } from "./App";
import Options from "./Options";

interface Props {
  question: QuestionType;
}

const Question = ({ question }: Props) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
