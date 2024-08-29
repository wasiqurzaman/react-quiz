import React, { useEffect } from "react";
import { Action } from "./App";

type Props = {
  secondsRemaining: number;
  dispatch: React.Dispatch<Action>;
};

const Timer = ({ secondsRemaining, dispatch }: Props) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "timerTick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
