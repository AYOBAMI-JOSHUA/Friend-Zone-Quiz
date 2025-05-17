function Progress({ index, points, numQuestions, maxPossiblePoints, answer}) {
    return (
        <div className="head">
            <header >
                <progress max={numQuestions} value={index + Number(answer !== null)} />

                <div className="points">
                    <p>
                        Question <strong>{index + 1}</strong> / {numQuestions}
                    </p>

                    <p><strong>{points}</strong> / {maxPossiblePoints} </p>
                </div>
                
            </header>
        </div>
        
    )
}

export default Progress