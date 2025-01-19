// import React, { useState } from 'react';
// import { SquareChevronDown, SquareChevronUp, Loader2 } from 'lucide-react';
// import { Button } from './Button';
// import { Textarea } from './Textarea';
// import { Input } from './Input';
// import { RadioGroup, RadioGroupItem } from './RadioGroup';
// import { Label } from './Label';





// const QuestionnaireItem = ({ que }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // const questionnaireData = questionsData.find(item => item.id === id);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleAnswerChange = (questionId, value) => {
//     setUserAnswers(prev => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log('Submitted answers:', userAnswers);
//     toggleExpand();
//     setIsLoading(false);
//     // You can add logic here to handle the submission (e.g., show a success message)
//   };

//   const renderAnswerInput = (question) => {
//     const { id, answerType, options } = question;
//     const value = userAnswers[id] || '';

//     switch (answerType) {
//       case 'text':
//         return (
//           <Input
//             type="text"
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'textarea':
//         return (
//           <Textarea
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'number':
//         return (
//           <Input
//             type="number"
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'date':
//         return (
//           <Input
//             type="date"
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'password':
//         return (
//           <Input
//             type="password"
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'radio':
//         return (
//           <RadioGroup
//             value={value}
//             onValueChange={(value) => handleAnswerChange(id, value)}
//             className="flex flex-col space-y-2"
//           >
//             {options?.map((option, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <RadioGroupItem value={option} id={`${id}-option-${index}`} />
//                 <Label htmlFor={`${id}-option-${index}`} className="text-white">{option}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         );
//       default:
//         return null;
//     }
//   };

//   // if (!questionnaireData) {
//   //   return <div className="text-white">Questionnaire not found.</div>;
//   // }

//   return (
//     <div className="border border-gray-700 rounded-lg overflow-hidden  my-10 bg-gradient-to-b from-slate-800/50 to-slate-900/50  divide-y divide-slate-700/50 backdrop-blur-sm shadow-xl">
//       <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 transition-all duration-300">
//         <div className="flex items-center space-x-4">
//           <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
//             <img
//               src={que.image || "/placeholder.svg?height=48&width=48"}
//               alt="Questionnaire icon"
//               className="w-full h-full rounded-lg object-cover opacity-80"
//             />
//           </div>
//           <div>
//             <h3 className="text-white text-lg font-medium">{que.title}</h3>
//             {/* <p className="text-gray-400">{questionnaireData.author}</p> */}
//           </div>
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={toggleExpand}
//           className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
//         >
//           {isExpanded ? (
//             <SquareChevronUp className="w-30 h-20" />
//           ) : (
//             <SquareChevronDown className="w-30 h-20" />
//           )}
//         </Button>
//       </div>
//       {isExpanded && (
//         <div className="p-4 bg-slate-800">
//           {/* {questionnaireData.questions.map((question) => ( */}
//             <div key={que.id} className="mb-4">
//               <p className="text-white mb-2">{que.question}</p>
//               {renderAnswerInput(que)}
//             </div>
//           {/* ))} */}
//           <Button onClick={() => {handleSubmit();}} disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg mt-4">
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               'Submit Answers'
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionnaireItem;



// File 2: QuestionnaireItem.js
// import React, { useState } from 'react';
// import { SquareChevronDown, SquareChevronUp, Loader2 } from 'lucide-react';
// import { Button } from './Button';
// import { Textarea } from './Textarea';
// import { Input } from './Input';
// import { RadioGroup, RadioGroupItem } from './RadioGroup';
// import { Label } from './Label';

