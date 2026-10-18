import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { TestRunner } from './components/TestRunner';
import { ResultsView } from './components/ResultsView';
import { CertificateView } from './components/CertificateView';
import { TrainingHub } from './components/TrainingHub';
import { AccountPortal } from './components/AccountPortal';
import { IntakeModal } from './components/IntakeModal';
import { QUESTIONS_DATA } from './data/questions';
import { AIQ_QUESTIONS_DATA } from './data/aiqQuestions';
import { calculateCognitiveScore } from './utils/scoring';
import { UserAnswer, CognitiveScoreResult, AssessmentType } from './types/quiz';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'test' | 'results' | 'certificate' | 'training' | 'account'>('home');
  const [activeAssessmentType, setActiveAssessmentType] = useState<AssessmentType>('standard-iq');
  const [scoreResult, setScoreResult] = useState<CognitiveScoreResult | null>(null);
  
  // Intake Modal state & participant profile
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [pendingTestType, setPendingTestType] = useState<AssessmentType>('standard-iq');
  const [participant, setParticipant] = useState<{ name: string; email: string; whatsapp: string } | null>(() => {
    try {
      const saved = localStorage.getItem('iqpassport_participant');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Theme state: dark / light with localStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('myiq-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('myiq-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Called whenever candidate clicks "Start Official IQ Test" or "Take Artificial IQ Test"
  const handleInitiateTest = (type: AssessmentType = 'standard-iq') => {
    setPendingTestType(type);
    setIsIntakeOpen(true);
  };

  // Called after Candidate successfully submits Name, Email, and WhatsApp number
  const handleIntakeSubmit = (userData: { name: string; email: string; whatsapp: string }) => {
    setParticipant(userData);
    setIsIntakeOpen(false);
    setActiveAssessmentType(pendingTestType);
    setCurrentView('test');
  };

  const handleTestComplete = (answers: UserAnswer[], timeSpent: number, userName: string) => {
    const questionsToScore = activeAssessmentType === 'ai-quotient' ? AIQ_QUESTIONS_DATA : QUESTIONS_DATA;
    const finalName = participant?.name || userName || 'Candidate';
    const result = calculateCognitiveScore(
      questionsToScore, 
      answers, 
      timeSpent, 
      finalName,
      activeAssessmentType
    );
    setScoreResult(result);
    setCurrentView('results');
  };

  const activeQuestions = activeAssessmentType === 'ai-quotient' ? AIQ_QUESTIONS_DATA : QUESTIONS_DATA;
  const activeTestTitle = activeAssessmentType === 'ai-quotient' 
    ? 'Artificial IQ (AIQ) Assessment' 
    : 'Standard Fluid IQ Test';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Candidate Registration Intake Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        assessmentType={pendingTestType}
        onClose={() => setIsIntakeOpen(false)}
        onSubmit={handleIntakeSubmit}
      />

      {/* Top Navigation with Theme Toggle Switcher */}
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        onStartSpecificTest={handleInitiateTest}
        hasCompletedTest={!!scoreResult}
        score={scoreResult?.iqScore}
        assessmentType={scoreResult?.assessmentType || activeAssessmentType}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HeroLanding
            onStartTest={() => handleInitiateTest('standard-iq')}
            onStartAiTest={() => handleInitiateTest('ai-quotient')}
            onExploreTraining={() => setCurrentView('training')}
          />
        )}

        {currentView === 'test' && (
          <TestRunner
            questions={activeQuestions}
            testTitle={activeTestTitle}
            initialUserName={participant?.name || ''}
            onComplete={handleTestComplete}
            onExit={() => setCurrentView('home')}
          />
        )}

        {currentView === 'results' && scoreResult && (
          <ResultsView
            result={scoreResult}
            onViewCertificate={() => setCurrentView('certificate')}
            onGoToTraining={() => setCurrentView('training')}
            onRetake={() => handleInitiateTest(activeAssessmentType)}
          />
        )}

        {currentView === 'certificate' && scoreResult && (
          <CertificateView
            result={scoreResult}
            onBack={() => setCurrentView('results')}
          />
        )}

        {currentView === 'training' && (
          <TrainingHub
            onStartTest={() => handleInitiateTest('standard-iq')}
          />
        )}

        {currentView === 'account' && (
          <AccountPortal
            scoreResult={scoreResult}
            onViewCertificate={() => setCurrentView('certificate')}
            onRetake={() => handleInitiateTest(activeAssessmentType)}
          />
        )}
      </main>

      {/* Modern High-Trust Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-header)',
        padding: '48px 24px 32px',
        marginTop: 'auto',
        transition: 'background 0.2s ease, border-color 0.2s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '36px'
        }}>
          <div>
            <div style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 800,
              fontSize: '1.4rem',
              color: 'var(--heading-color)',
              marginBottom: '10px'
            }}>
              IQ <span className="text-gradient">Passport</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              The international platform for standardized cognitive evaluation, Artificial IQ (AIQ) benchmarking, and certified Skills Passport credentials.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', color: 'var(--heading-color)' }}>
              Assessments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => handleInitiateTest('ai-quotient')}>Artificial IQ (AIQ) Assessment</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleInitiateTest('standard-iq')}>Standardized Fluid IQ Test</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('training')}>Spatial Rotation Gym</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('training')}>Dual N-Back Memory</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', color: 'var(--heading-color)' }}>
              Credentials
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('account')}>Skills Passport Portal</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('account')}>Subscription Billing & Cancel</li>
              <li>Employer Verification Portal</li>
              <li>Cryptographic Seal Standard</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', color: 'var(--heading-color)' }}>
              Compliance & Disclaimer
            </h4>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.78rem', lineHeight: 1.5 }}>
              Notice: The cognitive and AIQ assessments provided on IQ Passport are intended for self-development, educational benchmarking, and professional skill verification. They do not constitute formal psychiatric diagnoses.
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            © {new Date().getFullYear()} IQ Passport. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
