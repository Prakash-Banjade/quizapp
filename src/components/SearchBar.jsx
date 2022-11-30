import React, { useContext } from "react";
import Categories from "./categories";
import QuizContext from "./context/context";

const SearchBar = (props) => {
  const quizContext = useContext(QuizContext);
  let { questions, setQuestions } = quizContext;
  const {
    category,
    difficulty,
    numberOfQuestions,
    handleCategorySelect,
    handleDifficultySelect,
    handleInput,
  } = props;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let api = `https://opentdb.com/api.php?amount=${Number(numberOfQuestions)}&${category !== 'Any'? `category=${Categories[category]}`: ''}&type=multiple&${difficulty !== 'Any'? `difficulty=${String(difficulty).toLowerCase()}`:''}`;
    let response = await fetch(api);
    let responseData = await response.json();
    setQuestions(responseData.results);
    console.log(responseData)
    console.log(api)
    props.setShowQuiz(true)
    props.setPlaying(true)
  };

  return (
    <div className="search-bar">
      <div className="select-category select-field">
        <label htmlFor="category_selection">Select Category: </label>
        <select
          value={category}
          onChange={handleCategorySelect}
          id="category_selection"
          readOnly={props.playing}
        >
          {Array.from(Object.keys(Categories)).map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <div className="select-difficulty select-field">
        <label htmlFor="difficulty_selection">Select Difficulty: </label>
        <select
          value={difficulty}
          onChange={handleDifficultySelect}
          id="difficulty_selection"
          readOnly={props.playing}
        >
          <option value="Any">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="select-quantity select-field">
        <label htmlFor="quantity_selection">No. of Questions: </label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={handleInput}
          id="quantity_selection"
          max={50}
          min={5}
          maxLength="2"
          readOnly={props.playing}
        />
      </div>

      <button disabled={props.playing} type="submit" className="submitBtn" onClick={handleOnSubmit}>
        Generate
      </button>
    </div>
  );
};

export default SearchBar;
