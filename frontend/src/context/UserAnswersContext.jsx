import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const UserAnswersContext = createContext();

export const useUserAnswers = () => {
  return useContext(UserAnswersContext);
};

export const UserAnswersProvider = ({ children }) => {
  const [userAnswers, setUserAnswers] = useState([]);

  const addAnswer = (unique_id,description, answer, question_type, user_id) => {
    setUserAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (answer) => answer.unique_id === unique_id
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          answer,
        };
        return updatedAnswers;
      } else {
        return [
          ...prev,
          {
            unique_id,
            description,
            answer,
            question_type,
            user_id,
          },
        ];
      }
    });
  };

  const submitAnswers = async (answers) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      console.log('Token from localStorage:', token);
      const response = await axios.post(
        'http://localhost:3001/api/question/submitSurvey',
        { answers }, // Send the answers in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      console.log("Response : " , response)
      if (response.status === 201) {
        console.log('Answers submitted successfully:', response.data);
        return true;
      } else {
        console.error('Failed to submit answers:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      return false;
    }
  };

  return (
    <UserAnswersContext.Provider value={{ userAnswers, addAnswer, submitAnswers }}>
      {children}
    </UserAnswersContext.Provider>
  );
};
