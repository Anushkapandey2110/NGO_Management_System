import React from 'react';
import QuestionnaireItem from './QuestionnaireItem';

const Questionnaire = () => {
  return (
    <div className="space-y-4 p-4">
      {questionsData.map((item) => (
        <QuestionnaireItem key={item.id} id={item.id} />
      ))}
    </div>
  );
};

export default Questionnaire;

