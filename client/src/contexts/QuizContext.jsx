import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const QuizContext = createContext(null);

export default function QuizProvider({ children }) {
    const [quiz, setQuiz] = useState([]);
    
    const fetchQuiz = () => {
        Api.quiz.get()
        .then(res => setQuiz(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchQuiz, []);

    return (
        <QuizContext.Provider 
            value={{ quiz, fetchQuiz }}
        >
            { children }
        </QuizContext.Provider>
    );
}

export const useQuizContext = () => useContext(QuizContext);
