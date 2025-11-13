'use client';

import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 'scene',
    title: 'For what occasion will you use these nails?',
    options: [
      { label: 'Everyday', value: 'daily' },
      { label: 'Work', value: 'work' },
      { label: 'Date', value: 'date' },
      { label: 'Fan events / concerts', value: 'fan' },
      { label: 'Special day (wedding, party, etc.)', value: 'special' },
      { label: 'For photos / social media', value: 'photo' },
      { label: "I’ll leave it up to you", value: 'any' },
    ],
  },
  {
    id: 'vibe',
    title: 'What overall vibe do you want?',
    options: [
      { label: 'Cute / girly', value: 'cute' },
      { label: 'Elegant / refined', value: 'elegant' },
      { label: 'Cool / modern', value: 'cool' },
      { label: 'Korean-style', value: 'korean' },
      { label: 'Natural / simple', value: 'natural' },
      { label: "I’m not sure, leave it up to you", value: 'any' },
    ],
  },
  {
    id: 'baseColor',
    title: 'Which base color do you prefer?',
    options: [
      { label: 'Pink tones', value: 'pink' },
      { label: 'Beige / brown tones', value: 'beige' },
      { label: 'White / gray tones', value: 'white' },
      { label: 'Blue / purple tones', value: 'blue' },
      { label: 'Black tones', value: 'black' },
      { label: 'Other colors', value: 'other' },
      { label: "I don’t mind the color", value: 'any' },
    ],
  },
  {
    id: 'designType',
    title: 'What type of design would you like?',
    options: [
      { label: 'Solid color', value: 'oneColor' },
      { label: 'Gradation', value: 'gradation' },
      { label: 'French', value: 'french' },
      { label: 'Glitter / holo', value: 'glitter' },
      { label: 'Pattern / illustration', value: 'pattern' },
      { label: 'Korean nail look', value: 'koreanDesign' },
      { label: "I’ll leave it up to you", value: 'any' },
    ],
  },
  {
    id: 'sparkle',
    title: 'How much glitter, stones or parts do you want?',
    options: [
      { label: 'As little as possible', value: 'low' },
      { label: 'Moderate amount', value: 'medium' },
      { label: 'Full-on sparkly', value: 'high' },
      { label: "I’ll leave it up to you", value: 'any' },
    ],
  },
  {
    id: 'lengthShape',
    title: 'What length and shape do you imagine?',
    options: [
      { label: 'Short', value: 'short' },
      { label: 'Medium', value: 'medium' },
      { label: 'Long', value: 'long' },
      { label: 'Round', value: 'round' },
      { label: 'Square', value: 'square' },
      { label: 'Ballerina / pointy', value: 'ballerina' },
      { label: 'No particular preference', value: 'none' },
    ],
  },
  {
    id: 'motif',
    title: 'Any motif or theme you like? (optional)',
    options: [
      { label: 'Hearts', value: 'heart' },
      { label: 'Ribbons', value: 'ribbon' },
      { label: 'Flowers', value: 'flower' },
      { label: 'Animal print', value: 'animal' },
      { label: 'Magnet / mirror / aurora', value: 'magnet' },
      { label: 'Nothing in particular', value: 'none' },
      { label: "I’ll leave it up to you", value: 'any' },
    ],
  },
];

export default function TryPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (value: string) => {
    const q = questions[step];
    const nextAnswers = { ...answers, [q.id]: value };
    setAnswers(nextAnswers);

    if (step === questions.length - 1) {
      setIsFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  const currentQuestion = questions[step];

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>
        Try NailMuse for Free
      </h1>
      <p style={{ marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>
        Answer a few quick questions and we’ll summarize your ideal nail tip
        design.
        <br />
        Later, this flow will also connect to AI so it can suggest designs for you.
      </p>

      {/* Question step */}
      {!isFinished && currentQuestion && (
        <section
          style={{
            borderRadius: 16,
            border: '1px solid #eee',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: '#888',
              marginBottom: 8,
            }}
          >
            Question {step + 1} / {questions.length}
          </p>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>
            {currentQuestion.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gap: 12,
            }}
          >
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: 999,
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
            }}
          >
            <button
              onClick={handleBack}
              disabled={step === 0}
              style={{
                border: 'none',
                background: 'transparent',
                color: step === 0 ? '#ccc' : '#333',
                textDecoration: step === 0 ? 'none' : 'underline',
                cursor: step === 0 ? 'default' : 'pointer',
              }}
            >
              ← Back to previous question
            </button>
            <span style={{ color: '#666' }}>
              Tap an option to go to the next question
            </span>
          </div>
        </section>
      )}

      {/* Summary */}
      {isFinished && (
        <section
          style={{
            borderRadius: 16,
            border: '1px solid #eee',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>
            Your design preferences
          </h2>
          <p
            style={{
              fontSize: 14,
              marginBottom: 16,
              lineHeight: 1.7,
            }}
          >
            Here is a summary of the conditions you chose.
            <br />
            You can share this with your creator, and we’ll also use it when we
            build automatic AI suggestions.
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {questions.map((q) => {
              const opt = q.options.find((o) => o.value === answers[q.id]);
              return (
                <li
                  key={q.id}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <div
                    style={{
                      color: '#555',
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    {q.title}
                  </div>
                  <div style={{ fontWeight: 500 }}>
                    {opt ? opt.label : '-'}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={handleRestart}
            style={{
              marginTop: 24,
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid #333',
              backgroundColor: '#fff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Start again
          </button>
        </section>
      )}
    </main>
  );
}
