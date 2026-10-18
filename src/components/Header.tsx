import React from 'react';
import { Brain, Award, Dumbbell, UserCheck, Sparkles, ChevronRight, Sun, Moon, Cpu } from 'lucide-react';
import { AssessmentType } from '../types/quiz';

interface HeaderProps {
  currentView: 'home' | 'test' | 'results' | 'certificate' | 'training' | 'account';
  onNavigate: (view: 'home' | 'test' | 'results' | 'certificate' | 'training' | 'account') => void;
  onStartSpecificTest?: (type: AssessmentType) => void;
  hasCompletedTest: boolean;
  score?: number;
  assessmentType?: AssessmentType;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onStartSpecificTest,
  hasCompletedTest,
  score,
  assessmentType = 'standard-iq',
  theme,
  onToggleTheme
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-header)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '100%',
      transition: 'background 0.2s ease, border-color 0.2s ease'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => onNavigate('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
        }}>
          <Brain size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: '1.45rem',
              letterSpacing: '-0.02em',
              color: 'var(--heading-color)'
            }}>
              IQ <span className="text-gradient">Passport</span>
            </span>
            <span className="badge badge-brand" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>PRO</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '-2px', fontWeight: 500 }}>
            Standard Cognitive & AIQ Diagnostics
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: currentView === 'home' ? 'var(--nav-btn-active-bg)' : 'transparent',
            color: currentView === 'home' ? 'var(--nav-btn-active-text)' : 'var(--nav-btn-text)',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Home
        </button>

        {/* AIQ Assessment Quick Trigger */}
        <button
          onClick={() => onStartSpecificTest ? onStartSpecificTest('ai-quotient') : onNavigate('test')}
          style={{
            background: 'rgba(6, 182, 212, 0.12)',
            color: 'var(--accent-cyan)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          <Cpu size={16} />
          AIQ Test
        </button>

        <button
          onClick={() => onNavigate('training')}
          style={{
            background: currentView === 'training' ? 'var(--nav-btn-active-bg)' : 'transparent',
            color: currentView === 'training' ? 'var(--nav-btn-active-text)' : 'var(--nav-btn-text)',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          <Dumbbell size={16} />
          Brain Training
        </button>

        {hasCompletedTest && (
          <>
            <button
              onClick={() => onNavigate('results')}
              style={{
                background: currentView === 'results' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: currentView === 'results' ? 'var(--primary)' : 'var(--nav-btn-text)',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={16} color="var(--primary)" />
              {assessmentType === 'ai-quotient' ? 'AIQ' : 'IQ'}: {score || 128}
            </button>

            <button
              onClick={() => onNavigate('certificate')}
              style={{
                background: currentView === 'certificate' ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                color: currentView === 'certificate' ? 'var(--accent-amber)' : 'var(--nav-btn-text)',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Award size={16} />
              Certificate
            </button>
          </>
        )}

        <button
          onClick={() => onNavigate('account')}
          style={{
            background: currentView === 'account' ? 'var(--nav-btn-active-bg)' : 'transparent',
            color: currentView === 'account' ? 'var(--nav-btn-active-text)' : 'var(--nav-btn-text)',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <UserCheck size={16} />
          Portal
        </button>
      </nav>

      {/* Right Controls: Theme Switcher + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Light / Dark Mode Toggle Button */}
        <button
          className="theme-switch-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun size={19} color="#fbbf24" />
          ) : (
            <Moon size={19} color="#4f46e5" />
          )}
        </button>

        <button
          className="btn btn-primary"
          onClick={() => onStartSpecificTest ? onStartSpecificTest('standard-iq') : onNavigate('test')}
          style={{
            padding: '9px 18px',
            fontSize: '0.88rem'
          }}
        >
          {hasCompletedTest ? 'Retake Test' : 'Start Assessment'}
          <ChevronRight size={16} />
        </button>
      </div>
    </header>
  );
};
