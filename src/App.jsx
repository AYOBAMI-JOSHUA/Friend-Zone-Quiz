import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Loader from './components/component/Loader';
import Error from './components/component/Error';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextQuestion from './components/component/NextQuestion';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/component/Timer';


const SECS_PER_QUESTION = 20

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsReamaining: null, 
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsReamaining: state.questions.length * SECS_PER_QUESTION,
      };  
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: 
         action.payload === question.correctOption ? 
         state.points + question.points : state.points,
      };
      
    case "nextQuestions":
    return {
      ...state,
      index: state.index + 1,
      answer: null
    };
    case "finished":
      return {
        ...state,
        status: "finish"
      };  
    case "restart":
    return {
      ...initialState,
      questions: state.questions,
      status: "ready"
    };  
    case "tick":
      return {
        ...state,
        secondsReamaining: state.secondsReamaining - 1,
        status: state.secondsReamaining === 0 ? "finish" : state.status,
      };  
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, secondsReamaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

  useEffect(function () {
    fetch("/data/qdb.json") 
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === "active" && <Progress index={index} answer={answer} points={points} numQuestions={numQuestions} maxPossiblePoints={maxPossiblePoints}/> }
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === "active" && (
          <>
           <Question question={questions[index]} dispatch={dispatch} answer={answer} /> 
           <Footer>
             <Timer 
               secondsReamaining={secondsReamaining}  
               dispatch={dispatch}
             />
             <NextQuestion 
               dispatch={dispatch} 
               index={index} 
               numQuestions={numQuestions} 
               answer={answer}
             />
           </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} />}
      </Main>
    </div>
  ); 
}

export default App;