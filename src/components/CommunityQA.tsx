import React, { useState } from 'react';

const mockQA = [
  {
    id: 'q1',
    question: 'Does this product come with a warranty?',
    user: 'EcoShopper99',
    isVerified: true,
    trustScore: 9.2,
    anonymous: false,
    createdAt: '2024-06-01T12:00:00Z',
    answers: [
      {
        id: 'a1',
        answer: 'Yes, it comes with a 1-year manufacturer warranty.',
        user: 'TrustedBuyer',
        isVerified: true,
        trustScore: 8.7,
        anonymous: false,
        createdAt: '2024-06-01T13:00:00Z',
      },
    ],
  },
  {
    id: 'q2',
    question: 'Is the packaging eco-friendly?',
    user: 'Anonymous',
    isVerified: false,
    trustScore: 7.1,
    anonymous: true,
    createdAt: '2024-06-02T10:30:00Z',
    answers: [
      {
        id: 'a2',
        answer: 'Yes, the packaging is recyclable and uses minimal plastic.',
        user: 'EcoShopper99',
        isVerified: true,
        trustScore: 9.2,
        anonymous: false,
        createdAt: '2024-06-02T11:00:00Z',
      },
    ],
  },
];

const spamWords = ['spam', 'fake', 'scam', 'fraud'];

const CommunityQA: React.FC = () => {
  const [qa, setQA] = useState(mockQA);
  const [question, setQuestion] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [answeringQ, setAnsweringQ] = useState<string | null>(null);
  const [answerAnon, setAnswerAnon] = useState(false);

  const handleAsk = () => {
    if (spamWords.some(word => question.toLowerCase().includes(word))) {
      setError('Your question was flagged as spam. Please revise.');
      return;
    }
    setError('');
    setQA([
      ...qa,
      {
        id: `q${qa.length + 1}`,
        question,
        user: anonymous ? 'Anonymous' : 'You',
        isVerified: true,
        trustScore: 8.5,
        anonymous,
        createdAt: new Date().toISOString(),
        answers: [],
      },
    ]);
    setQuestion('');
    setAnonymous(false);
  };

  const handleAnswer = (qid: string) => {
    if (spamWords.some(word => answer.toLowerCase().includes(word))) {
      setError('Your answer was flagged as spam. Please revise.');
      return;
    }
    setError('');
    setQA(qa.map(q =>
      q.id === qid
        ? {
            ...q,
            answers: [
              ...q.answers,
              {
                id: `a${q.answers.length + 1}`,
                answer,
                user: answerAnon ? 'Anonymous' : 'You',
                isVerified: true,
                trustScore: 8.5,
                anonymous: answerAnon,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : q
    ));
    setAnswer('');
    setAnsweringQ(null);
    setAnswerAnon(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-full sm:max-w-2xl mx-auto mt-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Community Q&amp;A</h2>
      <div className="mb-6">
        <textarea
          className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
          placeholder="Ask a question about this product..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
            />
            Ask as anonymous
          </label>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleAsk}
          disabled={!question.trim()}
        >
          Submit Question
        </button>
      </div>
      <div className="divide-y">
        {qa.slice().reverse().map(q => (
          <div key={q.id} className="py-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-blue-700">{q.user}</span>
              {q.isVerified && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Verified Buyer</span>
              )}
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">Trust: {q.trustScore}</span>
              {q.anonymous && <span className="text-gray-400 text-xs ml-2">(Anonymous)</span>}
              <span className="text-xs text-gray-400 ml-2">{new Date(q.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-2 text-gray-800">Q: {q.question}</div>
            <div className="ml-4">
              {q.answers.map(a => (
                <div key={a.id} className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700">{a.user}</span>
                    {a.isVerified && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Verified Buyer</span>
                    )}
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">Trust: {a.trustScore}</span>
                    {a.anonymous && <span className="text-gray-400 text-xs ml-2">(Anonymous)</span>}
                    <span className="text-xs text-gray-400 ml-2">{new Date(a.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-gray-800">A: {a.answer}</div>
                </div>
              ))}
              {answeringQ === q.id ? (
                <div className="mt-2">
                  <textarea
                    className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={2}
                    placeholder="Write your answer..."
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={answerAnon}
                        onChange={e => setAnswerAnon(e.target.checked)}
                      />
                      Answer as anonymous
                    </label>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleAnswer(q.id)}
                    disabled={!answer.trim()}
                  >
                    Submit Answer
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={() => { setAnsweringQ(null); setAnswer(''); setAnswerAnon(false); }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs mt-2"
                  onClick={() => setAnsweringQ(q.id)}
                >
                  Answer this question
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityQA; 