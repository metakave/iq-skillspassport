import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Question, UserAnswer } from '../types/quiz';

interface TestRunnerProps {
  questions: Question[];
  testTitle?: string;
  initialUserName?: string;
  onComplete: (answers: UserAnswer[], timeSpentSeconds: number, userName: string) => void;
  onExit: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  questions,
  testTitle = 'Standard Cognitive Assessment',
  initialUserName = '',
  onComplete,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(15 * 60); // 15 mins
  const [userName, setUserName] = useState(initialUserName);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentQ = questions[currentIndex];
  const total = questions.length;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, userName]);

  // Keyboard controls listener (1-4 for options, arrows for navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Numbers 1 to 4
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= currentQ.options.length) {
        handleSelectOption(currentQ.options[num - 1].id);
      } else if (e.key === 'ArrowRight' && currentIndex < total - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ]);

  const handleSelectOption = (optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const toggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(answers).filter(v => v !== null && v !== undefined).length;
  const progressPct = Math.round((answeredCount / total) * 100);

  const handleSubmitTest = () => {
    const formattedAnswers: UserAnswer[] = questions.map(q => ({
      questionId: q.id,
      selectedOptionId: answers[q.id] ?? null,
      timeSpentSeconds: 0,
      isFlagged: !!flagged[q.id]
    }));

    const totalSpent = (15 * 60) - timeRemainingSeconds;
    onComplete(formattedAnswers, Math.max(30, totalSpent), userName || 'Candidate');
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 20px 80px' }}>
      {/* Top Test Navigation & Status Header */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '16px 24px', 
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onExit}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            ← Exit Test
          </button>
          <div style={{ height: '18px', width: '1px', background: 'var(--border-subtle)' }} />
          <div className="badge badge-brand" style={{ fontSize: '0.72rem' }}>
            {testTitle}
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Progress: </span>
            <span style={{ fontWeight: 700, color: 'var(--heading-color)' }}>{answeredCount} of {total} answered</span>
          </div>
        </div>

        {/* Timer Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: timeRemainingSeconds < 180 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(99, 102, 241, 0.15)',
          border: timeRemainingSeconds < 180 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(99, 102, 241, 0.3)',
          padding: '6px 16px',
          borderRadius: '9999px',
          color: timeRemainingSeconds < 180 ? '#fb7185' : '#a5b4fc',
          fontFamily: 'Space Grotesk, monospace',
          fontWeight: 700,
          fontSize: '1.05rem'
        }}>
          <Clock size={18} />
          <span>{formatTimer(timeRemainingSeconds)}</span>
        </div>

        {/* Finish CTA */}
        <button
          className="btn btn-primary"
          onClick={() => setShowSubmitModal(true)}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          Submit & Score
        </button>
      </div>

      {/* Progress Track Bar */}
      <div style={{
        height: '6px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '3px',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPct}%`,
          background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
          borderRadius: '3px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question Carousel Navigator Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isCurrent = idx === currentIndex;
          const isFlag = !!flagged[q.id];

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                borderRadius: '10px',
                border: isCurrent 
                  ? '2px solid #6366f1' 
                  : isAnswered 
                    ? '1px solid rgba(6, 182, 212, 0.5)' 
                    : '1px solid var(--border-subtle)',
                background: isCurrent 
                  ? '#4f46e5' 
                  : isAnswered 
                    ? 'rgba(6, 182, 212, 0.15)' 
                    : 'rgba(255, 255, 255, 0.04)',
                color: isCurrent || isAnswered ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s'
              }}
            >
              {idx + 1}
              {isFlag && (
                <div style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#f59e0b',
                  border: '1px solid #090d16'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Exam Interface Card */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div className="badge badge-brand">
            {currentQ.categoryLabel}
          </div>
          <button
            onClick={toggleFlag}
            style={{
              background: flagged[currentQ.id] ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              border: flagged[currentQ.id] ? '1px solid #f59e0b' : '1px solid var(--border-subtle)',
              color: flagged[currentQ.id] ? '#fbbf24' : 'var(--text-muted)',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <Flag size={14} />
            {flagged[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
          </button>
        </div>

        {/* Prompt */}
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.45rem',
          fontWeight: 700,
          marginBottom: '8px',
          color: 'var(--heading-color)'
        }}>
          {currentIndex + 1}. {currentQ.prompt}
        </h2>
        {currentQ.subPrompt && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '24px' }}>
            {currentQ.subPrompt}
          </p>
        )}

        {/* Visual Matrix or SVG Graphic if present */}
        {currentQ.matrixSvg && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-lg)'
              }}
              dangerouslySetInnerHTML={{ __html: currentQ.matrixSvg }}
            />
          </div>
        )}

        {/* Multiple Choice Options */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 500
          }}>
            <span>Select one correct answer:</span>
            <span>Tip: Press keys 1 to {currentQ.options.length}</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: currentQ.options[0]?.svgContent ? 'repeat(auto-fit, minmax(180px, 1fr))' : '1fr',
            gap: '14px'
          }}>
            {currentQ.options.map((option, optIdx) => {
              const isSelected = answers[currentQ.id] === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  style={{
                    background: isSelected 
                      ? 'var(--primary-light)' 
                      : 'var(--bg-quiz-box)',
                    border: isSelected 
                      ? '2px solid var(--primary)' 
                      : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: option.svgContent ? 'column' : 'row',
                    alignItems: option.svgContent ? 'center' : 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    minWidth: '28px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    {optIdx + 1}
                  </div>

                  {option.svgContent && (
                    <div 
                      style={{ width: '100px', height: '100px' }}
                      dangerouslySetInnerHTML={{ __html: option.svgContent }}
                    />
                  )}

                  {option.text && (
                    <div style={{
                      fontSize: '0.98rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)'
                    }}>
                      {option.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation bottom controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px'
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentIndex < total - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentIndex(prev => Math.min(total - 1, prev + 1))}
            >
              Next Question
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setShowSubmitModal(true)}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              Review & Submit
              <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation & Name Entry Modal */}
      {showSubmitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 100
        }}>
          <div 
            className="glass-panel"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '32px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Sparkles size={24} color="#a5b4fc" />
            </div>

            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.45rem',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              Ready to Compute Your Score?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.5 }}>
              You have answered <strong>{answeredCount} of {total}</strong> questions. Please enter your name as you would like it to appear on your official certificate.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Full Name on Certificate
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Alex Mercer"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowSubmitModal(false)}
              >
                Back to Questions
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitTest}
              >
                Generate Score & Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
