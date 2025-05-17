function FinishScreen({ points, maxPossiblePoints, dispatch }) {
    const percentage = (points/maxPossiblePoints) * 100

    let advice ; 
    if (percentage === 100) advice = 'HE/She is your soulmate🤩🥇';
    if(percentage >= 80 && percentage < 100) advice = 'Green light🎉';
    if(percentage >= 50 && percentage < 80) advice = 'You still got a chance😊';
    if(percentage >= 0 && percentage < 50) advice = '🙂He/She likes you as a friend';
    if(percentage === 0) advice = '😆Give up, you are nothing to her/him';

    return (
        <>
          <div className="result">
                <p >
                    You scored = <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
                </p>
                <p>{advice}</p>
         </div>
         <div className="nextbtn" >
                <button 
                onClick={() => dispatch({ type: "restart"})}
                >
                    Restart quiz
                </button>
         </div>
        </>






        
    )
}

export default FinishScreen