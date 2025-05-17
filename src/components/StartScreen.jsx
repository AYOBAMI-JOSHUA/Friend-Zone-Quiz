function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start-screen">
            <h2>Welcome to The Friend-Zone Quiz</h2>
            <h3>{numQuestions} questions to test your zoness</h3>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "start"})}>Let's start</button>
        </div>
    )
}

export default StartScreen