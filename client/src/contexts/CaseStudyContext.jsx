import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const CaseStudyContext = createContext(null);

export default function CaseStudyProvider({ children }) {
    const [caseStudies, setCaseStudies] = useState([]);
       
    const fetchCaseStudy = () => {
        Api.caseStudy.get()
        .then(res => setCaseStudies(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchCaseStudy, []);

    return (
        <CaseStudyContext.Provider 
            value={{ caseStudies, fetchCaseStudy }}
        >
            { children }
        </CaseStudyContext.Provider>
    );
}

export const useCaseStudyContext = () => useContext(CaseStudyContext);