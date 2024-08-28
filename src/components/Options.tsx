import { Question } from "./App";

interface Props {
  question: Question;
}

const Options = ({ question }: Props) => {
  return (
    <div className="options">
      {question.options.map(option => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
