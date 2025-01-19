'use client'

import React, { useState } from 'react';
import { SquareChevronDown, SquareChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Simulated questions data
const questionsData = [
  {
    id: '1',
    title: 'Basic Information',
    author: 'System',
    image: '/api/placeholder/48/48',
    questions: [
      { id: 'q1', question: 'What is your name?', answerType: 'text' },
      { id: 'q2', question: 'How old are you?', answerType: 'number' },
      { id: 'q3', question: 'Tell us about yourself', answerType: 'textarea' },
      { id: 'q4', question: 'What is your birth date?', answerType: 'date' },
      { id: 'q5', question: 'Create a password', answerType: 'password' },
      { id: 'q6', question: 'What is your favorite color?', answerType: 'radio', options: ['Red', 'Blue', 'Green', 'Yellow'] },
    ],
  },
  // Add more questionnaire items here if needed
];

const QuestionnaireItem = ({ id }: { id: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const questionnaireData = questionsData.find(item => item.id === id);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Submitted answers:', userAnswers);
    setIsLoading(false);
    // You can add logic here to handle the submission (e.g., show a success message)
  };

  const renderAnswerInput = (question: { id: string; answerType: string; options?: string[] }) => {
    const { id, answerType, options } = question;
    const value = userAnswers[id] || '';

    switch (answerType) {
      case 'text':
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'password':
        return (
          <Input
            type="password"
            value={value}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full bg-slate-700 text-white border-gray-600"
          />
        );
      case 'radio':
        return (
          <RadioGroup
            value={value}
            onValueChange={(value) => handleAnswerChange(id, value)}
            className="flex flex-col space-y-2"
          >
            {options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${id}-option-${index}`} />
                <Label htmlFor={`${id}-option-${index}`} className="text-white">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  if (!questionnaireData) {
    return <div className="text-white">Questionnaire not found.</div>;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <img
              src={questionnaireData.image || "/placeholder.svg?height=48&width=48"}
              alt="Questionnaire icon"
              className="w-full h-full rounded-lg object-cover opacity-80"
            />
          </div>
          <div>
            <h3 className="text-white text-lg font-medium">{questionnaireData.title}</h3>
            <p className="text-gray-400">{questionnaireData.author}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleExpand}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
        >
          {isExpanded ? (
            <SquareChevronUp className="w-4 h-4" />
          ) : (
            <SquareChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4 bg-slate-800">
          {questionnaireData.questions.map((question) => (
            <div key={question.id} className="mb-4">
              <p className="text-white mb-2">{question.question}</p>
              {renderAnswerInput(question)}
            </div>
          ))}
          <Button onClick={handleSubmit} disabled={isLoading} className="mt-4">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Answers'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireItem;

