interface Props {
  currentIndex: number;
  numQuestions: number;
  currentPoint: number | null;
  maxPoints: number;
  currentAnswer: number | null;
}

const Progress = ({
  currentIndex,
  numQuestions,
  currentPoint,
  maxPoints,
  currentAnswer,
}: Props) => {
  return (
    <header className="progress">
      <progress
        max={15}
        value={currentIndex + Number(currentAnswer !== null)}
      />
      <p>
        Question <strong>{currentIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{currentPoint}</strong>/{maxPoints} points
      </p>
    </header>
  );
};

export default Progress;
