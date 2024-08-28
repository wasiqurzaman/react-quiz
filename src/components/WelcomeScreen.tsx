import React from "react";
import { Action } from "./App";

interface Props {
  dispatch: React.Dispatch<Action>;
}

const WelcomeScreen = ({ dispatch }: Props) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>15 questions to test your React mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
};

export default WelcomeScreen;
