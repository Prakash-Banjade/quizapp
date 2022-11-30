import React, { useState, useContext } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import QuizCard from "./components/QuizCard";
import QuizContext from "./components/context/context";
import categories from "./components/categories";
function App() {
  const quizContext = useContext(QuizContext);
  const [currentCategory, setCurrentCategory] = useState("Any");
  const [currentDifficylty, setCurrentDifficulty] = useState("Any");
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleCategorySelect = (e) => {
    if (!playing) setCurrentCategory(e.target.value);
    // console.log(categories[e.target.value])
  };
  const handleDifficultySelect = (e) => {
    if (!playing) setCurrentDifficulty(e.target.value);
  };
  const handleInput = (e) => {
    if (!playing) {
      if (e.target.value > 50) {
        setNoOfQuestions(50);
        return;
      }
      if (e.target.value > 0) setNoOfQuestions(Math.abs(e.target.value));
      setNoOfQuestions(e.target.value);
    }
  };

  return (
    <>
      <SearchBar
        category={currentCategory}
        difficulty={currentDifficylty}
        numberOfQuestions={noOfQuestions}
        handleCategorySelect={handleCategorySelect}
        handleDifficultySelect={handleDifficultySelect}
        handleInput={handleInput}
        setShowQuiz={setShowQuiz}
        playing={playing}
        setPlaying={setPlaying}
      />
      {showQuiz ? (
        <main>
          <QuizCard
            noOfQuestions={noOfQuestions}
            score={score}
            setScore={setScore}
            playing={playing}
            setPlaying={setPlaying}
            setShowQuiz={setShowQuiz}
          />

          <div className="scoreboard">
            <span>Your score:</span>{" "}
            <span>
              {" "}
              {score} out of {noOfQuestions}
            </span>
            <div className="info">
              Click on <code>'Reset'</code> to reset the quiz.
            </div>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