// const QuestionnaireItem = ({ que, isExpanded, onExpand }) => {
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleAnswerChange = (questionId, value) => {
//     setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log('Submitted answers:', userAnswers);
//     setIsLoading(false);
//     setIsSubmitted(true);
//   };

//   const renderAnswerInput = (question) => {
//     // const { id, answer_type, options } = question;
//     const { unique_id, answer_type, options } = question;
//     const id=unique_id;
//     const value = userAnswers[id] || '';
    
//     switch (answer_type) {
//       case 'text':
//       case 'number':
//       case 'date':
//       case 'password':
//         return (
//           <Input
//             type={answer_type}
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'textarea':
//         return (
//           <Textarea
//             value={value}
//             onChange={(e) => handleAnswerChange(id, e.target.value)}
//             className="w-full bg-slate-700 text-white border-gray-600"
//           />
//         );
//       case 'radio':
//         return (
//           <RadioGroup
//             value={value}
//             onValueChange={(value) => handleAnswerChange(id, value)}
//             className="flex flex-col space-y-2"
//           >
//             {options.map((option, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <RadioGroupItem value={option} id={`${id}-option-${index}`} />
//                 <Label htmlFor={`${id}-option-${index}`} className="text-white">
//                   {option}
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="border border-gray-700 rounded-lg overflow-hidden my-10 bg-gradient-to-b from-slate-800/50 to-slate-900/50 divide-y divide-slate-700/50 backdrop-blur-sm shadow-xl">
//       <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 transition-all duration-300" onClick={onExpand}>
//         <div className="flex items-center space-x-4">
//           <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
//             <img src={que.imageSrc} alt="Questionnaire icon" className="w-full h-full rounded-lg object-cover opacity-80" />
//           </div>
//           <h3 className="text-white text-lg font-medium">{que.title}</h3>
//         </div>
//         <Button variant="outline" size="icon" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
//           {isExpanded ? <SquareChevronUp /> : <SquareChevronDown />}
//         </Button>
//       </div>
//       {isExpanded && (
//         <div className="p-4 bg-slate-800">
//           <p className="text-white mb-2">{que.question}</p>
//           {isSubmitted ? (
//             <p className="text-green-400">Thank you for your submission!</p>
//           ) : (
//             <>
//               {renderAnswerInput(que)}
              // <Button onClick={handleSubmit} disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg  mt-4">
              //   {isLoading ? (
              //     <>
              //       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              //     </>
              //   ) : (
              //     'Submit Answers'
              //   )}
              // </Button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionnaireItem;


import React, { useState } from 'react';
import { useUserAnswers } from '../../context/UserAnswersContext';
import { SquareChevronDown, SquareChevronUp, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { Input } from './Input';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from './Label';
import axios from 'axios';
const QuestionnaireItem = ({ que, isExpanded, onExpand, userId }) => {
  const { userAnswers, addAnswer } = useUserAnswers();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (questionId, description, value, questionType) => {
    addAnswer(questionId, description, value, questionType, userId);
  };

  const renderAnswerInput = (question) => {
    
    const { unique_id, answer_type, options, question_type,description } = question;
    const value = userAnswers.find((answer) => answer.unique_id === unique_id)?.answer || '';

    switch (answer_type) {
      case 'text':
      case 'number':
      case 'date':
      case 'password':
        return (
          <Input
            type={answer_type}
            value={value}
            onChange={(e) => handleAnswerChange(unique_id, description, e.target.value, question_type)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswerChange(unique_id,description, e.target.value, question_type)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'radio':
        return (
          // <RadioGroup
          //   value={value}
          //   onValueChange={(value) => handleAnswerChange(unique_id, description, value, question_type)}
          //   className="flex flex-col space-y-2"
          // >
          <RadioGroup
            value={value} // Ensure `value` is correctly defined in state
            onValueChange={(value) => handleAnswerChange(unique_id, description, value, question_type)}
            className="flex flex-col space-y-2"
          >
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
            type="radio"
            value={option}
            id={`${unique_id}-option-${index}`}
            checked={value === option} // Set the checked property based on the state
            onChange={() => handleAnswerChange(unique_id, description, option, question_type)} // Trigger state change when clicked
            className="radio-button" // Optional: Apply any styling class if needed
          />
                <Label htmlFor={`${unique_id}-option-${index}`} className="text-white">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden my-10 bg-gradient-to-b from-slate-800/50 to-slate-900/50 divide-y divide-slate-700/50 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 transition-all duration-300" onClick={onExpand}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <img src={que.imageSrc} alt="Questionnaire icon" className="w-full h-full rounded-lg object-cover opacity-80" />
          </div>
          <h3 className="text-white text-lg font-medium">{que.title}</h3>
        </div>
        <Button variant="outline" size="icon" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
          {isExpanded ? <SquareChevronUp /> : <SquareChevronDown />}
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4 bg-slate-800 ">
          <h3 className="text-white text-lg font-medium my-5">{que.description}</h3>
          {renderAnswerInput(que)}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireItem;
