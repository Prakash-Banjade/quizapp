import React, { useContext, useEffect, useState } from "react";
import QuizContext from "./context/context";

const QuizCard = (props) => {
  const quizContext = useContext(QuizContext);
  const [isFinish, setIsFinish] = useState(false);
  let { questions } = quizContext;

  const [currInd, setCurrInd] = useState(0);
  
  const [questionInfo, setQuestionInfo] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });

  const [optionClicked, setOptionClicked] = useState(false);
  let { question, options, correctAnswer } = questionInfo;

  useEffect(() => {
    if (questions.length === 0) return;

    setQuestionInfo({
      question: questions[currInd].question,
      options: [
        ...questions[currInd].incorrect_answers,
        questions[currInd].correct_answer,
      ].sort((a, b) => {
        return 0.5 - Math.random();
      }),
      correctAnswer: questions[currInd].correct_answer,
    });
  }, [questions, currInd]);

  const handleOptionsClicked = (e) => {
    e.preventDefault();
    if (e.target.innerText === correctAnswer) {
      e.target.classList.add("correct");
      props.setScore((prevScore) => prevScore + 1);
    } else {
      e.target.classList.add("incorrect");
      Array.from(document.querySelectorAll(".option")).forEach((option) => {
        if (option.innerText === questionInfo.correctAnswer) {
          option.classList.add("correct");
          return;
        }
      });
    }
    setOptionClicked(true);
  };

  const handlePlayNext = () => {
    if (questions.length === currInd + 1) {
        setIsFinish(true)
      return;
    }
    setCurrInd((prevInd) => prevInd + 1);
    Array.from(document.querySelectorAll(".option")).forEach((option) => {
      option.classList.remove("correct");
      option.classList.remove("incorrect");
    });
    setOptionClicked(false);
  };

  const handleReset = () => {
    setCurrInd(0);
    Array.from(document.querySelectorAll(".option")).forEach((option) => {
      option.classList.remove("correct");
      option.classList.remove("incorrect");
    });
    setOptionClicked(false);
    props.setPlaying(false);
    props.setShowQuiz(false)
    props.setScore(0)
    setIsFinish(false);
  };

  return (
    <div className="quiz-container">
      <span className="questions_remaining">{`${currInd + 1} / ${
        props.noOfQuestions
      }`}</span>
      <header>
        <h2>{question}</h2>
      </header>

      <div className="answers">
        <button
          disabled={optionClicked}
          className="option"
          onClick={handleOptionsClicked}
        >
          {options[0]}
        </button>
        <button
          disabled={optionClicked}
          className="option"
          onClick={handleOptionsClicked}
        >
          {options[1]}
        </button>
        <button
          disabled={optionClicked}
          className="option"
          onClick={handleOptionsClicked}
        >
          {options[2]}
        </button>
        <button
          disabled={optionClicked}
          className="option"
          onClick={handleOptionsClicked}
        >
          {options[3]}
        </button>
      </div>

      <div className="controller-btns" style={{ display: "flex" }}>
        <button style={{flexGrow: isFinish? '1':'0'}} className="resetBtn" onClick={handleReset}>
          Reset
        </button>
        <button 
        style={{display: isFinish? 'none': 'inline'}}
          disabled={!optionClicked}
          className="playNextBtn"
          onClick={handlePlayNext}
        >
          Play Next
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
