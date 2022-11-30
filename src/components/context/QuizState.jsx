import React, { useState } from "react";
import Context from "./context";

const QuizState = (props) => {
  const [questions, setQuestions] = useState([]);

  return (
    <Context.Provider
      value={{
        questions,
        setQuestions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default QuizState;
