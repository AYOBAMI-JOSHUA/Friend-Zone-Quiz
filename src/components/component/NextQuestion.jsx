function NextQuestion ({ dispatch, answer, index, numQuestions }) {

    if (answer === null) return null

    if (index < numQuestions - 1) return (
        <div className="nextbtn" >
            <button 
            onClick={() => dispatch({ type: "nextQuestions"})}
            >
                Next
            </button>
        </div>
        
    )

    if (index === numQuestions - 1) return (
        <div className="nextbtn" >
            <button 
            onClick={() => dispatch({ type: "finished"})}
            >
                Finish
            </button>
        </div>
        
    )
}

export default NextQuestion 