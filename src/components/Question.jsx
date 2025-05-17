import Option from "./component/Option"

function Question({question, dispatch, answer}) {
    
    return (
        <div>
            <h4>{question.question}</h4>

            <div className="option-container">
               <Option question={question} dispatch={dispatch} answer={answer}/>
            </div>
        </div>
        
    )
}

export default Question