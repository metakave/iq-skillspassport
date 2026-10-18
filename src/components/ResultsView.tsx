import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Brain, 
  CheckCircle, 
  Share2, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Download,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CognitiveScoreResult } from '../types/quiz';

interface ResultsViewProps {
  result: CognitiveScoreResult;
  onViewCertificate: () => void;
  onGoToTraining: () => void;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onViewCertificate,
  onGoToTraining,
  onRetake
}) => {
  // Fire celebratory confetti when results load
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unavailable
    }
  }, []);

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '36px 20px 80px' }}>
      {/* Top Banner */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          <CheckCircle size={14} />
          Assessment Complete & Calibrated
        </div>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          marginBottom: '8px'
        }}>
          Cognitive Diagnostic Summary
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Evaluation computed for <strong>{result.userName}</strong> on {result.completedAt}
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div 
        className="glass-panel"
        style={{
          padding: '40px',
          marginBottom: '36px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-glow)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        {/* IQ / AIQ Score Display */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: '8px',
            fontWeight: 700
          }}>
            {result.assessmentType === 'ai-quotient' ? 'Calibrated AIQ Quotient' : 'Estimated IQ Index'}
          </div>

          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '5.8rem',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '10px'
          }} className="text-gradient">
            {result.iqScore}
          </div>

          <div style={{
            display: 'inline-block',
            background: 'var(--primary-light)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '6px 18px',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--primary)',
            marginBottom: '14px'
          }}>
            {result.statusTitle}
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Standard Deviation: <strong>15</strong> | Normal Benchmark Mean: <strong>100</strong>
          </p>
        </div>

        {/* Global Distribution & Percentile */}
        <div style={{
          borderLeft: '1px solid var(--border-subtle)',
          paddingLeft: '24px'
        }}>
          <h3 style={{
            fontFamily: 'Space Grotesk',
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <TrendingUp size={20} color="#06b6d4" />
            Global Percentile Ranking
          </h3>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '6px' }}>
              <span>You scored higher than:</span>
              <strong style={{ color: '#06b6d4', fontSize: '1.1rem' }}>{result.percentile}% of people</strong>
            </div>
            {/* Visual bell curve progress */}
            <div style={{
              height: '10px',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${result.percentile}%`,
                background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                borderRadius: '5px'
              }} />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '14px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Accuracy</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {result.correctCount} / {result.totalQuestions}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Completion Time</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {Math.round(result.completionTimeSeconds / 60)}m {result.completionTimeSeconds % 60}s
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={onViewCertificate}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Award size={18} />
              View Official Certificate
            </button>
            <button
              className="btn btn-secondary"
              onClick={onGoToTraining}
            >
              <Zap size={18} color="#06b6d4" />
              Start Brain Gym
            </button>
          </div>
        </div>
      </div>

      {/* Cognitive Pillar Breakdown */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: 'Space Grotesk',
          fontSize: '1.6rem',
          fontWeight: 700,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <BarChart3 size={24} color="#6366f1" />
          5-Dimensional Cognitive Aptitude Matrix
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px'
        }}>
          {result.categoryBreakdown.map((cat, idx) => (
            <div 
              key={cat.category}
              className="glass-panel"
              style={{ padding: '24px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cat.label}</span>
                <span className={`badge ${cat.score >= 70 ? 'badge-emerald' : 'badge-brand'}`}>
                  {cat.rating}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '8px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                marginBottom: '12px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${cat.score}%`,
                  background: cat.score >= 70 ? '#10b981' : '#6366f1',
                  borderRadius: '4px'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Proficiency</span>
                <span style={{ fontWeight: 600 }}>{cat.score}%</span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Retake & Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '24px',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Credential ID: <strong style={{ color: '#ffffff' }}>{result.certificateId}</strong>
        </div>
        <button
          className="btn btn-secondary"
          onClick={onRetake}
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
};
